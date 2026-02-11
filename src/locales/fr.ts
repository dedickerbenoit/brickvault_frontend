export default {
  auth: {
    login: {
      trigger: "Se connecter",
      title: "Connexion",
      email: "Email",
      emailPlaceholder: "vous@exemple.com",
      password: "Mot de passe",
      passwordPlaceholder: "••••••••",
      submit: "Se connecter",
      error: "Email ou mot de passe incorrect",
      noAccount: "Pas encore de compte ?",
      createAccount: "Créer un compte",
      forgotPassword: "Mot de passe oublié ?",
    },
    forgotPassword: {
      title: "Mot de passe oublié",
      subtitle: "Entrez votre email pour recevoir un lien de réinitialisation",
      submit: "Envoyer le lien",
      successTitle: "Email envoyé !",
      successMessage: "Si un compte existe avec cette adresse, vous recevrez un email avec un lien de réinitialisation.",
      backToLogin: "Retour à la connexion",
    },
    resetPassword: {
      title: "Réinitialiser le mot de passe",
      subtitle: "Choisissez un nouveau mot de passe pour votre compte",
      newPassword: "Nouveau mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      submit: "Réinitialiser le mot de passe",
      successTitle: "Mot de passe réinitialisé !",
      successMessage: "Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter.",
      goToLogin: "Se connecter",
      tokenMissing: "Le token de réinitialisation est manquant",
    },
    register: {
      title: "Créer un compte",
      subtitle: "Rejoignez BrickVault et gérez votre collection LEGO",
      firstName: "Prénom",
      firstNamePlaceholder: "Jean",
      name: "Nom",
      namePlaceholder: "Dupont",
      email: "Email",
      emailPlaceholder: "vous@exemple.com",
      password: "Mot de passe",
      passwordPlaceholder: "••••••••",
      confirmPassword: "Confirmer le mot de passe",
      confirmPasswordPlaceholder: "••••••••",
      submit: "Créer mon compte",
      hasAccount: "Déjà un compte ?",
      login: "Se connecter",
      passwordRules: {
        minLength: "8 caractères minimum",
        uppercase: "Une lettre majuscule",
        digit: "Un chiffre",
        specialChar: "Un caractère spécial (@$!%*?&)",
      },
      hero: {
        title: "Rejoignez BrickVault",
        description:
          "La plateforme complète pour gérer votre collection LEGO, suivre vos investissements et maximiser votre ROI.",
        catalog: "Catalogue complet",
        catalogDescription:
          "Accédez à des milliers de sets LEGO avec photos et détails",
        roi: "Suivi ROI en temps réel",
        roiDescription:
          "Calculez automatiquement vos gains et pertes",
        free: "100% gratuit",
        freeDescription:
          "Toutes les fonctionnalités essentielles sans frais",
      },
    },
  },
  validation: {
    firstNameRequired: "Le prénom est requis",
    nameRequired: "Le nom est requis",
    emailRequired: "L'email est requis",
    emailInvalid: "L'email n'est pas valide",
    passwordRequired: "Le mot de passe est requis",
    passwordMismatch: "Les mots de passe ne correspondent pas",
  },
  layout: {
    footer: {
      about: "À propos",
      aboutDescription:
        "BrickVault est une application de gestion de collection LEGO pour passionnés. Non affilié au groupe LEGO.",
      legal: "Légal",
      privacyPolicy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      legalNotice: "Mentions légales",
      resources: "Ressources",
      copyright: "© {{year}} BrickVault. Tous droits réservés.",
      trademark: "LEGO® est une marque déposée du groupe LEGO.",
    },
  },
  landing: {
    hero: {
      title: "Gérez votre collection LEGO.",
      titleHighlight: "Maximisez votre rentabilité.",
      description:
        "BrickVault centralise vos sets, achats, ventes et met en avant votre ROI en temps réel. La plateforme complète pour collectionneurs et investisseurs LEGO.",
      cta: "Commencer gratuitement",
      learnMore: "En savoir plus",
    },
    dashboard: {
      title: "Dashboard BrickVault",
      description: "Suivez l'évolution de votre collection en temps réel",
    },
    features: {
      title: "Pourquoi BrickVault ?",
      description:
        "Une suite complète d'outils pour les collectionneurs et investisseurs LEGO.",
      collection: {
        title: "Gestion de collection",
        description:
          "Enregistrez vos sets, leurs caractéristiques, leur état et leur historique. Organisez votre collection par thème, lieu de stockage ou collections personnalisées.",
      },
      roi: {
        title: "Suivi de rentabilité",
        description:
          "Visualisez vos achats, ventes et ROI sur des graphiques intuitifs. Analysez vos transactions et identifiez vos sets les plus rentables.",
      },
      alerts: {
        title: "Alertes & opportunités",
        description:
          "Restez informé des meilleures offres et opportunités d'investissement. Suivez l'évolution des prix et maximisez votre retour sur investissement.",
      },
    },
    insights: {
      title: "Analyse intelligente de votre collection",
      description:
        "BrickVault vous aide à comprendre l'évolution de votre collection à travers des métriques claires et des visualisations puissantes.",
      benefits: {
        realTimeValue: "Valeur totale de votre collection en temps réel",
        roiAnalysis: "ROI global et analyse par set individuel",
        trends: "Tendances d'achat et de vente mensuelles",
        stats: "Statistiques avancées par thème et année",
      },
    },
    useCases: {
      title: "Pour qui est BrickVault ?",
      description:
        "Que vous soyez collectionneur passionné, investisseur averti ou revendeur, BrickVault s'adapte à vos besoins.",
      collectors: {
        title: "Collectionneurs",
        description:
          "Organisez et cataloguez votre passion avec précision.",
      },
      investors: {
        title: "Investisseurs",
        description:
          "Suivez votre ROI et optimisez votre portefeuille LEGO.",
      },
      resellers: {
        title: "Revendeurs",
        description:
          "Gérez vos stocks et transactions en toute simplicité.",
      },
    },
    cta: {
      title: "Rejoignez BrickVault aujourd'hui",
      description:
        "Simplifiez la gestion de votre passion et profitez d'une vue claire sur la valeur de votre collection. Gratuit pour commencer.",
      button: "Créer un compte gratuitement",
    },
    footer: {
      description:
        "La plateforme de gestion de collection LEGO pour collectionneurs et investisseurs.",
      product: "Produit",
      features: "Fonctionnalités",
      createAccount: "Créer un compte",
      login: "Se connecter",
      legal: "Légal",
      privacy: "Confidentialité",
      terms: "Conditions d'utilisation",
      support: "Support",
      contact: "Contact",
      faq: "FAQ",
      copyright: "© {{year}} BrickVault. Tous droits réservés.",
      trademark:
        "LEGO® est une marque déposée du groupe LEGO. BrickVault n'est pas affilié au groupe LEGO.",
    },
  },
  charts: {
    barChart: {
      title: "Évolution de votre collection",
      subtitle: "Nombre de sets par mois",
      sets: "sets",
    },
    lineChart: {
      title: "Valeur de collection",
      subtitle: "Évolution en € (6 derniers mois)",
      legend: "Valeur totale investie",
    },
  },
} as const;
