import { overviewRelations, skillRelations } from '../../data/skillRelations';
import { skillCategories, skillsInGroup, type CategoryId, type SkillId } from '../../data/techStack';

export type SkillNode =
  | { id: CategoryId; category: CategoryId; type: 'category' }
  | { id: SkillId; category: CategoryId; type: 'technology' };

export type GraphEdge = { source: number; target: number; crossCategory: boolean };
export type GraphData = { nodes: SkillNode[]; edges: GraphEdge[]; overview: boolean };
export type Selection = { category: CategoryId; skill?: SkillId; page: number };

export const skillsPerPage = 8;

const firstPage = {
  backend: ['efcore', 'rest', 'grpc', 'blazor'],
  architecture: ['cqrs', 'event-driven', 'design-patterns', 'adr'],
  messaging: ['retry', 'polly', 'eventual-consistency', 'idempotency-key'],
  data: ['mongodb', 'efcore', 'updlock', 'pessimistic-concurrency'],
  performance: ['queries', 'memory-leaks', 'latency-analysis', 'cache-invalidation'],
  observability: ['prometheus', 'context-propagation', 'structured-logging', 'histograms'],
  quality: ['load-testing', 'stress-testing', 'testcontainers', 'k6'],
  devops: ['github-actions', 'zero-downtime', 'aws', 'cloud-native'],
  security: ['permissions', 'oauth', 'openiddict', 'owasp'],
  ai: ['copilot', 'gemini', 'vertex-ai', 'human-validation'],
  frontend: ['javascript', 'html', 'css', 'tailwind'],
} as const satisfies Record<CategoryId, readonly SkillId[]>;

const categorySkills = new Map<CategoryId, readonly SkillId[]>(skillCategories.map(({ id, groups, highlights }) => [
  id, [...new Set<SkillId>([...highlights, ...firstPage[id], ...groups.flatMap(skillsInGroup)])],
]));

export function networkSkills(category: CategoryId): readonly SkillId[] {
  return categorySkills.get(category)!;
}

export function selectionForSkill(category: CategoryId, skill: SkillId): Selection {
  const index = networkSkills(category).indexOf(skill);
  return { category, skill, page: Math.floor(Math.max(0, index) / skillsPerPage) };
}

function hub(id: CategoryId): SkillNode {
  return { id, category: id, type: 'category' };
}

function technology(id: SkillId, category: CategoryId): SkillNode {
  return { id, category, type: 'technology' };
}

function createGraph(nodes: SkillNode[], pairs: readonly (readonly [SkillNode['id'], SkillNode['id']])[], overview: boolean): GraphData {
  const indexes = new Map(nodes.map(({ id }, index) => [id, index]));
  const edges: GraphEdge[] = [];

  for (const [left, right] of pairs) {
    const source = indexes.get(left);
    const target = indexes.get(right);
    if (source === undefined || target === undefined) continue;
    edges.push({ source, target, crossCategory: nodes[source].category !== nodes[target].category });
  }

  return { nodes, edges, overview };
}

const overviewNodes = skillCategories.flatMap(({ id, highlights }) => [hub(id), technology(highlights[0], id)]);
const overviewGraph = createGraph(overviewNodes, [
  ...skillCategories.map(({ id, highlights }) => [id, highlights[0]] as const),
  ...overviewRelations,
  ['backend', 'blazor'],
], true);

export function graphFor(category?: CategoryId, page = 0): GraphData {
  if (!category) return overviewGraph;
  const visible = networkSkills(category).slice(page * skillsPerPage, (page + 1) * skillsPerPage);
  return createGraph([hub(category), ...visible.map((skill) => technology(skill, category))], [
    ...visible.map((skill) => [category, skill] as const),
    ...skillRelations,
  ], false);
}
