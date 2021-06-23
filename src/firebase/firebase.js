import firebase from "firebase";
import firebaseConfig from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.firestore();

export default firebaseApp;
