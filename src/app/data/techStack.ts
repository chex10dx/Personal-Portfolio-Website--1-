export const skillCategories = [
  {
    id: 'backend', title: 'Backend Engineering', color: ['#7040c5', '#c4a2ff'],
    gradient: 'from-purple-700 to-pink-700 dark:from-purple-600 dark:to-pink-600',
    skills: [
      { id: 'csharp', label: 'C#', description: 'The language I use for .NET services, domain logic, and Blazor applications.' },
      { id: 'dotnet', label: '.NET', description: 'The runtime behind my backend services and enterprise applications.' },
      { id: 'aspnet', label: 'ASP.NET Core', description: 'Used to build web applications, HTTP APIs, and gRPC services.' },
      { id: 'abp', label: 'ABP Framework', description: 'Provides application and domain layers for the enterprise ERP and financial work.' },
      { id: 'rest', label: 'REST APIs', description: 'HTTP interfaces for web clients and enterprise integrations.' },
    ],
  },
  {
    id: 'architecture', title: 'Software Architecture', color: ['#2458b7', '#8abaff'],
    gradient: 'from-blue-700 to-cyan-700 dark:from-blue-600 dark:to-cyan-600',
    skills: [
      { id: 'microservices', label: 'Microservices', description: 'Experience contributing to financial workflows across independently deployable services.' },
      { id: 'monolith', label: 'Modular Monoliths', description: 'A shared deployment with business behavior organized into modules, as in the enterprise ERP.' },
      { id: 'ddd', label: 'Domain-Driven Design', description: 'Organizes business rules around domain concepts and responsibilities.' },
      { id: 'clean', label: 'Clean Architecture', description: 'Separates business behavior from infrastructure concerns and external dependencies.' },
      { id: 'distributed', label: 'Distributed Systems', description: 'Service interaction, asynchronous work, and consistency across application boundaries.' },
    ],
  },
  {
    id: 'data', title: 'Databases & Data Management', color: ['#176b60', '#79d7b9'],
    gradient: 'from-green-700 to-emerald-700 dark:from-green-600 dark:to-emerald-600',
    skills: [
      { id: 'sqlserver', label: 'SQL Server', description: 'Relational storage for transactional workflows, queries, and reporting.' },
      { id: 'efcore', label: 'Entity Framework Core', description: 'Maps .NET objects to relational data and supports queries and migrations.' },
      { id: 'redis', label: 'Redis', description: 'In-memory caching for frequently accessed application data.' },
    ],
  },
  {
    id: 'messaging', title: 'Messaging & Background Processing', color: ['#a04433', '#ffb291'],
    gradient: 'from-orange-700 to-red-700 dark:from-orange-600 dark:to-red-600',
    skills: [
      { id: 'rabbitmq', label: 'RabbitMQ', description: 'Message broker for coordinating asynchronous service workflows.' },
      { id: 'hangfire', label: 'Hangfire', description: 'Persistent scheduling and execution of background jobs in .NET.' },
      { id: 'async', label: 'Asynchronous Processing', description: 'Moves work out of synchronous request paths when it can complete independently.' },
      { id: 'grpc', label: 'gRPC', description: 'Typed service contracts and remote calls for service-to-service communication.' },
    ],
  },
  {
    id: 'frontend', title: 'Frontend Engineering', color: ['#843c9e', '#e4a8f7'],
    gradient: 'from-fuchsia-700 to-violet-700 dark:from-fuchsia-600 dark:to-violet-600',
    skills: [
      { id: 'blazor', label: 'Blazor WebAssembly', description: 'Used for browser interfaces in enterprise .NET applications.' },
      { id: 'javascript', label: 'JavaScript', description: 'Used in frontend development with Next.js and Vue.' },
      { id: 'typescript', label: 'TypeScript', description: 'Type-safe frontend development, including this portfolio.' },
      { id: 'react', label: 'React', description: 'Component-based UI development, including this portfolio.' },
      { id: 'nextjs', label: 'Next.js', description: 'Used to build the freelance clinic ERP.' },
      { id: 'vue', label: 'Vue', description: 'A component-based framework for reactive web interfaces.' },
    ],
  },
  {
    id: 'devops', title: 'DevOps & Infrastructure', color: ['#126b80', '#84dcea'],
    gradient: 'from-teal-700 to-sky-700 dark:from-teal-600 dark:to-sky-600',
    skills: [
      { id: 'git', label: 'Git', description: 'Tracks changes, supports review, and makes source history traceable.' },
      { id: 'github', label: 'GitHub', description: 'Hosts source for this portfolio and supports Git-based collaboration.' },
    ],
  },
  {
    id: 'quality', title: 'Quality & Testing', color: ['#7040c5', '#c4a2ff'],
    gradient: 'from-purple-700 to-pink-700 dark:from-purple-600 dark:to-pink-600',
    skills: [
      { id: 'unit', label: 'Unit Testing', description: 'Checks individual rules and application behavior in isolation.' },
      { id: 'integration', label: 'Integration Testing', description: 'Checks interactions across APIs, data operations, and application components.' },
      { id: 'reviews', label: 'Code Reviews', description: 'Reviews changes for behavior, reliability, and maintainability.' },
      { id: 'debugging', label: 'Debugging', description: 'Traces faults across APIs, background jobs, and database operations.' },
      { id: 'swagger', label: 'Swagger / OpenAPI', description: 'Describes HTTP API contracts and makes them easier to inspect.' },
      { id: 'postman', label: 'Postman', description: 'Explores API requests and supports API and integration testing.' },
    ],
  },
  {
    id: 'performance', title: 'Observability & Performance', color: ['#2458b7', '#8abaff'],
    gradient: 'from-blue-700 to-cyan-700 dark:from-blue-600 dark:to-cyan-600',
    skills: [
      { id: 'diagnostics', label: 'Application Diagnostics', description: 'Investigates backend problems using application behavior and available logs.' },
      { id: 'queries', label: 'Query Optimization', description: 'Investigates and improves database query behavior in .NET applications.' },
    ],
  },
  {
    id: 'security', title: 'Security', color: ['#176b60', '#79d7b9'],
    gradient: 'from-green-700 to-emerald-700 dark:from-green-600 dark:to-emerald-600',
    skills: [
      { id: 'auth', label: 'Authentication & Authorization', description: 'Establishes identity and enforces access at API and application boundaries.' },
      { id: 'jwt', label: 'JWT', description: 'Token-based authentication in existing .NET API work.' },
      { id: 'permissions', label: 'Permission Management', description: 'Applies access rules to enterprise workflows and operations.' },
    ],
  },
  {
    id: 'ai', title: 'AI-Assisted Engineering', color: ['#843c9e', '#e4a8f7'],
    gradient: 'from-fuchsia-700 to-violet-700 dark:from-fuchsia-600 dark:to-violet-600',
    skills: [
      { id: 'agents', label: 'AI Coding Agents', description: 'Help inspect code and surface implementation options for developer review.' },
      { id: 'stories', label: 'User Story Analysis', description: 'Turns requirements into clearer acceptance criteria and open questions.' },
      { id: 'planning', label: 'Implementation Planning', description: 'Breaks work into reviewable changes, dependencies, and tests.' },
    ],
  },
] as const;

export const developmentTopics = [
  'CQRS, SOLID, and design patterns',
  'Docker, cloud-native systems, and Azure / AWS infrastructure',
  'CI/CD automation, quality gates, and DevSecOps',
  'Advanced observability and monitoring',
  'SaaS multi-tenancy and zero-downtime deployment',
  'Infrastructure automation and cost optimization',
  'OAuth 2.0 and OpenIddict',
  'AI product integration',
];

type SkillNode = {
  id: string;
  label: string;
  category: string;
  type: 'category' | 'technology';
  description?: string;
};

export const skillNodes = skillCategories.flatMap<SkillNode>((category) => [
  { id: category.id, label: category.title, category: category.id, type: 'category' },
  ...category.skills.map((skill): SkillNode => ({ ...skill, category: category.id, type: 'technology' })),
]);

const nodeIndex = new Map(skillNodes.map((node, index) => [node.id, index]));
const relationships = [
  ['csharp', 'dotnet'], ['csharp', 'blazor'], ['dotnet', 'aspnet'], ['aspnet', 'abp'], ['aspnet', 'rest'],
  ['abp', 'ddd'], ['abp', 'efcore'], ['abp', 'monolith'], ['microservices', 'distributed'],
  ['microservices', 'rabbitmq'], ['microservices', 'grpc'], ['grpc', 'aspnet'], ['async', 'rabbitmq'],
  ['async', 'hangfire'], ['dotnet', 'hangfire'], ['efcore', 'sqlserver'], ['efcore', 'queries'],
  ['rest', 'swagger'], ['rest', 'postman'], ['rest', 'auth'], ['auth', 'jwt'], ['auth', 'permissions'],
  ['javascript', 'nextjs'], ['typescript', 'react'], ['react', 'nextjs'], ['javascript', 'vue'],
  ['git', 'github'], ['git', 'reviews'], ['unit', 'dotnet'], ['integration', 'rest'],
  ['debugging', 'diagnostics'], ['agents', 'stories'], ['stories', 'planning'], ['planning', 'reviews'],
];

const links = [
  ...skillCategories.flatMap(({ id, skills }) => skills.map((skill) => [id, skill.id])),
  ...relationships,
];

export const skillEdges = links.map(([from, to]) => {
  const source = nodeIndex.get(from)!;
  const target = nodeIndex.get(to)!;
  return { source, target, crossCategory: skillNodes[source].category !== skillNodes[target].category };
});

export const connections = skillNodes.map(() => new Set<number>());
for (const { source, target } of skillEdges) {
  connections[source].add(target);
  connections[target].add(source);
}
