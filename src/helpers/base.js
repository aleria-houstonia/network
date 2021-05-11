import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyB2WhQmmPw5f882UYmASduZAJjfBP5uwDo",
    authDomain: "network-2b67c.firebaseapp.com",
    projectId: "network-2b67c",
    storageBucket: "network-2b67c.appspot.com",
    messagingSenderId: "746696328412",
    appId: "1:746696328412:web:5a434d0991b0cca0fea019",
});

export const firestore = app.firestore();
export const auth = app.auth();

export default app;
