import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyD5qwdvK4zqes7PUeJE6Mojbb6VxPREuy0",
  authDomain: "devote-app.firebaseapp.com",
  databaseURL: "https://devote-app.firebaseio.com",
  projectId: "devote-app",
  storageBucket: "devote-app.appspot.com",
  messagingSenderId: "497898828922",
  appId: "1:497898828922:web:6b78c1feea55f0d0f377c3",
  measurementId: "G-SY40XGK26K"
}

// Initialize Firebase
firebase.initializeApp(config)

export default firebase
