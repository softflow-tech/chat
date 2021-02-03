// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAaCEbX7Zd0o0j7NL7A-u1nSvhHRRXWz_8",
  authDomain: "test-chat-whatsapp.firebaseapp.com",
  databaseURL: "https://test-chat-whatsapp-default-rtdb.firebaseio.com",
  projectId: "test-chat-whatsapp",
  storageBucket: "test-chat-whatsapp.appspot.com",
  messagingSenderId: "35707292162",
  appId: "1:35707292162:web:c7763b403eb33b3789b51b",
  measurementId: "G-X1GBLZGRWB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage()

export { auth , provider , firebaseApp};
export default db;
