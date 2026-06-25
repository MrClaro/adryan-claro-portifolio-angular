export interface Translation {
  pt: string;
  en: string;
}

export interface ArrayTranslation {
  pt: string[];
  en: string[];
}

export interface PortfolioConfig {
  profile: {
    name: string;
    title: Translation;
    subtitles: ArrayTranslation;
    location: string;
    email: string;
    phone: string;
    bio: Translation;
    skills: string[];
  };
  socialLinks: Array<{
    name: string;
    url: string;
    icon: string;
    color: string;
  }>;
  contactInfo: Array<{
    icon: string;
    title: Translation;
    value: string;
    link?: string;
    type: 'email' | 'phone' | 'location' | 'social';
  }>;
  expertise: Array<{
    icon: string;
    title: Translation;
    description: Translation;
    skills: string[];
    highlighted?: boolean;
  }>;
  experiences: Array<{
    company: string;
    period: Translation;
    title: Translation;
    description: Translation;
    highlights?: Translation[];
    technologies: string[];
    current?: boolean;
  }>;
  education: Array<{
    institution: string;
    period: string;
    degree: Translation;
    description?: Translation;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
    link?: string;
  }>;
  courses: Array<{
    name: Translation;
    platform: string;
    duration: string;
    completed: boolean;
  }>;
  featuredProjects: Array<{
    title: Translation;
    content: Translation;
    resourcesTitle: Translation;
    resources: Array<{
      label: Translation;
      url: string;
    }>;
    technologies: string[];
    repoName: string;
    username: string;
    description: Translation;
    language: string;
    date: string;
    githubUrl: string;
    imageUrl: string;
  }>;
  blogArticles: Array<{
    title: Translation;
    description: Translation;
    date: string;
    readTime: Translation;
    tags: string[];
    url: string;
    coverImage?: string;
  }>;
}

export const PORTFOLIO_CONFIG: PortfolioConfig = {
  profile: {
    name: 'Adryan Claro',
    title: {
      pt: 'Desenvolvedor Full-Stack & Entusiasta Linux',
      en: 'Full-Stack Developer & Linux Enthusiast',
    },
    subtitles: {
      pt: ['Desenvolvedor Full-Stack', 'Entusiasta Linux', 'Designer'],
      en: ['Full-Stack Developer', 'Linux Enthusiast', 'Designer'],
    },
    location: 'Ourinhos, São Paulo, Brasil',
    email: 'adryan.contatoprofissional@gmail.com',
    phone: '+55 (14) 99872-4427',
    bio: {
      pt: 'Desenvolvedor apaixonado por tecnologia com mais de 1 ano de experiência focado em desenvolvimento web. Sou especialista em criar soluções escaláveis e eficientes usando tecnologias modernas. Minha trajetória é marcada pela busca contínua por conhecimento e aprendizado, o que me levou a participar de programas de alto nível. Entre as minhas credenciais, destaco: Harvard Business School ALP ’25 Alumni, e aluno dos programas avançados como o ONE da Oracle, a formação Desenvolvedor Júnior da Amazon e a formação de Gerenciamento de Projetos do Google. Possuo também capacitação em Java pelo Instituto Caldeira e pelo programa Desenvolve (Grupo Boticário).',
      en: 'Passionate developer with over 1 year of experience focused on web development. Specialized in building scalable and efficient solutions using modern technologies. My path is driven by continuous learning, leading me to participate in high-level programs. Among my credentials, I highlight: Harvard Business School ALP ’25 Alumni, and student of advanced programs such as Oracle ONE, Amazon Junior Developer course, and Google Project Management course. I am also trained in Java by Instituto Caldeira and the Desenvolve program (Grupo Boticário).',
    },
    skills: [
      'Angular',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Express.js',
      'NestJS',
      'React',
      'Vue.js',
      'Java',
      'Spring Boot',
      'Quarkus',
      'Docker',
      'Kubernetes',
      'OCI',
      'MongoDB',
      'PostgreSQL',
      'MySQL',
      'Redis',
      'Git',
    ],
  },
  socialLinks: [
    {
      icon: 'devicon-github-original',
      name: 'GitHub',
      url: 'https://github.com/MrClaro',
      color: '#333',
    },
    {
      icon: 'devicon-linkedin-plain',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/adryan-claro/',
      color: '#0077B5',
    },
  ],
  contactInfo: [
    {
      icon: 'email',
      title: { pt: 'Email', en: 'Email' },
      value: 'adryan.contatoprofissional@gmail.com',
      link: 'mailto:adryan.contatoprofissional@gmail.com',
      type: 'email',
    },
    {
      icon: 'phone',
      title: { pt: 'Telefone', en: 'Phone' },
      value: '+55 (14) 99872-4427',
      link: 'tel:+5514998724427',
      type: 'phone',
    },
    {
      icon: 'location_on',
      title: { pt: 'Localização', en: 'Location' },
      value: 'Ourinhos, SP',
      type: 'location',
    },
  ],
  expertise: [
    {
      icon: 'code',
      title: {
        pt: 'Desenvolvimento Frontend',
        en: 'Frontend Development',
      },
      description: {
        pt: 'Criação de interfaces modernas e responsivas com as melhores práticas de UX/UI, garantindo performance e acessibilidade.',
        en: 'Creation of modern and responsive interfaces with UX/UI best practices, ensuring performance and accessibility.',
      },
      skills: ['Angular', 'Vue', 'TypeScript', 'SASS', 'Tailwind CSS'],
    },
    {
      icon: 'dns',
      title: {
        pt: 'Desenvolvimento Backend',
        en: 'Backend Development',
      },
      description: {
        pt: 'Desenvolvimento de APIs REST e microserviços escaláveis com arquitetura limpa e boas práticas de segurança.',
        en: 'Development of REST APIs and scalable microservices with clean architecture and security best practices.',
      },
      skills: ['Java', 'Spring Boot', 'Node.js', 'NestJS', 'PostgreSQL'],
      highlighted: true,
    },
    {
      icon: 'integration_instructions',
      title: {
        pt: 'Integração de Sistemas',
        en: 'Systems Integration',
      },
      description: {
        pt: 'Conexão eficiente entre diferentes plataformas e serviços, otimizando processos e automatizando workflows.',
        en: 'Efficient connection between different platforms and services, optimizing processes and automating workflows.',
      },
      skills: ['REST APIs', 'GraphQL', 'Webhooks', 'Microserviços'],
    },
    {
      icon: 'cloud_upload',
      title: {
        pt: 'DevOps & Deploy',
        en: 'DevOps & Deploy',
      },
      description: {
        pt: 'Configuração de pipelines CI/CD, containerização e deploy automatizado para entrega contínua de valor.',
        en: 'Configuration of CI/CD pipelines, containerization, and automated deployment for continuous value delivery.',
      },
      skills: ['Docker', 'GitHub Actions', 'Nginx', 'Vercel', 'Linux'],
    },
    {
      icon: 'speed',
      title: {
        pt: 'Otimização de Performance',
        en: 'Performance Optimization',
      },
      description: {
        pt: 'Análise e melhoria de performance de aplicações, reduzindo tempo de carregamento e melhorando experiência do usuário.',
        en: 'Analysis and improvement of application performance, reducing loading times and improving user experience.',
      },
      skills: ['Lighthouse', 'Code Splitting', 'Lazy Loading', 'Caching'],
    },
    {
      icon: 'security',
      title: {
        pt: 'Segurança & Qualidade',
        en: 'Security & Quality',
      },
      description: {
        pt: 'Implementação de testes automatizados e práticas de segurança para garantir código confiável e manutenível.',
        en: 'Implementation of automated tests and security practices to ensure reliable and maintainable code.',
      },
      skills: ['Jest', 'Testing Library', 'OWASP', 'Code Review'],
    },
  ],
  experiences: [
    {
      title: {
        pt: 'Estagiário TI',
        en: 'IT Intern',
      },
      company: 'Mervil Transportes',
      period: {
        pt: 'Fev 2025 - Mai 2025',
        en: 'Feb 2025 - May 2025',
      },
      description: {
        pt: 'Desenvolvimento de funcionalidades para o sistema interno da empresa utilizando tecnologias modernas. Participação em reuniões de planejamento e revisão de código.',
        en: 'Development of features for the company\'s internal system using modern technologies. Participation in planning and code review meetings.',
      },
      highlights: [
        {
          pt: 'Desenvolvimento de novas funcionalidades para o sistema interno utilizando React e NextJS.',
          en: 'Development of new features for the internal system using React and NextJS.',
        },
        {
          pt: 'Criação e consumo de APIs RESTful conectadas a microsserviços no backend usando NestJS.',
          en: 'Creation and consumption of RESTful APIs connected to backend microservices using NestJS.',
        },
        {
          pt: 'Implementação de melhorias de performance e fluxos de dados no frontend.',
          en: 'Implementation of performance improvements and data flows in the frontend.',
        },
        {
          pt: 'Participação ativa em reuniões diárias (Daily Scrum), planejamentos de sprint e revisões de código (Code Reviews).',
          en: 'Active participation in daily meetings (Daily Scrum), sprint planning, and Code Reviews.',
        },
      ],
      technologies: ['React', 'NextJS', 'TypeScript', 'Docker', 'NodeJS', 'NestJS'],
    },
    {
      title: {
        pt: 'Desenvolvedor Back End',
        en: 'Backend Developer',
      },
      company: 'Assert Tech',
      period: {
        pt: 'Ago 2024 - Nov 2025',
        en: 'Aug 2024 - Nov 2025',
      },
      description: {
        pt: 'Desenvolvimento de APIs RESTful e gerenciamento de banco de dados. Colaboração em equipes ágeis para entrega contínua de software.',
        en: 'Development of RESTful APIs and database management. Collaboration in agile teams for continuous software delivery.',
      },
      highlights: [
        {
          pt: 'Desenvolvimento e otimização de APIs RESTful robustas usando Node.js e Express.',
          en: 'Development and optimization of robust RESTful APIs using Node.js and Express.',
        },
        {
          pt: 'Modelagem de bancos de dados relacionais e execução de consultas otimizadas com MySQL e Prisma ORM.',
          en: 'Modeling of relational databases and execution of optimized queries with MySQL and Prisma ORM.',
        },
        {
          pt: 'Implementação de filas de processamento em segundo plano (background tasks) com Bull e Redis.',
          en: 'Implementation of background task processing queues with Bull and Redis.',
        },
        {
          pt: 'Configuração e orquestração de ambientes de desenvolvimento containerizados com Docker.',
          en: 'Configuration and orchestration of containerized development environments with Docker.',
        },
      ],
      technologies: ['Node', 'Express.JS', 'MySQL', 'Redis', 'Prisma', 'Bull'],
    },
    {
      title: {
        pt: 'Analista de Dados',
        en: 'Data Analyst',
      },
      company: 'Assert Tech',
      period: {
        pt: 'Mai 2024 - Jul 2024',
        en: 'May 2024 - Jul 2024',
      },
      description: {
        pt: 'Análise e visualização de dados para otimizar processos de negócios. Disparo de campanhas VOIP e SMS utilizando Salesforce CRM.',
        en: 'Data analysis and visualization to optimize business processes. Dispatch of VOIP and SMS campaigns using Salesforce CRM.',
      },
      highlights: [
        {
          pt: 'Análise detalhada de dados operacionais e criação de dashboards dinâmicos no Power BI.',
          en: 'Detailed analysis of operational data and creation of dynamic dashboards in Power BI.',
        },
        {
          pt: 'Automação de planilhas de monitoramento e geração de relatórios automatizados utilizando Excel e VBA.',
          en: 'Automation of monitoring spreadsheets and generation of automated reports using Excel and VBA.',
        },
        {
          pt: 'Integração e gerenciamento de disparos de campanhas em lote (VOIP e SMS) integradas ao Salesforce CRM.',
          en: 'Integration and management of bulk campaign dispatches (VOIP and SMS) integrated with Salesforce CRM.',
        },
      ],
      technologies: ['Excel', 'VBA', 'Salesforce', 'Power BI'],
    },
  ],
  education: [
    {
      degree: {
        pt: 'Bacharelado em Engenharia de Software',
        en: 'Bachelor of Science in Software Engineering',
      },
      institution: 'Centro Universitário das Faculdades Integradas de Ourinhos',
      period: '2024 - 2027',
      description: {
        pt: 'Foco em desenvolvimento de software, algoritmos e estruturas de dados.',
        en: 'Focus on software development, algorithms, and data structures.',
      },
    },
  ],
  certifications: [
    {
      name: 'Oracle Cloud Infrastructure 2025 Certified Foundations Associate',
      issuer: 'Oracle',
      date: 'Nov 2025',
      credentialId: '23A582F666615D8DE8EFED3E7EBC3CF904B055D529F074714D25ADA4534FBE44',
      link: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=23A582F666615D8DE8EFED3E7EBC3CF904B055D529F074714D25ADA4534FBE44',
    },
  ],
  courses: [
    {
      name: {
        pt: 'Formação ONE - Oracle Next Education - Desenvolvedor Back-End Java',
        en: 'ONE Program - Oracle Next Education - Java Backend Developer',
      },
      platform: 'Oracle',
      duration: '700h',
      completed: true,
    },
    {
      name: {
        pt: 'Desenvolvimento Full Stack Java',
        en: 'Java Full Stack Development',
      },
      platform: 'Orbit Systems',
      duration: '180h',
      completed: true,
    },
    {
      name: {
        pt: 'Formação PROA',
        en: 'PROA Program',
      },
      platform: 'PROA',
      duration: '100h',
      completed: true,
    },
    {
      name: {
        pt: 'Gestão Empresarial',
        en: 'Business Management',
      },
      platform: 'Speed Treinamentos',
      duration: '104h',
      completed: true,
    },
    {
      name: {
        pt: 'Aspire Leaders Program - Harvard Business School ALP ’25',
        en: 'Aspire Leaders Program - Harvard Business School ALP ’25',
      },
      platform: 'Harvard Business School',
      duration: '50h',
      completed: true,
    },
    {
      name: {
        pt: 'Java Básico',
        en: 'Basic Java',
      },
      platform: 'Instituto Caldeira',
      duration: '40h',
      completed: true,
    },
    {
      name: {
        pt: 'Fundamentos de IA e Dados - Desenvolve',
        en: 'AI & Data Foundations - Desenvolve',
      },
      platform: 'Grupo Boticário',
      duration: '30h',
      completed: true,
    },
    {
      name: {
        pt: 'SQL e Banco de Dados Completo',
        en: 'SQL & Database Complete Course',
      },
      platform: 'Softblue',
      duration: '20h',
      completed: true,
    },
    {
      name: {
        pt: 'Formação Desenvolvedor Júnior',
        en: 'Junior Developer Training',
      },
      platform: 'Amazon',
      duration: '200h',
      completed: false,
    },
    {
      name: {
        pt: 'Formação Gerenciamento de Projetos',
        en: 'Project Management Certificate',
      },
      platform: 'Google',
      duration: '140h',
      completed: false,
    },
  ],
  featuredProjects: [
    {
      title: {
        pt: 'Recicla Tech',
        en: 'Recicla Tech',
      },
      content: {
        pt: 'O ReciclaTech é uma plataforma que visa promover a sustentabilidade e a economia circular, conectando pessoas que desejam doar eletrônicos usados em bom estado com aquelas que precisam adquirir esses itens. O projeto foi construído com foco em semântica, acessibilidade e responsividade, utilizando as melhores práticas do HTML5 e SCSS.',
        en: 'ReciclaTech is a platform aiming to promote sustainability and circular economy, connecting people who want to donate used electronics in good condition with those who need them. The project was built with a focus on semantics, accessibility, and responsiveness, using HTML5 and SCSS best practices.',
      },
      resourcesTitle: {
        pt: 'Links Úteis',
        en: 'Useful Links',
      },
      resources: [
        {
          label: { pt: 'Ver Demo', en: 'Live Demo' },
          url: 'https://mrclaro.github.io/recicla-tech/',
        },
        {
          label: { pt: 'Documentação', en: 'Documentation' },
          url: 'https://github.com/MrClaro/recicla-tech',
        },
      ],
      technologies: ['HTML', 'SASS'],
      repoName: 'recicla-tech',
      username: 'MrClaro',
      description: {
        pt: 'Plataforma de conexão para economia circular e sustentabilidade, focada na doação e aquisição de eletrônicos usados.',
        en: 'Connection platform for circular economy and sustainability, focused on the donation and acquisition of used electronics.',
      },
      language: 'SASS',
      date: '2025-10-15',
      githubUrl: 'https://github.com/MrClaro/recicla-tech/',
      imageUrl: '/recicla-tech.png',
    },
    {
      title: {
        pt: 'Challenge Forum Hub - Oracle Next Education (ONE)',
        en: 'Challenge Forum Hub - Oracle Next Education (ONE)',
      },
      content: {
        pt: 'Este projeto faz parte do programa Oracle Next Education (ONE) se tratando do último challenge proposto, onde o desafio consistiu em construir uma API REST completa de fórum, com funcionalidades de tópicos, respostas, cursos, matrículas e usuários, utilizando o ecossistema Spring Boot moderno e boas práticas de arquitetura Java.',
        en: 'This project is part of the Oracle Next Education (ONE) program, being the last proposed challenge. The challenge consisted of building a complete forum REST API, with features for topics, answers, courses, enrollments, and users, using the modern Spring Boot ecosystem and Java architecture best practices.',
      },
      resourcesTitle: {
        pt: 'Links Úteis',
        en: 'Useful Links',
      },
      resources: [
        {
          label: { pt: 'Ver Demo', en: 'GitHub Repo' },
          url: 'https://github.com/MrClaro/challenge-forum-hub',
        },
        {
          label: { pt: 'Documentação', en: 'Documentation' },
          url: 'https://github.com/MrClaro/challenge-forum-hub',
        },
      ],
      technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
      repoName: 'challenge-forum-hub',
      username: 'MrClaro',
      description: {
        pt: 'Quarto e último challenge do programa ONE (Oracle Next Education)',
        en: 'Fourth and last challenge of the ONE (Oracle Next Education) program',
      },
      language: 'Java',
      date: '2025-08-05',
      githubUrl: 'https://github.com/MrClaro/challenge-forum-hub',
      imageUrl: '/challenge.jpeg',
    },
  ],
  blogArticles: [
    {
      title: {
        pt: 'Desmistificando o Spring Boot: Como construir APIs REST robustas',
        en: 'Demystifying Spring Boot: Building Robust REST APIs',
      },
      description: {
        pt: 'Entenda os conceitos chave do ecossistema Spring: injeção de dependências, JPA/Hibernate, tratamento de erros global e segurança.',
        en: 'Understand key concepts of the Spring ecosystem: dependency injection, JPA/Hibernate, global error handling, and security.',
      },
      date: 'Jun 20, 2026',
      readTime: { pt: '8 min de leitura', en: '8 min read' },
      tags: ['Java', 'Spring Boot', 'REST API', 'Backend'],
      url: 'https://github.com/MrClaro/challenge-forum-hub',
    },
    {
      title: {
        pt: 'Angular Signals: O Guia Definitivo para Reatividade Moderna',
        en: 'Angular Signals: The Definitive Guide to Modern Reactivity',
      },
      description: {
        pt: 'Substitua o RxJS em cenários simples e melhore a performance de renderização de suas telas usando Signals, computed e effects.',
        en: 'Replace RxJS in simple scenarios and improve view rendering performance using Signals, computed, and effects.',
      },
      date: 'Jun 15, 2026',
      readTime: { pt: '6 min de leitura', en: '6 min read' },
      tags: ['Angular', 'TypeScript', 'Signals', 'Frontend'],
      url: 'https://github.com/MrClaro/desafio-angular-na-pratica',
    },
    {
      title: {
        pt: 'Arch Linux & Neovim: Configurando o ambiente de desenvolvimento ideal',
        en: 'Arch Linux & Neovim: Setting Up the Ideal Development Environment',
      },
      description: {
        pt: 'Um guia prático de como transformar o Neovim em uma IDE super rápida usando Lua, Lazy.nvim, Mason e LSPs no Arch Linux.',
        en: 'A practical guide on transforming Neovim into a super fast IDE using Lua, Lazy.nvim, Mason, and LSPs on Arch Linux.',
      },
      date: 'Jun 02, 2026',
      readTime: { pt: '10 min de leitura', en: '10 min read' },
      tags: ['Linux', 'Arch Linux', 'Neovim', 'Lua', 'DevOps'],
      url: 'https://github.com/MrClaro',
    },
  ],
};
