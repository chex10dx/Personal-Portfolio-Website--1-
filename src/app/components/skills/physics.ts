import { skillCategories, skillEdges, skillNodes } from '../../data/techStack';

export type Point = { x: number; y: number };
export type Body = Point & {
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  radius: number;
  labelWidth: number;
  labelAbove: boolean;
  group: number;
};

type Spring = { source: number; target: number; length: number; strength: number };
export type Network = { bodies: Body[]; springs: Spring[]; width: number; height: number };
export type Pin = Point & { index: number };

export function createNetwork(width: number, height: number, animate: boolean): Network {
  const columns = width < 620 ? 2 : width < 980 ? 3 : 4;
  const rows = Math.ceil(skillCategories.length / columns);
  const compact = columns === 2;
  const inset = compact ? 8 : 18;
  const cellWidth = (width - inset * 2) / columns;
  const cellHeight = (height - inset * 2) / rows;
  const bodies: Body[] = [];

  const add = (x: number, y: number, group: number, radius: number, labelWidth: number, labelAbove: boolean) => {
    bodies.push({ x, y, homeX: x, homeY: y, vx: 0, vy: 0, radius, labelWidth, labelAbove, group });
  };

  skillCategories.forEach(({ skills }, group) => {
    const row = Math.floor(group / columns);
    const rowGroups = Math.min(columns, skillCategories.length - row * columns);
    const x = inset + (group % columns + 0.5 + (columns - rowGroups) / 2) * cellWidth;
    const y = inset + (row + 0.5) * cellHeight;
    const rowLength = skills.length;
    const topCount = Math.ceil(rowLength / 2);
    const rise = cellHeight * (compact ? 0.28 : 0.29);

    add(x, y - 5, group, compact ? 13 : 19, cellWidth - 14, false);
    skills.forEach((_, index) => {
      const top = index < topCount;
      const count = top ? topCount : rowLength - topCount;
      const slot = top ? index : index - topCount;
      const spread = cellWidth * (compact ? 0.94 : 0.92);
      const slotWidth = spread / count;
      const skillX = x + (slot + 0.5 - count / 2) * slotWidth;
      const skillY = y + (top ? -rise : rise) + (compact ? 0 : Math.abs(slot + 0.5 - count / 2) * (top ? 9 : -8));
      add(skillX, skillY, group, compact ? 5 : 7, slotWidth - (compact ? 6 : 8), top);
    });
  });

  const springs = skillEdges.map(({ source, target, crossCategory }) => ({
    source, target,
    length: Math.hypot(bodies[target].x - bodies[source].x, bodies[target].y - bodies[source].y) * 0.98,
    strength: crossCategory ? 0.85 : 4.8,
  }));
  if (animate) {
    let hub = bodies[0];
    bodies.forEach((body, index) => {
      if (skillNodes[index].type === 'category') {
        hub = body;
      } else {
        body.x += (hub.x - body.x) * 0.19;
        body.y += (hub.y - body.y) * 0.19;
      }
    });
  }

  return { bodies, springs, width, height };
}

export function advanceNetwork(network: Network, dt: number, pin: Pin | null) {
  const { bodies, springs, width, height } = network;
  const damping = Math.exp(-6 * dt);

  for (const { source, target, length, strength } of springs) {
    const a = bodies[source];
    const b = bodies[target];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const distance = Math.hypot(dx, dy) || 1;
    const held = pin?.index === source || pin?.index === target;
    const pull = (distance - length) * strength * (held ? 2.6 : 1) * dt / distance;
    a.vx += dx * pull;
    a.vy += dy * pull;
    b.vx -= dx * pull;
    b.vy -= dy * pull;
  }

  for (let i = 0; i < bodies.length; i++) {
    const a = bodies[i];
    for (let j = i + 1; j < bodies.length; j++) {
      const b = bodies[j];
      const dx = b.x - a.x || 0.01;
      const dy = b.y - a.y;
      const gap = a.radius + b.radius + 11;
      const reach = gap + 25;
      const distanceSquared = dx * dx + dy * dy;
      if (distanceSquared >= reach * reach) continue;
      const distance = Math.sqrt(distanceSquared);
      const repulsion = ((reach - distance) * 2 + Math.max(0, gap - distance) * 32) * dt / distance;
      a.vx -= dx * repulsion;
      a.vy -= dy * repulsion;
      b.vx += dx * repulsion;
      b.vy += dy * repulsion;
    }
  }

  bodies.forEach((body, index) => {
    if (pin?.index === index) {
      const follow = Math.min(1, dt * 32);
      body.x += (pin.x - body.x) * follow;
      body.y += (pin.y - body.y) * follow;
      body.vx = body.vy = 0;
    } else {
      body.vx = (body.vx + (body.homeX - body.x) * 9 * dt) * damping;
      body.vy = (body.vy + (body.homeY - body.y) * 9 * dt) * damping;
      body.x += body.vx * dt;
      body.y += body.vy * dt;
    }

    body.x = Math.max(body.radius + 8, Math.min(width - body.radius - 8, body.x));
    body.y = Math.max(body.radius + 20, Math.min(height - body.radius - 20, body.y));
  });
}
