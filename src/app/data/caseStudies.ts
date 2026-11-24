export const caseStudies = [
  { id: 'financial-remittance', featured: true, technologies: ['C#', 'ASP.NET Core', 'ABP Framework', 'Microservices', 'RabbitMQ', 'Redis', 'Hangfire', 'SQL Server', 'Entity Framework Core', 'Blazor WebAssembly'] },
  { id: 'enterprise-erp', featured: false, technologies: ['ASP.NET Core', 'ABP Framework', 'Blazor WebAssembly', 'SQL Server', 'Entity Framework Core', 'Domain-Driven Design'] },
  { id: 'clinic-erp', featured: false, technologies: ['Next.js', 'JavaScript', 'REST APIs'] },
  { id: 'commerce-payments', featured: false, technologies: ['ASP.NET Core', 'C#', 'SQL Server', 'JWT'] },
] as const;

export type CaseStudy = typeof caseStudies[number];
