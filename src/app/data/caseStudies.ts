export type CaseStudy = {
  id: string;
  title: string;
  type: string;
  context: string;
  challenge: string;
  approach: string;
  contributions: string[];
  outcome: string;
  technologies: string[];
};

export const remittance: CaseStudy = {
  id: 'financial-remittance',
  title: 'Financial Remittance & Payment Platform',
  type: 'Enterprise financial platform · Distributed microservices',
  context: 'I contributed to a platform with more than 30 communicating services that supports remittances, payments, liquidity management, currency exchange, and financial reporting.',
  challenge: 'Financial workflows cross service boundaries. A backend change can affect downstream data, permissions, or a background job even when the API response looks correct.',
  approach: 'Blazor WebAssembly interfaces call .NET APIs and application services. Domain logic handles business rules, EF Core and SQL Server support persistence, Redis supports caching, and RabbitMQ and Hangfire cover asynchronous messaging and background jobs.',
  contributions: [
    'Developed APIs and application services for financial workflows, including validation and permission checks.',
    'Traced service interactions and investigated consistency issues across API calls, messages, background work, and database operations.',
    'Wrote and optimized database queries, debugged backend issues, reviewed changes, and worked with stakeholders and other developers.',
  ],
  outcome: 'Contributed backend and integration changes to a working financial platform while keeping the boundaries between application, domain, messaging, and data concerns clear.',
  technologies: ['C#', 'ASP.NET Core', 'ABP Framework', 'Microservices', 'RabbitMQ', 'Redis', 'Hangfire', 'SQL Server', 'Entity Framework Core', 'Blazor WebAssembly'],
};

export const additionalCaseStudies: CaseStudy[] = [
  {
    id: 'enterprise-erp',
    title: 'Enterprise ERP Platform',
    type: 'Enterprise resource planning · Modular monolith',
    context: 'I contributed to an ABP-based ERP with a Blazor WebAssembly interface and shared business data.',
    challenge: 'ERP modules need to share data and business rules without making each module depend on the implementation details of another.',
    approach: 'Worked within a modular monolith, using domain and application layers to separate rules, use cases, and database access within one deployment.',
    contributions: ['Implemented business modules, application APIs, and domain workflows.', 'Built database operations with Entity Framework Core and SQL Server while following the platform’s module conventions.'],
    outcome: 'Delivered business functionality within the existing ERP architecture and its established module boundaries.',
    technologies: ['ASP.NET Core', 'ABP Framework', 'Blazor WebAssembly', 'SQL Server', 'Entity Framework Core', 'Domain-Driven Design'],
  },
  {
    id: 'clinic-erp',
    title: 'Clinic ERP System',
    type: 'Freelance full-stack delivery',
    context: 'Built a custom ERP for clinic workflows and day-to-day business operations.',
    challenge: 'Translate clinic-specific requirements into workflows that fit how the client operates.',
    approach: 'Used Next.js and JavaScript for the web application and REST APIs for application interactions.',
    contributions: ['Worked from client requirements and built the application around clinic workflows.'],
    outcome: 'Delivered a custom clinic ERP as a freelance project.',
    technologies: ['Next.js', 'JavaScript', 'REST APIs'],
  },
  {
    id: 'commerce-payments',
    title: 'E-commerce Platform with Payments',
    type: 'Back-end development · Payment integration',
    context: 'Developed an ASP.NET Core e-commerce platform with an integrated payment flow.',
    challenge: 'Bring payment processing into the commerce workflow while enforcing access rules on authenticated operations.',
    approach: 'Used a .NET back end with JWT authentication and SQL Server for relational data.',
    contributions: ['Implemented back-end features and integrated payments into the application workflow.'],
    outcome: 'Delivered an e-commerce application with payment integration.',
    technologies: ['ASP.NET Core', 'C#', 'SQL Server', 'JWT'],
  },
];
