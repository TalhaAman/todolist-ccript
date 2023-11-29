import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCmD4zUyGD0JTmcmoSrVsIA4nMDa_NcqCs",
  authDomain: "todo-list-b3f2b.firebaseapp.com",
  projectId: "todo-list-b3f2b",
  storageBucket: "todo-list-b3f2b.appspot.com",
  messagingSenderId: "536130667276",
  appId: "1:536130667276:web:f268780913bf8e5864bf29",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const functions = getFunctions(app);
