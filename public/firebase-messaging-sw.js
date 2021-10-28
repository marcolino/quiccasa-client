// scripts for firebase and firebase messaging
// NOTE: be sure to import the same version of the scripts as firebase version in package.json dependency
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js");

// initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyAN-T9JMI8W5oF2Gip2Pcu-E_xtXBB2gE0",
  authDomain: "sistemisolari-quiccasa.firebaseapp.com",
  projectId: "sistemisolari-quiccasa",
  storageBucket: "sistemisolari-quiccasa.appspot.com",
  messagingSenderId: "748892040096",
  appId: "1:748892040096:web:69200876ed8ffa8615d2c5",
};

firebase.initializeApp(firebaseConfig);

// retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("Received background push message:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    image: payload.notification.image,
    tag: payload.notification.tag,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  console.log('adding to IndexedDB sw-background-push-messages');
  self.indexedDB = self.indexedDB || self.mozIndexedDB || self.webkitIndexedDB || self.msIndexedDB;
  self.IDBTransaction = self.IDBTransaction || self.webkitIDBTransaction || self.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
  // (Mozilla has never prefixed these objects, so we don't need self.mozIDB*)
  if (!self.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
  }

  console.log("Your browser does support a stable version of IndexedDB.");

  // open database
  var request = self.indexedDB.open('sw-background-push-messages', 2);

  request.onsuccess = function(event) {
    // some sample messages data
    // var messages = [
    //   {id: 1, name: 'Red Men T-Shirt', price: '$3.99'},
    //   {id: 2, name: 'Pink Women Shorts', price: '$5.99'},
    //   {id: 3, name: 'Nike white Shoes', price: '$300'}
    // ];
    var message =
      {id: 1, name: 'body payload'}
    ;


    // get database from event
    var db = event.target.result;

    // create transaction from database
    var transaction = db.transaction('messages', 'readwrite');

    // add success event handleer for transaction
    // you should also add onerror, onabort event handlers
    transaction.onsuccess = function(event) {
      console.log('[Transaction] ALL DONE!');
    };

    // get store from transaction
    var messagesStore = transaction.objectStore('messages');

    /*************************************/

    // // put messages data in messagesStore
    // //messages.forEach(function(message){
    //   var db_op_req = messagesStore.add(message);

    //   db_op_req.onsuccess = function(event) {
    //     console.log('added:', event.target.result == message.id); // true
    //   }
    // //});
    var message = {id: 7, name: payload.notification.body};
    var db_op_req = messagesStore.add(message);
  
    db_op_req.onsuccess = function(event) {
      console.log('added:', event.target.result == message.id); // true
    }
  
    // count number of objects in store
    messagesStore.count().onsuccess = function(event) {
      console.log('[Transaction - COUNT] number of messages in store', event.target.result);
    };

    // get message with id 1
    messagesStore.get(1).onsuccess = function(event) {
      console.log('[Transaction - GET] message with id 1', event.target.result);
    };

    // update message with id 1
    //messages[0].name = 'Blue Men T-shirt';
    message.name = 'body payload UPDATED';
    messagesStore.put(message).onsuccess = function(event) {
      console.log('[Transaction - PUT] message with id 1', event.target.result);
    };

    // // delete message with id 2
    // messagesStore.delete(2).onsuccess = function(event) {
    //   console.log('[Transaction - DELETE] deleted with id 2');
    // };
  };

  request.onerror = function(event) {
    console.log('[onerror]', request.error);
  };

  request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var messagesStore = db.createObjectStore('messages', {keyPath: 'id'});
  };

});
