import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const firebaseService = {
  getDocuments: async (collectionName) => {
    try {
      const response = await getDocs(collection(db, collectionName));
      const data = response.docs.map((doc) => doc.data());
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
  addDocument: async (collectionName, data) => {
    try {
      const colRef = collection(db, collectionName);
      const docRef = doc(colRef);
      const newData = { ...data, id: docRef.id };
      await setDoc(docRef, newData);
      return newData;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },
  updateDocument: async (collectionName, id, data) => {
    try {
      return await updateDoc(doc(db, collectionName, id), data);
    } catch (err) {
      throw new Error(err.message);
    }
  },
  deleteDocument: async (collectionName, id) => {
    try {
      return await deleteDoc(doc(db, collectionName, id));
    } catch (error) {
      console.log(error);
    }
  },
};

export default firebaseService;
