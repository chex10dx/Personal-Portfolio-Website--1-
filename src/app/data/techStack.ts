export const skillCategories = [
  {
    id: 'languages',
    title: 'Languages',
    color: ['#7040c5', '#c4a2ff'],
    gradient: 'from-purple-700 to-pink-700 dark:from-purple-600 dark:to-pink-600',
    skills: [
      { id: 'csharp', label: 'C#', description: 'The core language for .NET services, business logic, and Blazor applications.' },
      { id: 'javascript', label: 'JavaScript', description: 'Browser interactivity and frontend development with Next.js and Vue.' },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks',
    color: ['#2458b7', '#8abaff'],
    gradient: 'from-blue-700 to-cyan-700 dark:from-blue-600 dark:to-cyan-600',
    skills: [
      { id: 'dotnet', label: '.NET Core', description: 'A cross-platform runtime for services and full-stack .NET applications.' },
      { id: 'aspnet', label: 'ASP.NET', description: 'Builds web applications and exposes HTTP and gRPC services on .NET.' },
      { id: 'nextjs', label: 'Next.js', description: 'A React framework for full-stack web development with routing and rendering.' },
      { id: 'vue', label: 'Vue', description: 'A component-based framework for reactive web interfaces.' },
      { id: 'blazor', label: 'Blazor', description: 'Builds interactive web interfaces using C# and .NET.' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    color: ['#176b60', '#79d7b9'],
    gradient: 'from-green-700 to-emerald-700 dark:from-green-600 dark:to-emerald-600',
    skills: [
      { id: 'sqlserver', label: 'SQL Server', description: 'Relational storage for transactional applications, reporting, and queries.' },
      { id: 'redis', label: 'Redis', description: 'In-memory storage for caching and fast access to shared application state.' },
      { id: 'efcore', label: 'Entity Framework Core', description: 'Object-relational mapping, queries, and schema migrations in .NET.' },
    ],
  },
  {
    id: 'architecture',
    title: 'APIs and Architecture',
    color: ['#a04433', '#ffb291'],
    gradient: 'from-orange-700 to-red-700 dark:from-orange-600 dark:to-red-600',
    skills: [
      { id: 'rest', label: 'REST APIs', description: 'HTTP interfaces that expose resources for web clients and system integrations.' },
      { id: 'grpc', label: 'gRPC', description: 'Contract-first remote calls with typed messages for service communication.' },
      { id: 'microservices', label: 'Microservices', description: 'Independently deployable services that communicate through APIs or messages.' },
      { id: 'monolith', label: 'Monolith', description: 'An application architecture that packages related modules into one deployable unit.' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud and Tools',
    color: ['#843c9e', '#e4a8f7'],
    gradient: 'from-fuchsia-700 to-violet-700 dark:from-fuchsia-600 dark:to-violet-600',
    skills: [
      { id: 'azure', label: 'Azure', description: 'Microsoft cloud services for application hosting and managed infrastructure.' },
      { id: 'aws', label: 'AWS', description: 'Cloud infrastructure and managed services for application workloads.' },
      { id: 'rabbitmq', label: 'RabbitMQ', description: 'A message broker for asynchronous workflows and decoupled services.' },
      { id: 'hangfire', label: 'Hangfire', description: 'Schedules and processes persistent background jobs in .NET applications.' },
      { id: 'git', label: 'Git', description: 'Distributed version control for reviewing and tracking changes to source code.' },
      { id: 'swagger', label: 'Swagger', description: 'Documents and explores HTTP API contracts with OpenAPI tooling.' },
      { id: 'postman', label: 'Postman', description: 'Sends API requests and organizes collections for testing integrations.' },
    ],
  },
  {
    id: 'testing',
    title: 'Testing',
    color: ['#126b80', '#84dcea'],
    gradient: 'from-teal-700 to-sky-700 dark:from-teal-600 dark:to-sky-600',
    skills: [
      { id: 'unit', label: 'Unit Testing', description: 'Verifies individual pieces of application logic in isolation.' },
      { id: 'integration', label: 'Integration Testing', description: 'Verifies that components, APIs, and data stores behave correctly together.' },
    ],
  },
] as const;

export type SkillNode = {
  id: string;
  label: string;
  category: string;
  type: 'category' | 'technology';
  description?: string;
};

export type SkillEdge = {
  source: number;
  target: number;
  crossCategory: boolean;
};

export const skillNodes = skillCategories.flatMap<SkillNode>((category) => [
  { id: category.id, label: category.title, category: category.id, type: 'category' },
  ...category.skills.map((skill): SkillNode => ({ ...skill, category: category.id, type: 'technology' })),
]);

const indexById = new Map(skillNodes.map((node, index) => [node.id, index]));
const relationships = [
  ['csharp', 'dotnet'], ['csharp', 'blazor'], ['javascript', 'nextjs'], ['javascript', 'vue'],
  ['dotnet', 'aspnet'], ['dotnet', 'efcore'], ['dotnet', 'hangfire'], ['dotnet', 'unit'],
  ['aspnet', 'rest'], ['aspnet', 'grpc'], ['sqlserver', 'efcore'], ['grpc', 'microservices'],
  ['microservices', 'rabbitmq'], ['rest', 'swagger'], ['rest', 'postman'], ['rest', 'integration'],
];

export const skillEdges: SkillEdge[] = [
  ...skillCategories.flatMap((category) =>
    category.skills.map((skill) => ({ source: indexById.get(category.id)!, target: indexById.get(skill.id)!, crossCategory: false })),
  ),
  ...relationships.map(([source, target]) => ({
    source: indexById.get(source)!,
    target: indexById.get(target)!,
    crossCategory: skillNodes[indexById.get(source)!].category !== skillNodes[indexById.get(target)!].category,
  })),
];

export const connections = skillNodes.map(() => new Set<number>());
for (const { source, target } of skillEdges) {
  connections[source].add(target);
  connections[target].add(source);
}
