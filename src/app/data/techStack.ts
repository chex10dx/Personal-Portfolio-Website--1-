export type Proficiency = 'professional' | 'knowledge' | 'exploring';

type SkillGroup = {
  id: string;
  skills: readonly string[];
};

type Category = {
  id: string;
  color: readonly [string, string];
  highlights: readonly string[];
  groups: readonly SkillGroup[];
};

export const skillCategories = [
  {
    id: 'backend', color: ['#7040c5', '#c4a2ff'], highlights: ['dotnet', 'csharp', 'aspnet', 'abp'],
    groups: [
      { id: 'dotnetPlatform', skills: ['dotnet', 'csharp', 'aspnet', 'abp', 'linq', 'di', 'middleware', 'rest', 'grpc', 'aspire'] },
      { id: 'backgroundWork', skills: ['hangfire', 'background-service', 'hosted-service', 'async-programming', 'tap', 'cancellation', 'thread-safety'] },
      { id: 'runtime', skills: ['memory-management', 'garbage-collection', 'disposal'] },
    ],
  },
  {
    id: 'architecture', color: ['#2458b7', '#8abaff'], highlights: ['microservices', 'ddd', 'monolith', 'clean'],
    groups: [
      { id: 'architectureStyles', skills: ['microservices', 'ddd', 'monolith', 'clean', 'layered', 'cqrs', 'event-driven'] },
      { id: 'designPractice', skills: ['design-patterns', 'solid', 'separation', 'adr', 'documentation', 'api-design', 'system-design', 'scalability', 'maintainability'] },
    ],
  },
  {
    id: 'messaging', color: ['#6441a5', '#c4a2ff'], highlights: ['rabbitmq', 'saga', 'outbox', 'circuit-breaker'],
    groups: [
      { id: 'communication', skills: ['rabbitmq', 'distributed', 'service-communication', 'async', 'distributed-events', 'dead-letter', 'message-ordering'] },
      { id: 'crossServiceConsistency', skills: ['saga', 'outbox', 'eventual-consistency', 'inbox', 'idempotent-consumers', 'idempotency-key', 'distributed-transactions'] },
      { id: 'failureHandling', skills: ['circuit-breaker', 'retry', 'timeout', 'fallback', 'backoff', 'polly', 'rate-limiting', 'health-checks', 'fault-tolerance', 'resilience'] },
    ],
  },
  {
    id: 'data', color: ['#176b60', '#79d7b9'], highlights: ['sqlserver', 'postgresql', 'transactions', 'optimistic-concurrency'],
    groups: [
      { id: 'storage', skills: ['sqlserver', 'postgresql', 'oracle', 'mongodb', 'redis', 'sql', 'nosql', 'efcore'] },
      { id: 'databaseEngineering', skills: ['transactions', 'stored-procedures', 'indexing', 'queries', 'execution-plans', 'isolation', 'deadlocks', 'row-versioning', 'migrations', 'data-modeling'] },
      { id: 'concurrency', skills: ['optimistic-concurrency', 'concurrency-stamps', 'rowversion', 'pessimistic-concurrency', 'transaction-locking', 'updlock', 'data-consistency', 'race-conditions', 'concurrent-updates'] },
    ],
  },
  {
    id: 'performance', color: ['#2458b7', '#8abaff'], highlights: ['diagnostics', 'redis-caching', 'profiling', 'cache-aside'],
    groups: [
      { id: 'profiling', skills: ['diagnostics', 'profiling', 'memory-leaks', 'gc-analysis', 'cpu-memory-profiling', 'bottlenecks', 'benchmarking', 'latency-analysis', 'throughput-optimization', 'connection-pooling'] },
      { id: 'caching', skills: ['redis-caching', 'cache-aside', 'distributed-caching', 'cache-invalidation', 'cache-stampede'] },
    ],
  },
  {
    id: 'observability', color: ['#5046b3', '#a9b1ff'], highlights: ['otel', 'tracing', 'metrics', 'grafana'],
    groups: [
      { id: 'telemetry', skills: ['otel', 'tracing', 'context-propagation', 'trace-id', 'span-id', 'correlation-id', 'instrumentation'] },
      { id: 'metrics', skills: ['metrics', 'request-rate', 'error-rate', 'throughput', 'cpu-utilization', 'memory-utilization', 'p50', 'p90', 'p95', 'p99', 'histograms'] },
      { id: 'logging', skills: ['structured-logging', 'centralized-logging', 'log-correlation', 'error-tracking'] },
      { id: 'monitoring', skills: ['grafana', 'prometheus', 'elasticsearch', 'kibana'] },
      { id: 'reliabilityIndicators', skills: ['service-health', 'alerting', 'sli', 'slo', 'availability'] },
    ],
  },
  {
    id: 'quality', color: ['#7040c5', '#c4a2ff'], highlights: ['reviews', 'unit', 'integration', 'contract-testing'],
    groups: [
      { id: 'testStrategies', skills: ['unit', 'integration', 'contract-testing', 'api-testing', 'load-testing', 'stress-testing', 'performance-testing', 'regression', 'mocking'] },
      { id: 'testTools', skills: ['xunit', 'testcontainers', 'k6', 'postman', 'swagger'] },
      { id: 'qualityPractices', skills: ['reviews', 'debugging', 'sonarqube', 'static-analysis', 'quality-gates', 'technical-debt'] },
    ],
  },
  {
    id: 'devops', color: ['#126b80', '#84dcea'], highlights: ['docker', 'ci', 'azure', 'multi-tenancy'],
    groups: [
      { id: 'containers', skills: ['docker', 'compose', 'containerization', 'infrastructure', 'environment-config', 'git', 'github'] },
      { id: 'delivery', skills: ['ci', 'cd', 'github-actions', 'azure-devops', 'automated-builds', 'automated-tests', 'pipelines', 'deployment-automation', 'infrastructure-automation', 'devsecops'] },
      { id: 'deployment', skills: ['blue-green', 'canary', 'rolling', 'rollback', 'zero-downtime'] },
      { id: 'cloud', skills: ['azure', 'aws', 'cloud-native', 'cloud-cost', 'infra-monitoring'] },
      { id: 'saas', skills: ['multi-tenancy', 'saas-architecture', 'tenant-isolation', 'tenant-resolution', 'tenant-databases', 'feature-management', 'config-management'] },
    ],
  },
  {
    id: 'security', color: ['#176b60', '#79d7b9'], highlights: ['auth', 'authorization', 'jwt', 'openid-connect'],
    groups: [
      { id: 'identity', skills: ['auth', 'authorization', 'jwt', 'openid-connect', 'openiddict', 'oauth', 'rbac', 'permissions', 'token-validation'] },
      { id: 'secureDevelopment', skills: ['api-security', 'owasp', 'secure-coding', 'secrets', 'input-validation', 'tls', 'least-privilege', 'security-testing'] },
    ],
  },
  {
    id: 'ai', color: ['#843c9e', '#e4a8f7'], highlights: ['agents', 'codex', 'claude', 'cursor'],
    groups: [
      { id: 'aiTools', skills: ['agents', 'codex', 'claude', 'cursor', 'copilot', 'gemini', 'vertex-ai', 'cloud-agents'] },
      { id: 'aiWorkflows', skills: ['stories', 'planning', 'requirements', 'ai-analysis', 'ai-debugging', 'ai-review', 'test-generation', 'documentation-generation', 'agentic-workflows', 'prompting', 'human-validation', 'ai-integration'] },
    ],
  },
  {
    id: 'frontend', color: ['#843c9e', '#e4a8f7'], highlights: ['blazor', 'react', 'nextjs', 'typescript'],
    groups: [
      { id: 'web', skills: ['blazor', 'react', 'nextjs', 'typescript', 'javascript', 'html', 'css', 'tailwind', 'vue'] },
    ],
  },
] as const satisfies readonly Category[];

export type CategoryId = typeof skillCategories[number]['id'];
type CatalogGroup = typeof skillCategories[number]['groups'][number];
export type SkillId = CatalogGroup['skills'][number];

// Work history and portfolio case studies support this set. General concepts and
// tools default to knowledge unless they are explicitly tracked as exploration.
const professional = new Set<SkillId>([
  'csharp', 'dotnet', 'aspnet', 'abp', 'rest', 'hangfire', 'microservices', 'ddd', 'monolith',
  'rabbitmq', 'distributed', 'service-communication', 'async', 'sqlserver', 'redis', 'efcore',
  'queries', 'data-consistency', 'diagnostics', 'redis-caching', 'bottlenecks', 'reviews', 'debugging',
  'auth', 'authorization', 'jwt', 'permissions', 'blazor', 'nextjs', 'javascript',
]);

const exploring = new Set<SkillId>([
  'aspire', 'cqrs', 'saga', 'outbox', 'inbox', 'distributed-transactions', 'otel', 'instrumentation',
  'prometheus', 'grafana', 'elasticsearch', 'kibana', 'sli', 'slo', 'k6', 'testcontainers',
  'sonarqube', 'quality-gates', 'docker', 'compose', 'github-actions', 'azure-devops', 'pipelines',
  'deployment-automation', 'infrastructure-automation', 'devsecops', 'blue-green', 'canary',
  'rolling', 'zero-downtime', 'azure', 'aws', 'cloud-native', 'cloud-cost', 'infra-monitoring',
  'multi-tenancy', 'saas-architecture', 'tenant-isolation', 'tenant-resolution', 'tenant-databases',
  'openiddict', 'oauth', 'openid-connect', 'cloud-agents', 'vertex-ai', 'agentic-workflows', 'ai-integration',
]);

export function proficiencyOf(skill: SkillId): Proficiency {
  if (professional.has(skill)) return 'professional';
  return exploring.has(skill) ? 'exploring' : 'knowledge';
}

export const learningTopics = [
  'multi-tenancy', 'pipelines', 'cloud-native', 'zero-downtime', 'instrumentation',
  'distributed-transactions', 'devsecops', 'ai-integration', 'k6',
] as const satisfies readonly SkillId[];

export const designPatterns = {
  creational: ['singleton', 'factory', 'builder', 'prototype'],
  structural: ['adapter', 'decorator', 'proxy'],
  behavioral: ['observer', 'strategy', 'command'],
} as const;

const sharedSkills: Partial<Record<CatalogGroup['id'], readonly SkillId[]>> = {
  dotnetPlatform: ['efcore', 'blazor'],
  runtime: ['memory-leaks'],
  communication: ['grpc', 'microservices', 'hangfire'],
  concurrency: ['idempotency-key'],
  profiling: ['queries'],
  logging: ['diagnostics'],
  reliabilityIndicators: ['health-checks'],
};

export function skillsInGroup(group: CatalogGroup): readonly SkillId[] {
  return [...group.skills, ...(sharedSkills[group.id] ?? [])];
}
