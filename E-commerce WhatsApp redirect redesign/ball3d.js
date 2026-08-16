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
    uniforms: { map: { value: null }, uLift: { value: 0 }, uSpin: { value: 0 }, uLight: { value: new THREE.Vector3(-0.42, 0.58, 0.86) } },
    vertexShader: `
      varying vec3 vN; varying vec3 vNv;
      void main() {
        vN = normalize(normal);
        vNv = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform sampler2D map; uniform float uLift; uniform float uSpin; uniform vec3 uLight;
      varying vec3 vN; varying vec3 vNv;
      void main() {
        // A photo of a ball is a matcap, not an equirectangular map: sample with the
        // VIEW-space normal so the ball is reproduced exactly at every angle, and spin
        // it by rotating the lookup about the view axis (a ball turning toward you).
        float c = cos(uSpin), s = sin(uSpin);
        vec2 n = vNv.xy;
        vec2 uv = vec2(n.x * c - n.y * s, n.x * s + n.y * c) * 0.47 + 0.5;
        vec4 tex = texture2D(map, uv);
        vec3 L = normalize(uLight);
        float d = max(dot(vNv, L), 0.0);
        // the photo already carries its own shading — modulate it, don't relight it
        float lam = 0.82 + 0.30 * d;
        float spec = pow(max(reflect(-L, vNv).z, 0.0), 26.0) * 0.26;
        float rim = pow(1.0 - max(vNv.z, 0.0), 3.2) * 0.14;
        gl_FragColor = vec4(tex.rgb * (lam + uLift) + spec + rim, 1.0);
      }`
  });

  mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 96), material);
  scene.add(mesh);
} catch (e) { ok = false; }

function texture(src, onReady) {
  let t = texCache.get(src);
  if (!t) {
    t = new THREE.TextureLoader().load(src, () => {
      t._ready = true;
      (t._waiting || []).forEach(fn => fn());
      t._waiting = [];
    });
    t.colorSpace = THREE.SRGBColorSpace;
    t.minFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    t._waiting = [];
    texCache.set(src, t);
  }
  if (onReady) { if (t._ready) onReady(); else t._waiting.push(onReady); }
  return t;
}

const io = typeof IntersectionObserver !== "undefined"
  ? new IntersectionObserver(es => es.forEach(e => { e.target._visible = e.isIntersecting; }), { rootMargin: "120px" })
  : null;

// CSS percentages can't clamp a replaced element to its host's SHORTER axis,
// so the sphere box is measured and set in pixels instead.
const ro = typeof ResizeObserver !== "undefined"
  ? new ResizeObserver(es => es.forEach(e => {
      const el = e.target;
      if (!el._canvas) return;
      const r = el.getBoundingClientRect();
      const s = Math.max(0, Math.floor(Math.min(r.width, r.height)));
      el._canvas.style.width = s + "px";
      el._canvas.style.height = s + "px";
    }))
  : null;

class Ball3D extends HTMLElement {
  static get observedAttributes() { return ["src", "flat"]; }

  attributeChangedCallback(name, oldV, val) {
    if (!this._built || oldV === val) return;
    if (name === "src") {
      if (this._img) this._img.src = val || "";
      else if (this.hasAttribute("flat") || !ok) this._rebuild();
      else this._tex = texture(val, () => this.paintOnce());
    }
    if (name === "flat") this._rebuild();
  }

  _rebuild() {
    this.innerHTML = "";
    this._built = false;
    registry.delete(this);
    this._img = null;
    // the new canvas must not be measured against the old one's cached size
    this._canvas = null;
    this._fit = null;
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
    this._tx = 0; this._ty = 0;
    this._spin = 0.16;
    this._lift = 0;

    // no WebGL, or a product that isn't a sphere: plain image
    if (!ok || this.hasAttribute("flat")) {
      const src = this.getAttribute("src");
      if (!src || src.indexOf("{{") !== -1) return; // unresolved template hole: render nothing
      const img = document.createElement("img");
      img.src = src;
      img.alt = this.getAttribute("alt") || "";
      img.loading = "lazy";
      img.decoding = "async";
      img.style.cssText = "width:100%;height:100%;min-width:0;min-height:0;object-fit:contain;display:block";
      this.appendChild(img);
      this._img = img;
      return;
    }

    this._canvas = document.createElement("canvas");
    this._canvas.width = SIZE;
    this._canvas.height = SIZE;
    this._canvas.style.cssText = "display:block";
    this._ctx = this._canvas.getContext("2d");
    this.appendChild(this._canvas);

    this._tex = texture(this.getAttribute("src"), () => this.paintOnce());
    this._visible = true;
    if (io) io.observe(this);
    if (ro) ro.observe(this);
    registry.add(this);
    // rAF and ResizeObserver delivery are both tied to the rendering steps, which are
    // paused in hidden/background documents — size once synchronously so the canvas is
    // never left at its intrinsic 420px inside a smaller host.
    this.fit();
    this.paintOnce();
    requestAnimationFrame(() => this.fit());

    this.addEventListener("pointerenter", () => { this._spin = 0.6; this._lift = 0.08; });
    this.addEventListener("pointerleave", () => { this._spin = 0.16; this._lift = 0; this._tx = 0; this._ty = 0; });
    this.addEventListener("pointermove", e => {
      const r = this.getBoundingClientRect();
      this._tx = ((e.clientX - r.left) / r.width - 0.5) * 1.1;
      this._ty = ((e.clientY - r.top) / r.height - 0.5) * 0.8;
    }, { passive: true });
  }

  disconnectedCallback() { registry.delete(this); if (io) io.unobserve(this); if (ro) ro.unobserve(this); }

  // A ball is only ever drawn by the rAF loop, which is suspended in hidden documents
  // (screenshots, exports, background tabs) — so paint one static frame off the texture
  // load as well, guaranteeing every canvas holds a real sphere.
  paintOnce() {
    if (!this._canvas || !this.isConnected) return;
    this.fit();
    this.frame(0);
  }

  fit() {
    if (!this._canvas) return;
    const r = this.getBoundingClientRect();
    const s = Math.max(0, Math.floor(Math.min(r.width, r.height)));
    if (s && s !== this._fit) {
      this._fit = s;
      this._canvas.style.width = s + "px";
      this._canvas.style.height = s + "px";
    }
  }

  frame(dt) {
    this.fit();
    this._yaw += dt * this._spin;
    this._offY = (this._offY || 0) + (this._tx - (this._offY || 0)) * 0.12;
    this._offX = (this._offX || 0) + (this._ty - (this._offX || 0)) * 0.12;
    const lift = 1 + (this._lift > 0 ? 0.05 : 0);
    mesh.rotation.set(0, 0, 0);
    mesh.position.set(this._offY * 0.14, -this._offX * 0.14, 0);
    mesh.scale.setScalar(lift);
    material.uniforms.map.value = this._tex;
    material.uniforms.uLift.value = this._lift;
    material.uniforms.uSpin.value = this._yaw;
    // the light tracks the pointer, so the highlight travels across the surface
    material.uniforms.uLight.value.set(-0.42 + this._offY * 0.9, 0.58 - this._offX * 0.9, 0.86);
    renderer.render(scene, camera);
    this._ctx.clearRect(0, 0, SIZE, SIZE);
    this._ctx.drawImage(renderer.domElement, 0, 0);
  }
}

if (!customElements.get("ball-3d")) customElements.define("ball-3d", Ball3D);

if (ok) {
  addEventListener("resize", () => registry.forEach(el => el.fit()));
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
