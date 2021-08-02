export const capitalize = (string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
};

export const isEmptyObject = (obj) => {
  return (
    obj ? // null and undefined check
      Object.keys(obj).length === 0 // empty object check
      && obj.constructor === Object // Object.keys(new Date()).length === 0; so we have to check it is not a Date
    :
      true
  );
};

export const isAuthLocation = (location) => {
  return (
    (location.pathname === "/signup") ||
    (location.pathname === "/signin") ||
    (location.pathname === "/profile") ||
    (location.pathname === "/signout") ||
    (location.pathname === "/forgot-password")
  );
}

export const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === "[::1]" ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

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

    // add some data (with changing id to allow storin multiple rows with the same id)
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
