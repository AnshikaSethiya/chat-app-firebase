   import firebase from 'firebase/app'
   import 'firebase/auth'
   import 'firebase/database'
   import 'firebase/storage';
   
   const config = {
    apiKey: "AIzaSyASzyUb0Hf5oJyMsw5JNvR9RvncBQ36mSE",
    authDomain: "chat-web-app-96ce5.firebaseapp.com",
    databaseURL: "https://chat-web-app-96ce5-default-rtdb.firebaseio.com",
    projectId: "chat-web-app-96ce5",
    storageBucket: "chat-web-app-96ce5.appspot.com",
    messagingSenderId: "213342160296",
    appId: "1:213342160296:web:e729ef174bcd9860a9899d"
  };

  const app = firebase.initializeApp(config)
  export const auth = app.auth();
  export const database = app.database()
  export const storage = app.storage();
