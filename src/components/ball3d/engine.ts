import * as THREE from 'three';

export const SIZE = 420;

export interface BallInstance {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  texture: THREE.Texture;
  yaw: number;
  pitch: number;
  spin: number;
  lift: number;
  tx: number;
  ty: number;
  offX: number;
  offY: number;
  visible: boolean;
}

export interface Engine {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  registry: Set<BallInstance>;
  textureCache: Map<string, THREE.Texture>;
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

// Orthographic projection of the object-space normal into the cut-out photo,
// so the ball's own panels and print wrap the sphere and turn with it.
const VERTEX_SHADER = `
  varying vec3 vN; varying vec3 vNv;
  void main() {
    vN = normalize(normal);
    vNv = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  uniform sampler2D map; uniform float uLift;
  varying vec3 vN; varying vec3 vNv;
  void main() {
    vec2 uv = vN.xy * 0.47 + 0.5;
    vec4 tex = texture2D(map, uv);
    vec3 L = normalize(vec3(-0.42, 0.58, 0.86));
    float d = max(dot(vNv, L), 0.0);
    float lam = 0.5 + 0.62 * d;
    vec3 R = reflect(-L, vNv);
    float spec = pow(max(R.z, 0.0), 26.0) * 0.30;
    float rim = pow(1.0 - max(vNv.z, 0.0), 3.2) * 0.16;
    vec3 col = tex.rgb * (lam + uLift) + spec + rim;
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
      uniforms: { map: { value: null }, uLift: { value: 0 } },
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

export function getTexture(engine: Engine, src: string): THREE.Texture {
  let texture = engine.textureCache.get(src);
  if (!texture) {
    texture = new THREE.TextureLoader().load(src);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    engine.textureCache.set(src, texture);
  }
  return texture;
}

export function createInstance(canvas: HTMLCanvasElement, texture: THREE.Texture): BallInstance {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('ball3d: 2D canvas context unavailable');
  return {
    canvas,
    ctx,
    texture,
    yaw: Math.random() * Math.PI * 2,
    pitch: 0.16,
    spin: 0.22,
    lift: 0,
    tx: 0,
    ty: 0,
    offX: 0,
    offY: 0,
    visible: true,
  };
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
    instance.yaw += step * instance.spin;
    instance.offY += (instance.tx - instance.offY) * 0.12;
    instance.offX += (instance.ty - instance.offX) * 0.12;
    engine.mesh.rotation.set(instance.pitch + instance.offX, instance.yaw + instance.offY, 0.13);
    engine.material.uniforms.map.value = instance.texture;
    engine.material.uniforms.uLift.value = instance.lift;
    engine.renderer.render(engine.scene, engine.camera);
    instance.ctx.clearRect(0, 0, SIZE, SIZE);
    instance.ctx.drawImage(engine.renderer.domElement, 0, 0);
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
  instance.spin = 0.85;
  instance.lift = 0.1;
}

export function onPointerLeave(instance: BallInstance) {
  instance.spin = 0.22;
  instance.lift = 0;
  instance.tx = 0;
  instance.ty = 0;
}

export function onPointerMove(instance: BallInstance, clientX: number, clientY: number, rect: DOMRect) {
  instance.tx = ((clientX - rect.left) / rect.width - 0.5) * 1.1;
  instance.ty = ((clientY - rect.top) / rect.height - 0.5) * 0.8;
}
