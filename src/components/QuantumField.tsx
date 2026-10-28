import { useEffect, useRef } from "react";

/**
 * Real-time 3D particle instrument. Particles morph between mathematical
 * forms and Three Kingdoms motifs (fortress, army formation, war engine)
 * as sections with [data-scene] scroll into view.
 */
const N = 2600;
type V = [number, number, number];
const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const line = (a: V, b: V): V => { const t = Math.random(); return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; };

function fill(gen: () => V) { const o = new Float32Array(N * 3); for (let i = 0; i < N; i++) { const p = gen(); o.set(p, i * 3); } return o; }

function lorenz() {
  const pts: V[] = []; let x = 0.1, y = 0, z = 0;
  for (let i = 0; i < N + 200; i++) {
    const dt = 0.008; const dx = 10 * (y - x), dy = x * (28 - z) - y, dz = x * y - (8 / 3) * z;
    x += dx * dt; y += dy * dt; z += dz * dt; if (i > 200) pts.push([x / 22, (z - 25) / 22, y / 22]);
  }
  let i = 0; return fill(() => pts[i++]!);
}

// 城 — walled fort with corner towers and a tiered gate pavilion
function fortress() {
  return fill(() => {
    const r = Math.random();
    if (r < 0.4) { // walls with crenellations
      const s = Math.floor(Math.random() * 4), u = rnd(-1, 1);
      const x = s < 2 ? u : s === 2 ? -1 : 1, z = s < 2 ? (s ? 1 : -1) : u;
      const along = s < 2 ? x : z; const top = Math.floor((along + 1) * 12) % 2 ? 0.05 : 0;
      return [x, rnd(-0.6, -0.3 + top), z];
    }
    if (r < 0.55) { // corner towers
      const cx = Math.random() < 0.5 ? -1 : 1, cz = Math.random() < 0.5 ? -1 : 1, a = rnd(0, 6.28);
      return [cx + Math.cos(a) * 0.1, rnd(-0.6, -0.1), cz + Math.sin(a) * 0.1];
    }
    // three-tier pavilion with upturned eaves
    const tier = Math.floor(Math.random() * 3); const w = 0.45 - tier * 0.12; const y0 = -0.3 + tier * 0.28;
    if (Math.random() < 0.55) { const u = rnd(-1, 1), v = rnd(-1, 1); const e = Math.max(Math.abs(u), Math.abs(v));
      return [u * (w + 0.1), y0 + 0.18 - e * 0.14 + Math.pow(Math.abs(u * v), 3) * 0.12, v * (w + 0.1)]; }
    return [rnd(-w, w) * 0.8, rnd(y0, y0 + 0.08), (Math.random() < 0.5 ? -w : w) * 0.8];
  });
}

// 八陣圖 — eight battalions around a command centre, spears raised
function army() {
  return fill(() => {
    const k = Math.floor(Math.random() * 9);
    const a = (k / 8) * Math.PI * 2, R = k === 8 ? 0 : 0.72;
    const cx = Math.cos(a) * R, cz = Math.sin(a) * R;
    const gx = Math.floor(rnd(0, 5)), gz = Math.floor(rnd(0, 5));
    const x = cx + (gx - 2) * 0.055, z = cz + (gz - 2) * 0.055;
    if (k === 8 && Math.random() < 0.3) return [rnd(-0.02, 0.02), rnd(-0.5, 0.35), 0]; // banner pole
    return Math.random() < 0.6 ? [x, rnd(-0.5, -0.4), z] : [x, rnd(-0.4, -0.15), z];
  });
}

// 霹靂車 — counterweight trebuchet
function trebuchet() {
  const segs: [V, V][] = [
    [[-0.6, -0.6, -0.3], [0.6, -0.6, -0.3]], [[-0.6, -0.6, 0.3], [0.6, -0.6, 0.3]],
    [[-0.3, -0.6, -0.3], [0, 0.2, -0.3]], [[0.3, -0.6, -0.3], [0, 0.2, -0.3]],
    [[-0.3, -0.6, 0.3], [0, 0.2, 0.3]], [[0.3, -0.6, 0.3], [0, 0.2, 0.3]],
    [[0, 0.2, -0.3], [0, 0.2, 0.3]], [[-0.35, -0.05, 0], [0.85, 0.75, 0]],
    [[0.85, 0.75, 0], [0.95, 0.2, 0]], [[-0.35, -0.05, 0], [-0.35, -0.3, 0]],
  ];
  return fill(() => {
    if (Math.random() < 0.18) { const a = rnd(0, 6.28), b = rnd(0, 3.14); return [-0.35 + 0.15 * Math.sin(b) * Math.cos(a), -0.4 + 0.15 * Math.cos(b), 0.15 * Math.sin(b) * Math.sin(a)]; }
    const s = segs[Math.floor(Math.random() * segs.length)]!; const p = line(s[0], s[1]);
    return [p[0] + rnd(-0.01, 0.01), p[1] + rnd(-0.01, 0.01), p[2] + rnd(-0.01, 0.01)];
  });
}

function torusKnot() {
  return fill(() => { const t = rnd(0, Math.PI * 2), p = 2, q = 3, r = 0.5 + 0.22 * Math.cos(q * t), a = rnd(0, 6.28);
    const x = r * Math.cos(p * t), y = 0.22 * Math.sin(q * t), z = r * Math.sin(p * t);
    return [x + Math.cos(a) * 0.04, y + Math.sin(a) * 0.04, z + Math.cos(a + 1) * 0.04]; });
}

export const SCENES = { attractor: lorenz, fortress, army, engine: trebuchet, knot: torusKnot };
export type SceneKey = keyof typeof SCENES;

export function QuantumField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!; const ctx = canvas.getContext("2d")!;
    const st = getComputedStyle(document.documentElement);
    const rgb = (v: string) => { ctx.fillStyle = v.trim(); ctx.fillRect(0, 0, 1, 1); const d = ctx.getImageData(0, 0, 1, 1).data; return `${d[0]},${d[1]},${d[2]}`; };
    const field = rgb(st.getPropertyValue("--field")), gold = rgb(st.getPropertyValue("--accent"));
    const shapes = Object.fromEntries(Object.entries(SCENES).map(([k, f]) => [k, f()])) as Record<SceneKey, Float32Array>;
    const pos = Float32Array.from(shapes.attractor); let target = shapes.attractor;
    for (let i = 0; i < pos.length; i++) pos[i]! += rnd(-2, 2);
    const speed = Float32Array.from({ length: N }, () => rnd(0.02, 0.06));
    const isGold = Uint8Array.from({ length: N }, () => (Math.random() < 0.08 ? 1 : 0));
    let w = 0, h = 0, raf = 0, t = 0; const m = { x: 0, y: 0, tx: 0, ty: 0 };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const resize = () => { const dpr = Math.min(devicePixelRatio || 1, 2); w = canvas.clientWidth; h = canvas.clientHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };

    const io = new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting) { const k = (e.target as HTMLElement).dataset.scene as SceneKey; if (shapes[k]) target = shapes[k]; } }, { rootMargin: "-45% 0px -45% 0px" });
    document.querySelectorAll("[data-scene]").forEach((el) => io.observe(el));

    const draw = () => {
      t += 0.004; m.x += (m.tx - m.x) * 0.04; m.y += (m.ty - m.y) * 0.04;
      ctx.globalCompositeOperation = "source-over"; ctx.fillStyle = "rgba(0,0,0,0)"; ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      const ry = t * 0.6 + m.x * 0.8, rx = 0.35 + m.y * 0.4, cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
      const S = Math.min(w, h) * (w < 640 ? 0.42 : 0.36), ox = w < 900 ? w / 2 : w * 0.66, oy = h * 0.5;
      for (let i = 0; i < N; i++) {
        const j = i * 3, k = speed[i]!;
        pos[j]! += (target[j]! - pos[j]!) * k; pos[j + 1]! += (target[j + 1]! - pos[j + 1]!) * k; pos[j + 2]! += (target[j + 2]! - pos[j + 2]!) * k;
        const n = Math.sin(t * 3 + i) * 0.006;
        const x = pos[j]! + n, y = -pos[j + 1]!, z = pos[j + 2]! + n;
        const x1 = x * cy - z * sy, z1 = x * sy + z * cy, y1 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
        const p = 2.6 / (2.6 + z2); const px = ox + x1 * S * p, py = oy + y1 * S * p;
        const a = Math.max(0.05, Math.min(0.9, (1.2 - z2) * 0.35));
        const s = isGold[i] ? 1.8 * p : 1.1 * p;
        ctx.fillStyle = `rgba(${isGold[i] ? gold : field},${a})`; ctx.fillRect(px, py, s, s);
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    const onMove = (e: PointerEvent) => { m.tx = e.clientX / w - 0.5; m.ty = e.clientY / h - 0.5; };
    resize(); draw();
    addEventListener("resize", resize); addEventListener("pointermove", onMove);
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener("resize", resize); removeEventListener("pointermove", onMove); };
  }, []);
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}
