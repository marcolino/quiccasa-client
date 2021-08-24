module.exports = {
  companyName: "Sistemi Solari",
  companyHomeSiteName: "sistemisolari.com",
  companyHomeSiteUrl: "https://www.sistemisolari.com",
  companyOwner: "Marco Solari",
  companyOwnerFiscalCode: "SLRMRC61M31L219Y",
  companyOwnerStreetAddress: "Corso Quintino Sella, 92/43",
  companyOwnerCity: "Torino",
  companyOwnerProvince: "TO",
  companyOwnerZipCode: "10132",
  companyOwnerPhone: "+39 333 6480983",
  companyOwnerEmail: "marcosolari@gmail.com",
  appName: "quiccasa",
  appTitle: "Quiccasa",
  appSiteUrl: "quiccasa.sistemisolari.com",
  appTermsValidityStartDate: "01-01-2021",
  startUrl: ".",
  display: "standalone",
  spinner: {
    delay: 100,
    type: "Audio",
    color: "darkred",
    size: 66,
    opacity: .50,
  },
  languages: {
    fallback: "en",
  },
  footerHeight: "1.5rem",
  extraSmallWatershed: 600,
  mobileDesktopWatershed: 900,
  federatedSigninProviders: [ // we currently handle "Facebook", "Google"
    //"Facebook", // does not work yet
    "Google",
  ],
  oauth: {
    //HostedUIDomain: "quiccasa.sistemisolari.com",
    domain: "auth.sistemisolari.com",
    scope: [ "phone", "email", "profile", "openid", "aws.cognito.signin.user.admin" ],
    responseType: "code",
  },
  oauthRedirectSignInLocal: "http://localhost:3000/",
  oauthRedirectSignInPublic: "https://quiccasa.sistemisolari.com/",
  oauthRedirectSignOutLocal: "http://localhost:3000/",
  oauthRedirectSignOutPublic: "https://quiccasa.sistemisolari.com/",
  debugAwsAmplify: false,
  api: {
    version: 1,
    stage: "dev", // "dev" / "prod"
    enpoint: {
      development: "https://apidev.sistemisolari.com/",
      production: "https://api.sistemisolari.com/",
    }
  },
};
