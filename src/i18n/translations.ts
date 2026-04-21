export const translations = {
  en: {
    nav: {
      experience: 'Experience',
      projects: 'Projects',
      details: 'Details',
    },
    intro: {
      role: 'Software Engineer',
      prompt: 'whoami',
      roles: ['Full Stack Developer', 'Mobile Developer', 'Design Enthusiast', 'AI Enthusiast'],
    },
    experience: {
      title: 'Experience',
      present: 'Present',
    },
    projects: {
      title: 'Projects',
      viewProject: 'View Project',
      p1: {
        title: 'A web application for finding TV series.',
        features: [
          'Development of the frontend using React and TypeScript.',
          'Leverages the TMDB API for series data.',
        ],
      },
      p2: {
        title: 'A hybrid mobile application for route management.',
        features: [
          'Design and development of the App using React Native.',
          'Works on both Android and iOS devices.',
        ],
      },
    },
    details: {
      title: 'Details',
      bio1: "Currently based in Paris, holding a Master's in Software Engineering from the",
      bio1_uni: 'University of Lorraine',
      bio1_end: '. Currently working as a Software Engineer at Klee Group.',
      bio2: 'Passionate about crafting innovative web and mobile user experiences. Thrives in dynamic teams, excelling in autonomy and adaptability for project success.',
      bio3: 'In my spare time, I enjoy football, swimming, video games, and exploring new places through travel.',
      contact: 'Feel free to reach out through the email below. You can also connect on',
      contact_and: 'and explore my projects on',
    },
    games: {
      pressStart: 'PRESS START',
      retry: 'RETRY',
      nextLevel: 'NEXT LEVEL',
      newBest: '★ NEW BEST',
      snake: {
        hint: 'CATCH THE TECH STACK',
        hintKeys: 'ARROWS · WASD',
        gameOver: 'GAME OVER',
        subtitle: 'CATCH THE TECH STACK',
      },
      typeRush: {
        hint: 'TYPE THE FALLING KEYWORDS',
        hintEnter: 'ENTER TO VALIDATE',
        subtitle: 'TYPE THE FALLING KEYWORDS',
        gameOver: 'GAME OVER',
        placeholder: 'type here...',
      },
      stackCatcher: {
        hint: 'CLICK BUGS TO SQUASH',
        hintTimer: '30s TIMER',
        subtitle: 'SQUASH BUGS BEFORE THEY ESCAPE',
        timeUp: 'STACK CLEARED',
      },
      commitBreaker: {
        hint: 'MOVE PADDLE',
        hintArrows: 'ARROWS',
        hintBreak: 'BREAK THE STACK',
        subtitle: 'BREAK THE TECH STACK',
        gameOver: 'MERGE CONFLICT',
        win: 'STACK CLEARED!',
        hintControls: 'MOUSE · ARROWS',
      },
    },
  },
  fr: {
    nav: {
      experience: 'Expérience',
      projects: 'Projets',
      details: 'À propos',
    },
    intro: {
      role: 'Ingénieur Logiciel',
      prompt: 'whoami',
      roles: [
        'Développeur Full Stack',
        'Développeur Mobile',
        'Passionné de Design',
        "Passionné par l'IA",
      ],
    },
    experience: {
      title: 'Expérience',
      present: 'En cours',
    },
    projects: {
      title: 'Projets',
      viewProject: 'Voir le projet',
      p1: {
        title: 'Une application web pour trouver des séries TV.',
        features: [
          'Développement du frontend avec React et TypeScript.',
          "Utilise l'API TMDB pour les données de séries.",
        ],
      },
      p2: {
        title: "Une application mobile hybride de gestion d'itinéraires.",
        features: [
          "Conception et développement de l'application avec React Native.",
          'Compatible Android et iOS.',
        ],
      },
    },
    details: {
      title: 'À propos',
      bio1: "Basé à Paris, titulaire d'un Master en Ingénierie Logicielle de ",
      bio1_uni: "l'Université de Lorraine",
      bio1_end: '. Actuellement Ingénieur Logiciel chez Klee Group.',
      bio2: "Passionné par la création d'expériences web et mobiles innovantes. À l'aise en équipe dynamique, avec un fort sens de l'autonomie et de l'adaptabilité.",
      bio3: "En dehors du travail, j'apprécie le football, la natation, les jeux vidéo et les voyages.",
      contact: 'N\'hésitez pas à me contacter par email ci-dessous. Vous pouvez aussi me rejoindre sur',
      contact_and: 'et explorer mes projets sur',
    },
    games: {
      pressStart: 'DÉMARRER',
      retry: 'REJOUER',
      nextLevel: 'NIVEAU SUIVANT',
      newBest: '★ NOUVEAU RECORD',
      snake: {
        hint: 'ATTRAPE LE STACK',
        hintKeys: 'FLÈCHES · WASD',
        gameOver: 'PARTIE TERMINÉE',
        subtitle: 'ATTRAPE LE STACK',
      },
      typeRush: {
        hint: 'TAPE LES MOTS QUI TOMBENT',
        hintEnter: 'ENTRÉE POUR VALIDER',
        subtitle: 'TAPE LES MOTS QUI TOMBENT',
        gameOver: 'PARTIE TERMINÉE',
        placeholder: 'tape ici...',
      },
      stackCatcher: {
        hint: 'CLIQUE POUR ÉCRASER LES BUGS',
        hintTimer: 'CHRONO 30s',
        subtitle: 'ÉCRASE LES BUGS AVANT QU\'ILS NE FUIENT',
        timeUp: 'STACK EFFACÉ',
      },
      commitBreaker: {
        hint: 'DÉPLACE LA RAQUETTE',
        hintArrows: 'FLÈCHES',
        hintBreak: 'CASSE LE STACK',
        subtitle: 'CASSE LE TECH STACK',
        gameOver: 'CONFLIT DE MERGE',
        win: 'STACK EFFACÉ !',
        hintControls: 'SOURIS · FLÈCHES',
      },
    },
  },
}

export type Translations = typeof translations.en
