// Hartono Home Ledger — hand-drawn canvas charts, no library.
// drawDonut: spending share by category. drawBars: monthly trend bars.

function cssVar(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

export function drawDonut(canvas, slices) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const size = 220;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, size, size);
  const total = slices.reduce((s, x) => s + x.value, 0);
  const cx = size / 2;
  const cy = size / 2;
  const r = 96;
  const inner = 58;
  if (total <= 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = '#ece5d2';
    ctx.fill();
    return;
  }
  let start = -Math.PI / 2;
  for (const s of slices) {
    const angle = (s.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, start + angle);
    ctx.closePath();
    ctx.fillStyle = s.color;
    ctx.fill();
    start += angle;
  }
  ctx.beginPath();
  ctx.arc(cx, cy, inner, 0, Math.PI * 2);
  ctx.fillStyle = cssVar('--card', '#fffdf7');
  ctx.fill();
  ctx.fillStyle = '#143d2f';
  ctx.font = '700 22px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`$${Math.round(total).toLocaleString('en-US')}`, cx, cy - 8);
  ctx.fillStyle = '#6b7a72';
  ctx.font = '12px -apple-system, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('spent in Nov', cx, cy + 14);
}

export function drawBars(canvas, data) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const w = 560;
  const h = 240;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = '100%';
  canvas.style.height = 'auto';
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);
  const max = Math.max(...data.map((d) => d.spent)) * 1.08;
  const padL = 52;
  const padB = 30;
  const padT = 14;
  const plotW = w - padL - 12;
  const plotH = h - padT - padB;
  const bw = plotW / data.length;
  // Gridlines + value labels.
  ctx.strokeStyle = '#e4dcc8';
  ctx.fillStyle = '#6b7a72';
  ctx.font = '11px -apple-system, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (let g = 0; g <= 3; g++) {
    const v = (max / 3) * g;
    const y = padT + plotH - (v / max) * plotH;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(w - 12, y);
    ctx.stroke();
    ctx.fillText(`$${Math.round(v).toLocaleString('en-US')}`, padL - 8, y);
  }
  // Bars.
  data.forEach((d, i) => {
    const bh = (d.spent / max) * plotH;
    const x = padL + i * bw + bw * 0.2;
    const y = padT + plotH - bh;
    ctx.fillStyle = i === data.length - 1 ? '#d98e1f' : '#1e5c46';
    ctx.beginPath();
    ctx.roundRect(x, y, bw * 0.6, bh, [4, 4, 0, 0]);
    ctx.fill();
    ctx.fillStyle = '#22302a';
    ctx.font = '700 12px -apple-system, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`$${Math.round(d.spent).toLocaleString('en-US')}`, x + bw * 0.3, y - 8);
    ctx.fillStyle = '#6b7a72';
    ctx.font = '12px -apple-system, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(d.month, x + bw * 0.3, padT + plotH + 16);
  });
}
