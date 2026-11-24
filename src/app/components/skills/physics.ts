import { skillCategories } from '../../data/techStack';
import type { GraphData } from './networkData';

export type Point = { x: number; y: number };
export type Body = Point & {
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  radius: number;
  labelWidth: number;
  group: number;
};

type Spring = { source: number; target: number; length: number; strength: number };
export type Network = GraphData & { bodies: Body[]; springs: Spring[]; width: number; height: number };
export type Pin = Point & { index: number };

const groupIndex = new Map(skillCategories.map(({ id }, index) => [id, index]));

export function createNetwork(width: number, height: number, graph: GraphData, animate: boolean): Network {
  const compact = width < 600;
  const columns = compact ? 2 : width < 900 ? 3 : 4;
  const rows = Math.ceil(graph.nodes.length / 2 / columns);
  const cellWidth = width / columns;
  const cellHeight = height / rows;
  const skillColumns = compact ? 2 : 4;
  const skillWidth = width / skillColumns;
  const skillRows = Math.ceil((graph.nodes.length - 1) / skillColumns);
  const bodies = graph.nodes.map((node, index): Body => {
    const group = groupIndex.get(node.category)!;
    const category = node.type === 'category';
    let x = width / 2;
    let y = height / 2;
    let labelWidth = Math.min(width - 28, 320);
    if (graph.overview) {
      const row = Math.floor(group / columns);
      const rowGroups = Math.min(columns, graph.nodes.length / 2 - row * columns);
      x = (group % columns + 0.5 + (columns - rowGroups) / 2) * cellWidth;
      y = (row + (category ? 0.24 : 0.67)) * cellHeight;
      if (!category) x += cellWidth * (group % 2 ? -0.12 : 0.12);
      labelWidth = cellWidth * (category ? 0.88 : 0.73);
    } else if (!category) {
      const row = Math.floor((index - 1) / skillColumns);
      const rowStart = row * skillColumns;
      const rowLength = Math.min(skillColumns, graph.nodes.length - 1 - rowStart);
      x = (index - 1 - rowStart + 0.5 + (skillColumns - rowLength) / 2) * skillWidth;
      const slots = compact && skillRows > 2 ? [0.10, 0.28, 0.64, 0.82] : [0.22, 0.73];
      y = slots[row] * height;
      labelWidth = skillWidth - 16;
    }
    const radius = category ? node.id === 'frontend' && graph.overview ? 9 : compact ? 12 : 16 : compact ? 5 : 7;
    const startY = animate && !category ? y + (height / 2 - y) * 0.025 : y;
    return { x, y: startY, homeX: x, homeY: y, vx: 0, vy: 0, radius, labelWidth, group };
  });

  const springs = graph.edges.map(({ source, target, crossCategory }) => ({
    source, target,
    length: Math.hypot(bodies[target].homeX - bodies[source].homeX, bodies[target].homeY - bodies[source].homeY),
    strength: crossCategory ? 0.65 : 4.2,
  }));
  return { ...graph, bodies, springs, width, height };
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
      const gap = a.radius + b.radius + 6;
      const distanceSquared = dx * dx + dy * dy;
      if (distanceSquared >= gap * gap) continue;
      const distance = Math.sqrt(distanceSquared);
      const repulsion = (gap - distance) * 32 * dt / distance;
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
    body.y = Math.max(body.radius + 10, Math.min(height - body.radius - 10, body.y));
  });
}
