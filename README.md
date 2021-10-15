# Project description

This project implements a complete, full fledged and best practices compliant template of a reactjs spa web app, including authentication.

It uses AWS S3 for... , AWS Cloudfront for..., AWS Cognito for user authentication handling, and AWS Amplify for react integration.

Features include full I18n support,... 

To add a new language locale support:

 - take note the ISO 639-1 code (2 characters, i.e.: "en", "it", ...) of the language to be added; from here on we indicate it as "xx".
 - create a folder named "xx" in ./src/locales folder.
 - add `"xx"` in locales array in src/i18next-parser.config.js file.
 - run `yarn translations-parse`.
 - add `import xx from "./locales/fr/translation.json";` on the top of "src/i18n.js" file, and
       `xx: { translation: xx },` in the resources object some lines below in the same file.
 - translate file "./src/locales/xx/translation.json"

This project was bootstrapped with [Crelate React App](https://github.com/facebook/create-react-app).