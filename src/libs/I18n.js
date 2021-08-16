import config from "../config";
import { resources } from "../i18n";

/**
 * Find the first language from the browser's language, also primarized (ex.: "en_US" => "en") if needed,
 * which is among supported languages; if none found, return configured fallback language.
 */
export const getCurrentLanguage = (i18n) => {
  const browserLanguages = i18n.languages;
  const supportedLanguages = Object.keys(resources);
  const commonLanguages = browserLanguages.filter(language => supportedLanguages.includes(language));
  if (commonLanguages) { // found a supported language in browser languages
    return commonLanguages[0];
  } else { // not found a supported language in i18n browser languages, look for primary language
    const browserLanguagesPrimary = browserLanguages.map(browserLanguage => browserLanguage.split("_").pop());
    const commonLanguages = browserLanguagesPrimary.filter(language => supportedLanguages.includes(language));
    if (commonLanguages) { // found a supported language in browser primary languages
      return commonLanguages[0];
    } else {
      return config.languages.fallback; // return configured fallback language
    }
  }
}


/**
 * Function to store in IndexedDB errors in English from Cognito/Amplify,
 * so to be able to localize them all, later...
 * To be used only while developing, remove in stable production.
 * 
 * @param {caller} string
 * @param {error} object or string
 */
 export function ETBT(caller, err) {
  caller = caller.toString();
  if ((typeof err === 'object') && (typeof err.message === 'string')) {
    err = err.message;
  } else {
    err = JSON.encode(err);
  }

  // save to indexedDB
  const id = caller;
  const value = err;

  // IndexedDB handling

  // this works on all devices/browsers, and uses IndexedDBShim as a final fallback 
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

  // open (or create) the database
  var open = indexedDB.open("ERRORS_TO_BE_TRANSLATED", 1);

  // create the schema
  open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("Amplify", {keyPath: "id"});
    /*var index = */store.createIndex("Index", ["id", "value"]);
  };

  open.onsuccess = function() {
    // start a new transaction
    var db = open.result;
    var tx = db.transaction("Amplify", "readwrite");
    var store = tx.objectStore("Amplify");
    /*var index = */store.index("Index");

    // add some data (with changing id to allow storing multiple rows with the same id)
    store.put({id: id + `-${random()}`, value});
    
    // query the data
    store.getAll().onsuccess = function() {
      var resultUniq = [...new Set(this.result.map(item => item.value))];
      //this.result.filter((v, i, a) => a.indexOf(v.value) === i);
      console.log('IndexedDb store getAll():', resultUniq);
    };

    // close the db when the transaction is done
    tx.oncomplete = function() {
      db.close();
    };
  }

  var random = function() {
    return (Math.random() + 1).toString(36).substring(1);
  }
}
