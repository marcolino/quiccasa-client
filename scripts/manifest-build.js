#!/usr/bin/env node
/**
 * Build manifest.json for a react web app, starting from the 
 * environment, the src/config.js and package.json file,
 * using only node.js
 */

require("dotenv").config();
const fs = require("fs");
const { version } = require("../package.json");
const config = require("../src/config");

const manifestFileName = "./public/manifest.json";

// check favicons existence
const faviconsPaths = [
  "./public/favicon.ico",
  "./public/favicon-192.png",
  "./public/favicon-512.png",
];

let error = false;
for (const faviconsPath of faviconsPaths) {
  try {
    fs.accessSync(faviconsPath, fs.F_OK);
    // favicon exists
  } catch (err) {
    error = true;
    console.error(err.message);
  }
}

if (!error) {
  const manifestJson = {
    "short_name": config.appTitle,
    "name": `${config.appTitle} by ${config.companyHomeSiteName} (v ${version})`,
    "icons": [
      {
        "src": "favicon.ico",
        "sizes": "128x128 64x64 32x32 24x24 16x16",
        "type": "image/x-icon"
      },
      {
        "src": "favicon-192.png",
        "type": "image/png",
        "sizes": "192x192"
      },
      {
        "src": "favicon-512.png",
        "type": "image/png",
        "sizes": "512x512"
      }
    ],
    "start_url": config.startUrl,
    "display": config.display,
    "theme_color": process.env.REACT_APP_THEME_COLOR,
    "background_color": process.env.REACT_APP_BACKGROUND_COLOR,
  };

  fs.writeFile(manifestFileName,  JSON.stringify(manifestJson, null, 2) + "\n", (err) => {
    if (err) {
      return console.log(err);
    }
  });
}
