// <ball-3d src="..."> — real three.js sphere per ball, one shared WebGL context.
import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const SIZE = 420;
const registry = new Set();
const texCache = new Map();

let renderer, scene, camera, mesh, material, ok = true;

try {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, premultipliedAlpha: false });
  renderer.setPixelRatio(1);
  renderer.setSize(SIZE, SIZE, false);
  renderer.setClearColor(0x000000, 0);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 6.2);

  material = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: { map: { value: null }, uLift: { value: 0 } },
    vertexShader: `
      varying vec3 vN; varying vec3 vNv;
      void main() {
        vN = normalize(normal);
        vNv = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform sampler2D map; uniform float uLift;
      varying vec3 vN; varying vec3 vNv;
      void main() {
        // orthographic projection of the object-space normal into the cut-out photo,
        // so the ball's own panels and print wrap the sphere and turn with it
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
      }`
  });

  mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 96), material);
  scene.add(mesh);
} catch (e) { ok = false; }

function texture(src) {
  if (!texCache.has(src)) {
    const t = new THREE.TextureLoader().load(src);
    t.colorSpace = THREE.SRGBColorSpace;
    t.minFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    texCache.set(src, t);
  }
  return texCache.get(src);
}

const io = typeof IntersectionObserver !== "undefined"
  ? new IntersectionObserver(es => es.forEach(e => { e.target._visible = e.isIntersecting; }), { rootMargin: "120px" })
  : null;

class Ball3D extends HTMLElement {
  static get observedAttributes() { return ["src", "flat"]; }

  attributeChangedCallback(name, oldV, val) {
    if (!this._built || oldV === val) return;
    if (name === "src") {
      if (this._img) this._img.src = val || "";
      else if (ok) this._tex = texture(val);
    }
    if (name === "flat") this._rebuild();
  }

  _rebuild() {
    this.innerHTML = "";
    this._built = false;
    registry.delete(this);
    this._img = null;
    this.connectedCallback();
  }

  connectedCallback() {
    if (this._built) return;
    this._built = true;
    this.style.display = "grid";
    this.style.placeItems = "center";
    this.style.minWidth = "0";
    this.style.minHeight = "0";

    this._yaw = Math.random() * Math.PI * 2;
    this._pitch = 0.16;
    this._tx = 0; this._ty = 0;
    this._spin = 0.22;
    this._lift = 0;

    // no WebGL, or a product that isn't a sphere: plain image
    if (!ok || this.hasAttribute("flat")) {
      const img = document.createElement("img");
      img.src = this.getAttribute("src") || "";
      img.alt = this.getAttribute("alt") || "";
      img.loading = "lazy";
      img.decoding = "async";
      img.style.cssText = "max-width:100%;max-height:100%;object-fit:contain";
      this.appendChild(img);
      this._img = img;
      return;
    }

    this._canvas = document.createElement("canvas");
    this._canvas.width = SIZE;
    this._canvas.height = SIZE;
    this._canvas.style.cssText = "width:100%;height:100%;object-fit:contain;aspect-ratio:1;display:block";
    this._ctx = this._canvas.getContext("2d");
    this.appendChild(this._canvas);

    this._tex = texture(this.getAttribute("src"));
    this._visible = true;
    if (io) io.observe(this);
    registry.add(this);

    this.addEventListener("pointerenter", () => { this._spin = 0.85; this._lift = 0.1; });
    this.addEventListener("pointerleave", () => { this._spin = 0.22; this._lift = 0; this._tx = 0; this._ty = 0; });
    this.addEventListener("pointermove", e => {
      const r = this.getBoundingClientRect();
      this._tx = ((e.clientX - r.left) / r.width - 0.5) * 1.1;
      this._ty = ((e.clientY - r.top) / r.height - 0.5) * 0.8;
    }, { passive: true });
  }

  disconnectedCallback() { registry.delete(this); if (io) io.unobserve(this); }

  frame(dt) {
    this._yaw += dt * this._spin;
    this._offY = (this._offY || 0) + ((this._tx) - (this._offY || 0)) * 0.12;
    this._offX = (this._offX || 0) + ((this._ty) - (this._offX || 0)) * 0.12;
    mesh.rotation.set(this._pitch + this._offX, this._yaw + this._offY, 0.13);
    material.uniforms.map.value = this._tex;
    material.uniforms.uLift.value = this._lift;
    renderer.render(scene, camera);
    this._ctx.clearRect(0, 0, SIZE, SIZE);
    this._ctx.drawImage(renderer.domElement, 0, 0);
  }
}

if (!customElements.get("ball-3d")) customElements.define("ball-3d", Ball3D);

if (ok) {
  let last = performance.now(), acc = 0;
  const loop = now => {
    requestAnimationFrame(loop);
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    acc += dt;
    if (acc < 1 / 40) return;
    const step = acc; acc = 0;
    registry.forEach(el => { if (el._visible && el.isConnected) el.frame(step); });
  };
  requestAnimationFrame(loop);
}
