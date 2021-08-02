/**
 * Here we manually collect text from interaction errors with remote
 * endpoints we do not control, and which is not originally localized.
 * With `/src/libs/Misc/ETBT` function we collect in IndexedDB and the
 * value is the English error text, then we collect them manually and
 * list them here, in the translation `t()` function call.
 * Then, running `yarn translations-parse` we insert them in
 * `locales` folder, and than we can localize it (!).
 */

const amplify = [
  t("Attempt limit exceeded, please try after some time."),
  t("Invalid verification code provided, please try again."),
  t("User already exists"),
];