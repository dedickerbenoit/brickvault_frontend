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
    },
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
} as const;
