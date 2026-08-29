import * as THREE from 'three';

export const SIZE = 420;

export interface BallInstance {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  texture: THREE.Texture;
  phase: number;
  spin: number;
  spinTarget: number;
  lift: number;
  liftTarget: number;
  tx: number;
  ty: number;
  offX: number;
  offY: number;
  visible: boolean;
}

// Constant base tilt on the X axis, plus a fixed jaunty roll on Z — a ball at
// rest still looks caught mid-motion rather than perfectly axis-aligned.
const BASE_PITCH = 0.16;
const BASE_ROLL = 0.13;

// The fragment shader's UV lookup (see below) is an orthographic front-projection
// of the object-space normal, not a true equirectangular sphere wrap — it only
// reproduces the source photo faithfully within roughly ±60° of face-on. Beyond
// that it mirrors and warps (verified empirically by forcing yaw across a full
// sweep). So instead of letting yaw accumulate without limit — which used to
// carry every ball through that broken range continuously, and started every
// instance at a random full-circle angle that could land there immediately —
// yaw now oscillates around dead-ahead, comfortably inside the safe arc.
const YAW_AMPLITUDE = 0.35;

interface TextureEntry {
  texture: THREE.Texture;
  ready: boolean;
  waiters: Array<() => void>;
}

export interface Engine {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  registry: Set<BallInstance>;
  textureCache: Map<string, TextureEntry>;
  ioTargets: WeakMap<Element, BallInstance>;
  io: IntersectionObserver | null;
  ok: boolean;
  rafId: number | null;
  lastTime: number;
  acc: number;
}

declare global {
  // eslint-disable-next-line no-var
  var __ball3dEngine: Engine | null | undefined;
}

const VERTEX_SHADER = `
  varying vec3 vN; varying vec3 vNv;
  void main() {
    vN = normalize(normal);
    vNv = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Orthographic projection of the OBJECT-space normal into the cut-out photo,
// so the ball's own panels and print physically wrap the sphere and turn with
// it when the mesh really rotates — genuine XYZ rotation, not a lighting trick.
// Lighting still reads the VIEW-space normal (vNv) so highlights stay correct
// relative to the camera no matter how the mesh is oriented.
const FRAGMENT_SHADER = `
  uniform sampler2D map; uniform float uLift; uniform vec3 uLight;
  varying vec3 vN; varying vec3 vNv;

  // Cheap hash-based dither to break up banding in the shading gradient —
  // shading a photographic texture with a smooth multiplier can otherwise
  // produce visible steps on large, flat-color panels (e.g. a ball's leather).
  float dither(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vN.xy * 0.47 + 0.5;
    vec4 tex = texture2D(map, uv);
    vec3 L = normalize(uLight);
    float d = max(dot(vNv, L), 0.0);
    vec3 R = reflect(-L, vNv);
    float edge = pow(1.0 - max(vNv.z, 0.0), 1.6);

    // the photo already carries its own shading — modulate it, don't relight it,
    // but with enough range to read as a rounded object, not a flat sticker
    float lam = 0.76 + 0.38 * d;
    // soft ambient occlusion toward the silhouette, so the ball reads as solid
    float ao = mix(1.0, 0.85, edge);
    // a tight specular hotspot plus a broader, softer sheen around it —
    // one highlight alone looks plastic, two sizes read as a real curved surface
    float specTight = pow(max(R.z, 0.0), 30.0) * 0.32;
    float specSoft = pow(max(R.z, 0.0), 5.0) * 0.05;
    // thin rim light at the grazing edge, as if a second light sits behind the ball
    float rim = pow(edge, 2.1) * 0.16;

    vec3 col = tex.rgb * ao * (lam + uLift) + specTight + specSoft + rim;
    col += (dither(gl_FragCoord.xy) - 0.5) * 0.012;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function buildEngine(): Engine | null {
  if (typeof window === 'undefined') return null;

  try {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: false });
    renderer.setPixelRatio(1);
    renderer.setSize(SIZE, SIZE, false);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        map: { value: null },
        uLift: { value: 0 },
        uLight: { value: new THREE.Vector3(-0.42, 0.58, 0.86) },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });

    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 96), material);
    scene.add(mesh);

    const registry = new Set<BallInstance>();
    const ioTargets = new WeakMap<Element, BallInstance>();

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                const instance = ioTargets.get(entry.target);
                if (instance) instance.visible = entry.isIntersecting;
              });
            },
            { rootMargin: '120px' }
          )
        : null;

    const engine: Engine = {
      renderer,
      scene,
      camera,
      mesh,
      material,
      registry,
      textureCache: new Map(),
      ioTargets,
      io,
      ok: true,
      rafId: null,
      lastTime: 0,
      acc: 0,
    };

    renderer.domElement.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      engine.ok = false;
    });
    renderer.domElement.addEventListener('webglcontextrestored', () => {
      engine.ok = true;
    });

    return engine;
  } catch {
    return null;
  }
}

export function getEngine(): Engine | null {
  if (typeof window === 'undefined') return null;
  if (globalThis.__ball3dEngine === undefined) {
    globalThis.__ball3dEngine = buildEngine();
  }
  return globalThis.__ball3dEngine;
}

export function isWebGLAvailable(): boolean {
  return getEngine() !== null;
}

export function getTexture(engine: Engine, src: string, onReady?: () => void): THREE.Texture {
  let entry = engine.textureCache.get(src);
  if (!entry) {
    const texture = new THREE.TextureLoader().load(src, () => {
      entry!.ready = true;
      const waiters = entry!.waiters;
      entry!.waiters = [];
      waiters.forEach((fn) => fn());
    });
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    entry = { texture, ready: false, waiters: [] };
    engine.textureCache.set(src, entry);
  }
  if (onReady) {
    if (entry.ready) onReady();
    else entry.waiters.push(onReady);
  }
  return entry.texture;
}

export function createInstance(canvas: HTMLCanvasElement, texture: THREE.Texture): BallInstance {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('ball3d: 2D canvas context unavailable');
  return {
    canvas,
    ctx,
    texture,
    phase: Math.random() * Math.PI * 2,
    spin: 0.16,
    spinTarget: 0.16,
    lift: 0,
    liftTarget: 0,
    tx: 0,
    ty: 0,
    offX: 0,
    offY: 0,
    visible: true,
  };
}

// Draws exactly one instance's current state into its own 2D canvas, using the
// singleton renderer/scene/mesh/material shared by every instance. Safe to call
// at any time (mount, texture-ready, next frame, or a shared tick) because it
// fully reconfigures all shared state before rendering, and JS has no
// preemption inside this synchronous body — the next call simply overwrites
// it all again before its own render(). It never advances yaw/offX/offY, so
// calling it standalone just (re)draws the instance's current state.
export function paintInstance(engine: Engine, instance: BallInstance) {
  if (!engine.ok) return;
  // Real XYZ rotation: yaw oscillates around dead-ahead (see YAW_AMPLITUDE),
  // with pointer-driven tilt added on top of a fixed base pitch/roll so the
  // ball never sits perfectly square-on. Since the fragment shader samples
  // the OBJECT-space normal, this rotation is genuinely visible — the print
  // turns with the ball — without ever swinging into the UV projection's
  // mirrored/warped range.
  const yaw = Math.sin(instance.phase) * YAW_AMPLITUDE;
  engine.mesh.rotation.set(BASE_PITCH + instance.offX, yaw + instance.offY, BASE_ROLL);
  engine.mesh.scale.setScalar(1 + instance.lift);
  engine.material.uniforms.map.value = instance.texture;
  engine.material.uniforms.uLift.value = instance.lift;
  engine.renderer.render(engine.scene, engine.camera);
  instance.ctx.clearRect(0, 0, SIZE, SIZE);
  instance.ctx.drawImage(engine.renderer.domElement, 0, 0);
}

function tick(engine: Engine, now: number) {
  engine.rafId = requestAnimationFrame((t) => tick(engine, t));
  if (!engine.ok) return;

  const dt = Math.min((now - engine.lastTime) / 1000, 0.1);
  engine.lastTime = now;
  engine.acc += dt;
  if (engine.acc < 1 / 40) return;
  const step = engine.acc;
  engine.acc = 0;

  engine.registry.forEach((instance) => {
    if (!instance.visible) return;
    instance.phase += step * instance.spin;
    instance.offY += (instance.tx - instance.offY) * 0.12;
    instance.offX += (instance.ty - instance.offX) * 0.12;
    // Ease spin/lift toward their targets instead of snapping — a ball
    // speeding up or settling down reads as inertia, not a mode switch.
    instance.spin += (instance.spinTarget - instance.spin) * 0.08;
    instance.lift += (instance.liftTarget - instance.lift) * 0.1;
    paintInstance(engine, instance);
  });
}

function startLoopIfNeeded(engine: Engine) {
  if (engine.rafId !== null) return;
  engine.lastTime = performance.now();
  engine.acc = 0;
  engine.rafId = requestAnimationFrame((t) => tick(engine, t));
}

function stopLoopIfIdle(engine: Engine) {
  if (engine.registry.size === 0 && engine.rafId !== null) {
    cancelAnimationFrame(engine.rafId);
    engine.rafId = null;
  }
}

export function registerInstance(engine: Engine, el: Element, instance: BallInstance) {
  engine.registry.add(instance);
  engine.ioTargets.set(el, instance);
  engine.io?.observe(el);
  startLoopIfNeeded(engine);
}

export function unregisterInstance(engine: Engine, el: Element, instance: BallInstance) {
  engine.registry.delete(instance);
  engine.ioTargets.delete(el);
  engine.io?.unobserve(el);
  stopLoopIfIdle(engine);
}

export function onPointerEnter(instance: BallInstance) {
  instance.spinTarget = 0.6;
  instance.liftTarget = 0.08;
}

export function onPointerLeave(instance: BallInstance) {
  instance.spinTarget = 0.16;
  instance.liftTarget = 0;
  instance.tx = 0;
  instance.ty = 0;
}

export function onPointerMove(instance: BallInstance, clientX: number, clientY: number, rect: DOMRect) {
  instance.tx = ((clientX - rect.left) / rect.width - 0.5) * 1.1;
  instance.ty = ((clientY - rect.top) / rect.height - 0.5) * 0.8;
}
