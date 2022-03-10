module.exports = {
  companyName: "AR Sistemi",
  companyHomeSiteName: "arsistemi.it",
  companyHomeSiteUrl: "https://www.arsistemi.it",
  companyOwner: "Marco Solari", // TODO: Antonio?
  companyOwnerFiscalCode: "SLRMRC61M31L219Y",
  companyOwnerStreetAddress: "Strada di Reaglie, 18",
  companyOwnerCity: "Torino",
  companyOwnerProvince: "TO",
  companyOwnerZipCode: "10132",
  companyOwnerPhone: "+39 333 6480983",
  companyOwnerEmail: "marcosolari@gmail.com",
  appName: "appalti190",
  appTitle: "Appalti190",
  appSiteUrl: "appalti190.arsistemi.it",
  appTermsValidityStartDate: "01-01-2022",
  startUrl: ".", // TODO: "/" or "." ?
  display: "standalone",
  spinner: {
    delay: 100,
    type: "Audio",
    color: "darkred",
    size: 66,
    opacity: .50,
  },
  languages: {
    supported: {
      "en": { icon: "🇬🇧" },
      "it": { icon: "🇮🇹" },
    },
    fallback: "it",
  },
  // sounds: {
  //   buttonClick,
  // },
  footerHeight: "1.5rem",
  extraSmallWatershed: 600,
  mobileDesktopWatershed: 900,
  federatedSigninProviders: [ // we currently handle "Facebook", "Google"
    //"Facebook",
    //"Google",
  ],
  oauth: { // TODO
    domain: "auth.sistemisolari.com",
    // OK for Google // scope: [ "phone", "email", "profile", "openid", "aws.cognito.signin.user.admin" ],
    scope: [ "email", "openid", "aws.cognito.signin.user.admin" ],
    responseType: "code",
  },
  oauthRedirectSignInLocal: "http://localhost:3000/",
  oauthRedirectSignInPublic: "https://appalti190.arsistemi.it/",
  oauthRedirectSignOutLocal: "http://localhost:3000/",
  oauthRedirectSignOutPublic: "https://appalti190.arsistemi.it/",
  debugAwsAmplify: false,
  api: {
    version: 1,
    stage: "dev", // "dev" / "prod"
    enpoint: {
      development: "https://apidev.sistemisolari.com/",
      production: "https://api.sistemisolari.com/",
    },
    headers: {
      "Content-Type": "application/json",
      "Content-Type-BACKUP": "x-www-form-urlencoded",
    },
    redirect: "follow",
  },
  indexedDb: {
    name: 'sw-background-push-messages',
    version: 1,
    objectStoresMeta: [
      {
        store: 'messages',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'name', keypath: 'name', options: { unique: false } },
          { name: 'email', keypath: 'email', options: { unique: false } }
        ]
      }
    ]
  },
  data: {
    templateDownloadName: "Appalti190.ots",
    templateDownloadLink: "/data/Appalti190.ots",
  },
};
