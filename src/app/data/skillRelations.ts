import { skillCategories, skillsInGroup } from './techStack';
import type { CategoryId, SkillId } from './techStack';
import type { CaseStudy } from './caseStudies';

export const skillRelations = [
  ['csharp', 'dotnet'], ['csharp', 'blazor'], ['dotnet', 'aspnet'], ['aspnet', 'abp'], ['aspnet', 'rest'],
  ['abp', 'ddd'], ['abp', 'efcore'], ['abp', 'monolith'], ['microservices', 'distributed'],
  ['microservices', 'rabbitmq'], ['microservices', 'grpc'], ['grpc', 'aspnet'], ['async', 'rabbitmq'],
  ['async', 'hangfire'], ['dotnet', 'hangfire'], ['efcore', 'sqlserver'], ['efcore', 'queries'],
  ['rest', 'swagger'], ['rest', 'postman'], ['rest', 'auth'], ['auth', 'jwt'], ['authorization', 'permissions'],
  ['javascript', 'nextjs'], ['typescript', 'react'], ['react', 'nextjs'], ['javascript', 'vue'],
  ['git', 'github'], ['git', 'reviews'], ['unit', 'dotnet'], ['integration', 'rest'],
  ['debugging', 'diagnostics'], ['agents', 'stories'], ['stories', 'planning'],
  ['saga', 'eventual-consistency'], ['saga', 'distributed-transactions'], ['saga', 'outbox'],
  ['outbox', 'transactions'], ['outbox', 'inbox'], ['inbox', 'idempotent-consumers'],
  ['idempotency-key', 'idempotent-consumers'], ['idempotency-key', 'transactions'],
  ['retry', 'backoff'], ['retry', 'polly'], ['polly', 'circuit-breaker'], ['timeout', 'circuit-breaker'],
  ['optimistic-concurrency', 'rowversion'], ['optimistic-concurrency', 'concurrency-stamps'],
  ['pessimistic-concurrency', 'updlock'], ['sqlserver', 'updlock'], ['queries', 'execution-plans'],
  ['redis', 'redis-caching'], ['redis-caching', 'cache-aside'], ['latency-analysis', 'p95'],
  ['otel', 'tracing'], ['otel', 'metrics'], ['otel', 'instrumentation'], ['tracing', 'context-propagation'],
  ['grafana', 'prometheus'], ['load-testing', 'k6'], ['ci', 'automated-tests'], ['docker', 'testcontainers'],
  ['multi-tenancy', 'tenant-isolation'], ['oauth', 'openid-connect'], ['openid-connect', 'openiddict'],
  ['codex', 'agents'], ['claude', 'prompting'], ['cursor', 'ai-analysis'],
  ['agentic-workflows', 'human-validation'],
] as const satisfies readonly (readonly [SkillId, SkillId])[];

export const overviewRelations = [
  ['backend', 'architecture'], ['backend', 'security'], ['backend', 'frontend'],
  ['architecture', 'messaging'], ['messaging', 'data'], ['messaging', 'observability'],
  ['data', 'performance'], ['performance', 'observability'], ['quality', 'devops'],
  ['quality', 'ai'], ['devops', 'observability'],
] as const satisfies readonly (readonly [CategoryId, CategoryId])[];

export const caseStudySkills = [
  { id: 'financial-remittance', skills: ['microservices', 'rabbitmq', 'service-communication', 'data-consistency', 'sqlserver', 'redis', 'hangfire'] },
  { id: 'enterprise-erp', skills: ['abp', 'ddd', 'monolith', 'efcore', 'blazor'] },
] as const satisfies readonly { id: CaseStudy['id']; skills: readonly SkillId[] }[];

export const categoryById = Object.fromEntries(skillCategories.map((category) => [category.id, category])) as {
  [Id in CategoryId]: Extract<typeof skillCategories[number], { id: Id }>;
};

export const categoriesBySkill = new Map<SkillId, CategoryId[]>();
const skillNeighbors = new Map<SkillId, SkillId[]>();

for (const category of skillCategories) {
  for (const group of category.groups) {
    for (const skill of skillsInGroup(group)) {
      const categories = categoriesBySkill.get(skill) ?? [];
      // Give the skill's own category priority over its cross-references.
      if ((group.skills as readonly SkillId[]).includes(skill)) categories.unshift(category.id);
      else categories.push(category.id);
      categoriesBySkill.set(skill, categories);
    }
  }
}

for (const [left, right] of skillRelations) {
  skillNeighbors.set(left, [...(skillNeighbors.get(left) ?? []), right]);
  skillNeighbors.set(right, [...(skillNeighbors.get(right) ?? []), left]);
}

export function relatedSkills(skill: SkillId): readonly SkillId[] {
  return skillNeighbors.get(skill) ?? [];
}
