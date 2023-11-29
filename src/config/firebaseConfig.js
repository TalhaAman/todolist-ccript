import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_ID,
  apiKey: "AIzaSyCmD4zUyGD0JTmcmoSrVsIA4nMDa_NcqCs",
  authDomain: "todo-list-b3f2b.firebaseapp.com",
  projectId: "todo-list-b3f2b",
  storageBucket: "todo-list-b3f2b.appspot.com",
  messagingSenderId: "536130667276",
  appId: "1:536130667276:web:f268780913bf8e5864bf29",
};
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
