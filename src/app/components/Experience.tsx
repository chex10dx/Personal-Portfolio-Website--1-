import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Briefcase, Award, TrendingUp } from 'lucide-react';

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const experiences = [
    {
      role: 'Software Developer (.NET)',
      company: 'Mis Company.',
      period: 'December 2023 - Present',
      description:
        'Leading development efforts on key projects using .NET technologies and coordinating with stakeholders to gather requirements and deliver solutions.',
      achievements: [
        'Improved application performance by 30% through optimization of database queries.',
        'Successfully collaborated with a team of 5 developers to complete a major project, delivering the final product 1 week ahead of the 6-month deadline and under budget by 15%.',
        'Implemented automated testing procedures that reduced bug reports by 40%, increasing overall software reliability and customer satisfaction.',
        'Major Projects: Remittance system (Microservices, Blazor WebAssembly, RabbitMQ, Hangfire) and ERP system (Monolith, Blazor WebAssembly).',
        'Mentoring junior developers and contributing to team knowledge sharing.',
      ],
      icon: Briefcase,
    },
    {
      role: 'Freelance Next.js Developer',
      company: 'Self-Employed',
      period: 'June 2021 - Dec 2022',
      description: 'Delivered custom web solutions for client-specific business needs.',
      achievements: ['Built ERP system for a clinic', 'Delivered custom software aligned with client requirements'],
      icon: Award,
    },
    {
      role: 'ASP.NET Core Developer',
      company: 'LLC Company.',
      period: 'April 2020 - June 2021',
      description: '.NET backend-focused role delivering secure web platforms and scalable app architecture.',
      achievements: [
        'Developed an e-commerce platform with payment integration',
        'Applied .NET best practices across application development',
      ],
      icon: Briefcase,
    },
    {
      role: 'Junior .NET Developer',
      company: 'SYC Solution',
      period: 'May 2019 - April 2020',
      description: 'Contributed to API development and backend foundations in early-career .NET projects.',
      achievements: [
        'Built REST APIs with Swagger and Postman',
        'Implemented JWT authentication and authorization',
        'Worked with SQL Server and Entity Framework Core',
      ],
      icon: TrendingUp,
    },
  ];

  const stats = [
    { number: '4', label: 'Key Roles' },
    { number: '10', label: 'Engineers Led' },
    { number: '40%', label: 'Performance Gain' },
    { number: '40%', label: 'Bug Reduction' },
  ];

  return (
    <section id="experience" className="relative py-24 md:py-32 bg-gradient-to-b from-section-alt to-section overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block text-brand-purple mb-4 text-sm md:text-base tracking-wider uppercase"
            >
              Experience
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
            >
              Professional Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Building .NET systems, APIs, and scalable architectures with measurable impact
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="text-center p-6 bg-gradient-to-br from-card/80 to-raised/50 backdrop-blur-sm border border-surface-line/50 rounded-2xl"
              >
                <div className="text-4xl md:text-5xl bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={`${exp.role}-${index}`}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.12, duration: 0.6 }}
                className="relative"
              >
                <div className="flex flex-col md:flex-row gap-6 p-8 bg-gradient-to-br from-card/80 to-raised/50 backdrop-blur-sm border border-surface-line/50 rounded-2xl hover:border-purple-500/50 transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                      <exp.icon className="w-8 h-8 text-brand-purple" />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl text-foreground mb-2">{exp.role}</h3>
                        <p className="text-xl text-brand-purple">{exp.company}</p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className="inline-block px-4 py-2 bg-raised/80 text-subtle-foreground rounded-full text-sm border border-surface-line/50">
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-subtle-foreground mb-4 leading-relaxed">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-brand-purple mt-1">-</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
