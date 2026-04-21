export const experiences = [
  {
    date: { en: 'Mar 2024 - Present', fr: 'Mars 2024 - En cours' },
    startDate: '2024-03',
    position: { en: 'Software Engineer', fr: 'Ingénieur Logiciel' },
    company: 'Klee Group',
    company_logo: './icons/kleegroup.jpg',
    location: 'Le Plessis-Robinson, France',
    subProjects: [
      {
        name: {
          en: 'Medical records & case management app for CIG (Centre Interdépartemental de Gestion)',
          fr: 'Application de gestion des saisines et dossiers médicaux pour le CIG (Centre Interdépartemental de Gestion)',
        },
        date: { en: 'Mar 2025 - Present', fr: 'Mars 2025 - En cours' },
        startDate: '2025-03',
        responsibilities: {
          en: [
            'Development of complex dynamic interfaces: multi-step steppers, editable tables, advanced filters and reactive components based on Angular signals.',
            'Ensuring compliance with complex business rules, with fine-grained role and access rights management on shared screens.',
            'Code quality: improving unit test coverage and resolving SonarQube alerts.',
            'Technical specifications and ticket estimation.',
          ],
          fr: [
            'Développement d\'interfaces dynamiques complexes : steppers multi-étapes, tableaux éditables, filtres avancés et composants réactifs basés sur les signaux Angular.',
            'Garantie du respect des règles métier complexes, avec gestion fine des rôles et droits d\'accès sur les mêmes écrans.',
            'Qualité du code : amélioration du coverage des tests unitaires et correction des alertes SonarQube.',
            'Spécification technique et chiffrage des tickets.',
          ],
        },
        technologies: [
          'Angular 20', 'DSFR', 'Spring Boot 3', 'Java 25', 'PostgreSQL',
          'Hibernate', 'Docker', 'GitLab', 'Keycloak', 'Jenkins', 'SonarQube',
          'Storybook', 'JUnit', 'France Connect', 'Figma', 'Jira',
        ],
      },
      {
        name: {
          en: 'Medical & administrative management app for DGS (Direction Générale de la Santé)',
          fr: 'Application de gestion médicale et administrative pour la DGS (Direction Générale de la Santé)',
        },
        date: { en: 'Jun 2024 - Sep 2025', fr: 'Juin 2024 - Sept. 2025' },
        duration: { en: '1 year 3 months', fr: '1 an 3 mois' },
        responsibilities: {
          en: [
            'Complete overhaul of back-end foundations, particularly the batch processing layer.',
            'Implementation of Elasticsearch indexing and faceted search for advanced navigation.',
            'Encryption of sensitive data (pathologies, personal information) using pgcrypto.',
            'Deployment: WAR generation, preparation and validation of staging environments.',
          ],
          fr: [
            'Refonte complète des socles back-end, notamment du socle batch.',
            "Mise en place de l'indexation Elasticsearch et développement de recherches avec facettes pour la navigation avancée.",
            'Implémentation du chiffrement des données sensibles (pathologies, données personnelles).',
            'Déploiement : génération du WAR, préparation et validation des environnements de recette.',
          ],
        },
        technologies: [
          'React 16', 'Spring Boot 3', 'PostgreSQL', 'JDK 17', 'Hibernate',
          'Elasticsearch', 'Docker', 'pgcrypto', 'GitLab CI/CD', 'Keycloak',
          'Figma', 'Jira',
        ],
      },
      {
        name: {
          en: "Shared reference data platform as microservices for DGEFP (Délégation générale à l'emploi et à la formation professionnelle)",
          fr: "Socle de référentiels mutualisés exposé en micro-services pour la DGEFP (Délégation générale à l'emploi et à la formation professionnelle)",
        },
        date: { en: 'Mar 2024 - Jan 2025', fr: 'Mars 2024 - Jan. 2025' },
        duration: { en: '10 months', fr: '10 mois' },
        responsibilities: {
          en: [
            'Bug fixing reported from staging and production environments.',
            'Development of functional features: dynamic forms, API calls, validation via security codes.',
            'Production performance optimization through analysis and refactoring of slow queries.',
            'Design of data visualization interfaces from external reference systems.',
          ],
          fr: [
            'Correction des anomalies remontées en recette et en production.',
            'Développement d\'évolutions fonctionnelles : formulaires dynamiques, appels API, validation par envoi de codes de sécurité.',
            'Optimisation des performances en production via l\'analyse et la refonte de requêtes lentes.',
            'Conception d\'interfaces de visualisation de données issues des référentiels externes.',
          ],
        },
        technologies: [
          'Angular 18', 'PrimeNG', 'Spring Boot 3', 'Java 17', 'Hibernate',
          'PostgreSQL', 'Elasticsearch', 'Docker', 'Jenkins', 'RabbitMQ',
          'Keycloak', 'SonarQube', 'Storybook', 'JUnit', 'Mockito', 'Figma', 'Jira',
        ],
      },
    ],
  },
  {
    date: { en: 'Apr 2023 - Sep 2023', fr: 'Avr. 2023 - Sept. 2023' },
    duration: { en: '6 months', fr: '6 mois' },
    position: { en: 'Full Stack Developer', fr: 'Développeur Full Stack' },
    company: 'Capgemini',
    company_logo: './icons/capgemini.png',
    location: 'Issy-les-Moulineaux, France',
    project: {
      en: 'Redesign of a collaborative learning and knowledge-sharing web application.',
      fr: "Refonte d'une application web d'apprentissage collaborative et de partage de connaissances.",
    },
    responsibilities: {
      en: [
        'Analysis of requirements and technical solutions.',
        'Development of new features (Front-end and Back-end).',
        'Implementation of unit and end-to-end tests.',
        'Code documentation and participation in code reviews.',
      ],
      fr: [
        'Analyse des besoins et solutions techniques.',
        'Développement de nouvelles fonctionnalités (Front-end et Back-end).',
        'Mise en place de tests unitaires et end-to-end.',
        'Documentation du code et participation aux revues de code.',
      ],
    },
    technologies: [
      'React 17', 'Nest.js', 'TypeScript', 'styled-components', 'TypeORM',
      'PostgreSQL', 'Docker', 'RabbitMQ', 'Nx', 'Jest', 'Cypress', 'GitLab',
      'Jira', 'Postman', 'DBeaver',
    ],
  },
  {
    date: { en: 'Mar 2022 - Aug 2022', fr: 'Mars 2022 - Août 2022' },
    duration: { en: '6 months', fr: '6 mois' },
    position: { en: 'Full Stack Developer', fr: 'Développeur Full Stack' },
    company: 'IBITEAM',
    company_logo: './icons/ibiteam.png',
    location: 'Mantes-la-Jolie, France',
    project: {
      en: 'Migration of an English vocabulary learning web application.',
      fr: "Migration d'une application web d'apprentissage du vocabulaire anglais.",
    },
    responsibilities: {
      en: [
        'Participation in the analysis and planning of the migration.',
        'Development of Front-end and Back-end user stories.',
        'Contribution to evolutionary and corrective maintenance.',
        'Execution of unit tests in the continuous integration (CI) pipeline.',
      ],
      fr: [
        'Participation à l\'analyse et la planification de la migration.',
        'Développement de stories Front-end et Back-end.',
        'Contribution à la maintenance évolutive et corrective.',
        "Exécution des tests unitaires dans le pipeline d'intégration continue (CI).",
      ],
    },
    technologies: [
      'Angular 12', 'TypeScript', 'RxJS', 'Java 11', 'Spring Boot', 'HTML5',
      'Sass', 'MongoDB', 'GitLab', 'Jira', 'Postman', 'VS Code', 'Trello',
    ],
  },
]
