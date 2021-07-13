import firebase from "firebase";
import firebaseClient from "firebase/app";
import { IProject, postConverter } from "../models/project";
require("firebase/auth");
require("firebase/firestore");

export type DocumentData = firebase.firestore.DocumentData;
export type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
export type SnapshotOptions = firebase.firestore.SnapshotOptions;
export type Timestamp = firebase.firestore.Timestamp;

// If you're not using Code Sandbox, never hard-code the keys! Add them in your .env file and link them here
const CLIENT_CONFIG = {
  apiKey: "AIzaSyD0ABvna9jBcKKA09Sem2hTJJleZiSIXOo",
  authDomain: "mirjiportfolio.firebaseapp.com",
  projectId: "mirjiportfolio",
  storageBucket: "mirjiportfolio.appspot.com",
  messagingSenderId: "1018894855997",
  appId: "1:1018894855997:web:0ab02dbf99b03f8fc19f54",
  measurementId: "G-TJBJ1G6KWD",
};

// Initialize Firebase
if (!firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
}

export const getTimeStampFromISOString = (isoString: string) => {
  return firebase.firestore.Timestamp.fromDate(new Date(isoString));
};

export const getISOStringFromTimeStamp = (
  timestamp: firebase.firestore.Timestamp
) => {
  return timestamp
    ? timestamp.toDate().toISOString()
    : new Date().toISOString();
};

export const getProjects = async () => {
  const projects = await firebaseClient
    .firestore()
    .collection("projects")
    .withConverter(postConverter)
    .get();
  return projects.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as IProject;
  });
};
