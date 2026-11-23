import { connections, skillCategories, skillEdges, skillNodes } from '../../data/techStack';
import type { Network, Point } from './physics';

export type Camera = Point & { scale: number };

export type NodeView = Point & {
  size: number;
  opacity: number;
  scale: number;
  lines: string[];
  lineHeight: number;
  labelX: number;
  labelWidth: number;
  labelTop: number;
  font: string;
};

export function readPalette(stage: HTMLElement) {
  const css = getComputedStyle(stage);
  return {
    dark: document.documentElement.classList.contains('dark'),
    text: css.getPropertyValue('--foreground').trim(),
    muted: css.getPropertyValue('--subtle-foreground').trim(),
    dot: css.getPropertyValue('--card').trim(),
  };
}

type Palette = ReturnType<typeof readPalette>;

export function prepareViews(ctx: CanvasRenderingContext2D, network: Network): NodeView[] {
  const compact = network.width < 470;
  return network.bodies.map((body, index) => {
    const node = skillNodes[index];
    const category = node.type === 'category';
    const fontSize = category ? (compact ? 11 : 15) : (compact ? 10 : 12);
    const font = `${category ? 700 : 550} ${fontSize}px system-ui, sans-serif`;
    const lines: string[] = [];
    ctx.font = font;
    for (const word of node.label.split(' ')) {
      const previous = lines[lines.length - 1];
      if (previous && ctx.measureText(`${previous} ${word}`).width <= body.labelWidth) {
        lines[lines.length - 1] += ` ${word}`;
      } else {
        lines.push(word);
      }
    }
    const labelWidth = Math.min(body.labelWidth, Math.max(...lines.map((line) => ctx.measureText(line).width)));
    return {
      x: body.x, y: body.y, size: body.radius, opacity: 1, scale: 1,
      lines, lineHeight: fontSize + 2, labelWidth, labelX: body.x, labelTop: 0, font,
    };
  });
}

export function paintNetwork(
  ctx: CanvasRenderingContext2D,
  network: Network,
  views: NodeView[],
  camera: Camera,
  palette: Palette,
  pixelRatio: number,
  clock: number,
  active: number,
  hovered: number,
  ease: number,
  animated: boolean,
) {
  const { width, height, bodies } = network;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.clearRect(0, 0, width, height);
  const particleCount = width < 470 ? 25 : 61;
  for (let index = 0; index < particleCount; index++) {
    const phase = index * 2.39996;
    const x = ((index * 137 + 31) % 827) / 827 * width + Math.sin(clock * 0.4 + phase) * 3;
    const y = ((index * 211 + 17) % 953) / 953 * height + Math.cos(clock * 0.36 + phase) * 3;
    ctx.globalAlpha = (palette.dark ? 0.21 : 0.17) + Math.sin(phase + clock * 0.6) * 0.09;
    ctx.fillStyle = skillCategories[index % skillCategories.length].color[Number(palette.dark)];
    ctx.beginPath();
    ctx.arc(x, y, index % 7 === 0 ? 1.8 : 0.85, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.translate(camera.x, camera.y);
  ctx.scale(camera.scale, camera.scale);

  const focus = hovered >= 0 ? hovered : active;
  const related = focus >= 0 ? connections[focus] : null;
  const nodesScale = animated ? clock : 0;

  for (let index = 0; index < views.length; index++) {
    const node = bodies[index];
    const view = views[index];
    const category = skillNodes[index].type === 'category';
    const bright = focus === -1 || focus === index || related?.has(index);
    const offset = animated ? (category ? 0 : 0.13) + node.group * 0.055 : 0;
    const reveal = animated ? Math.max(0, Math.min(1, (clock - offset) * 4)) : 1;
    view.opacity += ((bright ? 1 : 0.32) - view.opacity) * ease;
    view.scale += ((index === focus ? 1.19 : 1) - view.scale) * ease;
    view.x = node.x + Math.sin(nodesScale * 0.85 + index * 1.73) * (animated ? 1.8 : 0);
    view.y = node.y + Math.cos(nodesScale * 0.77 + index * 1.21) * (animated ? 1.9 : 0);
    view.size = node.radius * view.scale * (0.86 + reveal * 0.14) * (1 + Math.sin(nodesScale * 1.35 + index) * (animated ? 0.025 : 0));
    const labelHeight = view.lineHeight * view.lines.length;
    const above = view.y - view.size - 5 - labelHeight;
    const below = view.y + view.size + (category ? 7 : 5);
    view.labelTop = (node.labelAbove && above >= 4) || below + labelHeight > height - 4 ? above : below;
    const half = view.labelWidth / 2 + 4;
    view.labelX = Math.max(half, Math.min(width - half, view.x));
  }

  ctx.lineCap = 'round';
  for (const { source, target, crossCategory } of skillEdges) {
    const a = views[source];
    const b = views[target];
    const emphasis = focus === source || focus === target;
    const accent = skillCategories[bodies[source].group].color[Number(palette.dark)];
    const reveal = animated ? Math.max(0, Math.min(1, (clock - 0.27) * 2.8)) : 1;
    ctx.globalAlpha = reveal * (emphasis ? 0.78 + Math.sin(clock * 1.8) * 0.08 : (crossCategory ? 0.25 : 0.45) * Math.min(a.opacity, b.opacity));
    ctx.strokeStyle = emphasis || !crossCategory ? accent : palette.muted;
    ctx.lineWidth = emphasis ? 1.6 : crossCategory ? 0.75 : 0.95;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const bend = crossCategory ? 0.1 : 0.13;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.bezierCurveTo(a.x + dx * 0.38 - dy * bend, a.y + dy * 0.20 + dx * bend,
      a.x + dx * 0.67 - dy * bend, a.y + dy * 0.82 + dx * bend, b.x, b.y);
    ctx.stroke();
  }

  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  for (let index = 0; index < views.length; index++) {
    const view = views[index];
    const body = bodies[index];
    const category = skillNodes[index].type === 'category';
    const color = skillCategories[body.group].color[Number(palette.dark)];
    const emphasized = index === focus;
    const start = category ? 0 : 0.13;
    const reveal = animated ? Math.max(0, Math.min(1, (clock - start - body.group * 0.055) * 4)) : 1;
    const alpha = reveal * view.opacity;
    const { x, y, size } = view;

    if (category || emphasized) {
      const halo = ctx.createRadialGradient(x, y, size * 0.4, x, y, size * 2.55);
      halo.addColorStop(0, color);
      halo.addColorStop(1, 'transparent');
      ctx.globalAlpha = alpha * (emphasized ? 0.45 : palette.dark ? 0.29 : 0.19);
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(x, y, size * 2.55, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = palette.dot;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = category ? 1.55 : 1.3;
    ctx.stroke();

    if (category) {
      const tone = ctx.createLinearGradient(x - size, y - size, x + size, y + size);
      tone.addColorStop(0, color);
      tone.addColorStop(1, palette.dot);
      ctx.globalAlpha = alpha * (palette.dark ? 0.5 : 0.32);
      ctx.fillStyle = tone;
      ctx.beginPath();
      ctx.arc(x, y, size - 1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size * (category ? 0.23 : 0.48), 0, Math.PI * 2);
    ctx.fill();
  }

  // Paint labels last so a connection never crosses over readable text.
  for (let index = 0; index < views.length; index++) {
    const view = views[index];
    const body = bodies[index];
    const category = skillNodes[index].type === 'category';
    const start = category ? 0.06 : 0.26;
    const reveal = animated ? Math.max(0, Math.min(1, (clock - start - body.group * 0.055) * 4)) : 1;
    ctx.globalAlpha = reveal * view.opacity;
    ctx.font = view.font;
    ctx.fillStyle = category || index === focus ? palette.text : palette.muted;
    ctx.strokeStyle = palette.dot;
    ctx.lineWidth = 1.8;
    for (let line = 0; line < view.lines.length; line++) {
      const y = view.labelTop + line * view.lineHeight;
      ctx.strokeText(view.lines[line], view.labelX, y, view.labelWidth);
      ctx.fillText(view.lines[line], view.labelX, y, view.labelWidth);
    }
  }
  ctx.globalAlpha = 1;
}
