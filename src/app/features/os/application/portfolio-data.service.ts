import { Injectable } from '@angular/core';
import { ISkill, SkillCategory } from '../domain/models/skill.model';
import { IProject } from '../domain/models/project.model';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  readonly skills: ISkill[] = [
    // Frontend
    { name: 'Angular',         level: 95, category: 'Frontend' },
    { name: 'TypeScript',      level: 92, category: 'Frontend' },
    { name: 'React',           level: 80, category: 'Frontend' },
    { name: 'HTML / CSS',      level: 90, category: 'Frontend' },
    { name: 'Ionic',           level: 75, category: 'Frontend' },
    // Backend
    { name: 'Node.js',         level: 85, category: 'Backend' },
    { name: 'REST APIs',       level: 92, category: 'Backend' },
    { name: 'Java / Spring',   level: 78, category: 'Backend' },
    { name: 'Laravel / PHP',   level: 75, category: 'Backend' },
    { name: 'WebSockets',      level: 80, category: 'Backend' },
    // Databases
    { name: 'MySQL / SQL Srv', level: 88, category: 'Databases' },
    { name: 'PostgreSQL',      level: 75, category: 'Databases' },
    { name: 'MongoDB',         level: 70, category: 'Databases' },
    // DevOps & Cloud
    { name: 'Git / GitHub',    level: 92, category: 'DevOps & Cloud' },
    { name: 'Docker',          level: 72, category: 'DevOps & Cloud' },
    { name: 'AWS',             level: 65, category: 'DevOps & Cloud' },
    { name: 'CI/CD',           level: 75, category: 'DevOps & Cloud' },
    // Architecture
    { name: 'SOLID',           level: 90, category: 'Architecture' },
    { name: 'Clean / Hex Arch',level: 88, category: 'Architecture' },
    { name: 'Microservices',   level: 72, category: 'Architecture' },
    { name: 'SonarQube / OWASP',level: 70, category: 'Architecture' },
  ];

  readonly skillsByCategory: Map<SkillCategory, ISkill[]> = this.skills.reduce(
    (map, skill) => {
      const list = map.get(skill.category) ?? [];
      map.set(skill.category, [...list, skill]);
      return map;
    },
    new Map<SkillCategory, ISkill[]>()
  );

  readonly projects: IProject[] = [
    {
      id: 'emp-platform',
      name: 'Employee Management Platform',
      description: 'Plataforma empresarial completa de gestión de empleados con flujos digitales end-to-end.',
      period: '2023 – 2026',
      tech: ['Angular', 'Node.js', 'Java', 'MySQL', 'WebSockets'],
      highlights: [
        'Generación automática de contratos y documentos',
        'Firma digital integrada y flujo de onboarding',
        'Módulo de control de viáticos con validación por IA',
        'Sincronización en tiempo real vía WebSockets',
      ],
    },
    {
      id: 'ai-expenses',
      name: 'AI Expense Validator',
      description: 'Módulo inteligente de control de viáticos con validación automática mediante IA.',
      period: '2024 – 2026',
      tech: ['Angular', 'Node.js', 'IA', 'REST API'],
      highlights: [
        'Validación de gastos mediante IA',
        'Reducción significativa de tiempos operativos',
        'Integración con sistemas contables internos',
      ],
    },
    {
      id: 'realtime-system',
      name: 'Real-Time Field Sync System',
      description: 'Sistema de sincronización de datos en campo para operaciones críticas en tiempo real.',
      period: '2023 – 2025',
      tech: ['WebSockets', 'Node.js', 'Angular', 'RabbitMQ'],
      highlights: [
        'Arquitectura event-driven con RabbitMQ',
        'Latencia sub-100ms en sincronización',
        'Panel de monitoreo en tiempo real',
      ],
    },
    {
      id: 'benefits-system',
      name: 'Corporate Benefits System',
      description: 'Plataforma interna de gestión de beneficios corporativos para empleados.',
      period: '2021 – 2022',
      tech: ['Angular', 'Laravel', 'MySQL', 'PHP'],
      highlights: [
        'Catálogo de beneficios con flujo de aprobación',
        'Integración con Outlook (.ics) para eventos',
        'Dashboard administrativo con Power BI',
      ],
    },
    {
      id: 'asset-mgmt',
      name: 'Asset Management Platform',
      description: 'Sistema de gestión y trazabilidad de activos empresariales.',
      period: '2021 – 2022',
      tech: ['PHP', 'JavaScript', 'SQL Server', 'Power Apps'],
      highlights: [
        'Inventario con trazabilidad completa',
        'Automatización con Power Automate',
        'Reportes automatizados con Python scraping',
      ],
    },
    {
      id: 'automation-suite',
      name: 'Process Automation Suite',
      description: 'Suite de automatización de procesos internos integrando Low Code, Python y Power Platform.',
      period: '2021 – 2022',
      tech: ['Python', 'Power Apps', 'Power Automate', 'SharePoint'],
      highlights: [
        'Web scraping para reportes automatizados',
        'Flujos de aprobación en SharePoint',
        'Reducción de tareas manuales repetitivas',
      ],
    },
  ];
}
