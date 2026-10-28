import { useEffect, useRef } from "react";

/**
 * Generative background: a fortress-like lattice (walls, gate towers,
 * bracket-set rhythm) whose nodes slowly drift and dissolve into particles.
 */
export function LatticeField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const styles = getComputedStyle(document.documentElement);
    const toRgb = (v: string) => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = v.trim();
      ctx.fillRect(0, 0, 1, 1);
      const d = ctx.getImageData(0, 0, 1, 1).data;
      return `${d[0]},${d[1]},${d[2]}`;
    };
    const fieldRgb = toRgb(styles.getPropertyValue("--field"));
    const goldRgb = toRgb(styles.getPropertyValue("--accent"));

    type N = { hx: number; hy: number; x: number; y: number; p: number; gold: boolean; free: boolean; vx: number; vy: number };
    let nodes: N[] = [];
    let edges: [number, number][] = [];
    let w = 0, h = 0, raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = []; edges = [];
      const cell = w < 640 ? 34 : 46;
      const cols = Math.ceil(w / cell) + 1;
      const base = h * 0.78;
      const idx: Record<string, number> = {};
      // Crenellated wall silhouette with periodic watchtowers
      for (let c = 0; c < cols; c++) {
        const tower = c % 9 === 4;
        const merlon = c % 2 === 0;
        const rows = tower ? 9 : merlon ? 5 : 4;
        for (let r = 0; r < rows; r++) {
          const x = c * cell - cell / 2;
          const y = base - r * cell * 0.62;
          idx[`${c},${r}`] = nodes.length;
          nodes.push({ hx: x, hy: y, x, y, p: Math.random() * 6.28, gold: tower && r === rows - 1, free: false, vx: 0, vy: 0 });
        }
      }
      for (let c = 0; c < cols; c++) for (let r = 0; r < 10; r++) {
        const a = idx[`${c},${r}`]; if (a === undefined) continue;
        const up = idx[`${c},${r + 1}`]; const rt = idx[`${c + 1},${r}`]; const dg = idx[`${c + 1},${r + 1}`];
        if (up !== undefined) edges.push([a, up]);
        if (rt !== undefined) edges.push([a, rt]);
        if (dg !== undefined && (c + r) % 3 === 0) edges.push([a, dg]);
      }
      // Free particles: the information field above the wall
      const count = w < 640 ? 70 : 160;
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w, y = Math.random() * base;
        nodes.push({ hx: x, hy: y, x, y, p: Math.random() * 6.28, gold: Math.random() < 0.03, free: true, vx: (Math.random() - 0.5) * 0.12, vy: -Math.random() * 0.08 - 0.02 });
      }
    };

    let t = 0;
    const draw = () => {
      t += 0.006;
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (n.free) {
          n.x += n.vx; n.y += n.vy;
          if (n.y < -10) { n.y = h * 0.75; n.x = Math.random() * w; }
          if (n.x < -10) n.x = w + 10; if (n.x > w + 10) n.x = -10;
        } else {
          // dissolve upward: upper wall nodes breathe more
          const lift = (h * 0.78 - n.hy) / h;
          n.x = n.hx + Math.sin(t + n.p) * (1 + lift * 18);
          n.y = n.hy + Math.cos(t * 0.8 + n.p) * (1 + lift * 12);
        }
        const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 120) { n.x += (dx / d) * (120 - d) * 0.08; n.y += (dy / d) * (120 - d) * 0.08; }
      }
      ctx.lineWidth = 0.6;
      for (const [a, b] of edges) {
        const A = nodes[a], B = nodes[b];
        const o = 0.1 + 0.07 * Math.sin(t * 2 + A.p);
        ctx.strokeStyle = `rgba(${fieldRgb},${o})`;
        ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
      }
      // faint network links between nearby free particles
      const free = nodes.filter((n) => n.free);
      for (let i = 0; i < free.length; i++) for (let j = i + 1; j < free.length; j++) {
        const d = Math.hypot(free[i].x - free[j].x, free[i].y - free[j].y);
        if (d < 90) {
          ctx.strokeStyle = `rgba(${fieldRgb},${0.07 * (1 - d / 90)})`;
          ctx.beginPath(); ctx.moveTo(free[i].x, free[i].y); ctx.lineTo(free[j].x, free[j].y); ctx.stroke();
        }
      }
      for (const n of nodes) {
        const o = 0.25 + 0.25 * Math.sin(t * 3 + n.p);
        ctx.fillStyle = n.gold ? `rgba(${goldRgb},${o + 0.3})` : `rgba(${fieldRgb},${o * 0.7})`;
        ctx.fillRect(n.x - 0.8, n.y - 0.8, n.gold ? 2.2 : 1.6, n.gold ? 2.2 : 1.6);
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    build(); draw();
    window.addEventListener("resize", build);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}
