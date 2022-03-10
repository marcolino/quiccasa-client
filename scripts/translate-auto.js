#!/usr/bin/env node

// require the module and instantiate instance
const tjo = require("translate-json-object")();
const fs = require("fs");

const localesFolder = "./src/locales";
const localesNamespace = "translation";
const languageReference = "en";
const translationAutomaticTag = "🤖 ";

// choose the service to use google/yandex (if you provide both yandex will be used as the default)
tjo.init({
  //googleApiKey: "it is a payed subscription API now",
  yandexApiKey: "trnsl.1.1.20170728T161359Z.fb1440f8e3592d56.9ab7fa4c8d96af96b7ff0ae7ff029cb790595934",
});

// read all defined locales files
fs.readdir(localesFolder, function(err, folders) {
  if (err) throw(err);
  console.log("languages in folder:", folders);
  translate(folders);
});

const translate = async(folders) => {
  const resourceReference = getResourceFromFileSync(localesFolder + "/" + languageReference + "/" + localesNamespace + ".json")
  for (var i = 0; i < folders.length; i++) {
    language = folders[i];
    if (language == languageReference) continue; // do not translate reference language
    try {
      const resourceTranslated = await tjo.translate(resourceReference, language);
      //console.log("resource translated for language " + language + ":", resourceTranslated);
      const localesFilePath = localesFolder + "/" + language + "/" + localesNamespace + ".json"
      const resource = getResourceFromFileSync(localesFilePath);
      resourceMerged = mergeResources(resource, resourceTranslated, translationAutomaticTag);
      //console.log("resource original for language " + language + ":", resource);
      //console.log("resource merged for language " + language + ":", resourceMerged);
      putResourceToFileSync(resourceMerged, localesFilePath);
    } catch(err) {
      console.error("error translating resource to language " + language + ":", err);
    }
  }
}

const getResourceFromFileSync = (filePath) => {
  if (!fs.existsSync(filePath)) { // file does not exist
    console.error("File " + filePath + " not found (" + err + ")");
    return null;
  } else {
    try {
      return JSON.parse(fs.readFileSync(filePath));
    } catch(err) {
      console.error("File " + filePath + "could not be read (" + err + ")");
      return null;
    }
  }
}

const putResourceToFileSync = (resource, filePath) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(resource, null, 2));
    return true;
  } catch(err) {
    console.error("File " + filePath + "could not be written (" + err + ")");
    return false;
  }
}

const mergeResources = (oldObject, newObject, changeTag) => {
  for (var key in newObject) {
    if (!oldObject.hasOwnProperty(key) || (!oldObject[key])) { // key not present in old object or it is empty
      oldObject[key] = changeTag + newObject[key]; // add key with change tag at the beginning of value
    }
  }
  return oldObject;
}
