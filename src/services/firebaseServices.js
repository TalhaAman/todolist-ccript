import {
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  where,
  query,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
// import {
//   createUserWithEmailAndPassword,
//   signOut,
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
//   reauthenticateWithCredential,
//   reauthenticateWithPopup,
//   EmailAuthProvider,
//   deleteUser,
// } from "firebase/auth";
// import { COLLECTIONS_NAMES } from "../constants/firebase.constants";

// const { USERS } = COLLECTIONS_NAMES;

const firebaseService = {
  // signIn: async (email, password) => {
  //   try {
  //     return await signInWithEmailAndPassword(auth, email, password);
  //   } catch (err) {
  //     let { message } = err;
  //     if (
  //       message == "Firebase: Error (auth/user-not-found)." ||
  //       message == "Firebase: Error (auth/wrong-password)."
  //     ) {
  //       message = "Invalid Email or Password";
  //     } else {
  //       message = "Something went wrong. Try again!.";
  //     }
  //     throw new Error(message);
  //   }
  // },
  // googleSignIn: async () => {
  //   try {
  //     const googleAuthProvider = new GoogleAuthProvider();
  //     return await signInWithPopup(auth, googleAuthProvider)
  //       .then((result) => {
  //         // This gives you a Google Access Token. You can use it to access the Google API.
  //         const credential = GoogleAuthProvider.credentialFromResult(result);
  //         const token = credential.accessToken;

  //         // The signed-in user info.
  //         return result.user;

  //         // IdP data available using getAdditionalUserInfo(result)
  //         // ...
  //       })
  //       .catch((error) => {
  //         // Handle Errors here.
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         // The email of the user's account used.
  //         const email = error.customData.email;
  //         // The AuthCredential type that was used.
  //         const credential = GoogleAuthProvider.credentialFromError(error);
  //         // ...
  //       });
  //   } catch (error) {}
  // },

  // signUp: async (email, password) => {
  //   try {
  //     return await createUserWithEmailAndPassword(auth, email, password);
  //   } catch (err) {
  //     let { message } = err;
  //     if (
  //       message == "Firebase: Error (auth/user-not-found)." ||
  //       message == "Firebase: Error (auth/wrong-password)."
  //     ) {
  //       message = "Invalid Email or Password";
  //     }
  //     if (message == "Firebase: Error (auth/email-already-in-use).") {
  //       message = "Email already exists.";
  //     }
  //     throw new Error(message);
  //   }
  // },
  // logout: async () => {
  //   try {
  //     return await signOut(auth);
  //   } catch (err) {
  //     throw new Error(err.message);
  //   }
  // },

  // getDocumentById: async (collectionName, id) => {
  //   const response = await getDoc(doc(db, collectionName, id));
  //   return response.data();
  // },
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
  // addDocumentWithCustomId: async (collectionName, customId, data) => {
  //   try {
  //     return await setDoc(doc(db, collectionName, customId), data);
  //   } catch (err) {
  //     throw new Error(err.message);
  //   }
  // },
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
  // deleteAccount: async (user, data) => {
  //   try {
  //     const credential = EmailAuthProvider.credential(
  //       user.email,
  //       data.password
  //     );
  //     await reauthenticateWithCredential(user, credential).then(() => {
  //       // User re-authenticated.
  //       // Code...
  //       return deleteUser(user);
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //     throw new Error(error.message);
  //   }
  // },
  // deleteGoogleAccount: async (user) => {
  //   try {
  //     const credential = GoogleAuthProvider.credentialFromResult(user);
  //     await reauthenticateWithPopup(user, credential).then(() => {
  //       return deleteUser(user);
  //     });
  //     // User re-authenticated with Google credential.
  //     // Code...
  //   } catch (error) {
  //     console.log(error.message);
  //     throw new Error(error.message);
  //   }
  // },

  // queryDocs: async (collectionName, key, operator, value) => {
  //   try {
  //     const colRef = collection(db, collectionName);
  //     const q = query(colRef, where(key, operator, value));
  //     // execute query
  //     const response = await getDocs(q);
  //     const data = response.docs.map((doc) => doc.data());
  //     return data;
  //   } catch (err) {
  //     console.log(err);
  //     throw new Error(err.message);
  //   }
  // },

  // queryDocuments: async (collectionName, key, operator, value) => {
  //   try {
  //     const colRef = collection(db, collectionName);
  //     const q = query(colRef, where(key, "==", operator));
  //     // execute query
  //     const response = await getDocs(q);
  //     const data = response.docs.map((doc) => doc.data());
  //     return data;
  //   } catch (err) {
  //     console.log(err);
  //     throw new Error(err.message);
  //   }
  // },
  // queryDocumentInArray: async (collectionName, key, operator, value) => {
  //   try {
  //     const colRef = collection(db, collectionName);
  //     const q = query(colRef, where(key, "array-contains", operator));
  //     // execute query
  //     console.log("q", q);
  //     const response = await getDocs(q);
  //     console.log("response", response);
  //     const data = response.docs.map((doc) => doc.data());
  //     console.log("data", data);
  //     return data;
  //   } catch (err) {
  //     console.log(err);
  //     throw new Error(err.message);
  //   }
  // },
  // addDocumentWithNestedCollection: async (
  //   collectionName,
  //   subCollectionName,
  //   userID,
  //   eventData
  // ) => {
  //   try {
  //     const calAppColRef = collection(
  //       db,
  //       collectionName,
  //       userID,
  //       subCollectionName
  //     );
  //     const calAppRef = doc(calAppColRef);
  //     return await setDoc(calAppRef, eventData);
  //   } catch (err) {
  //     console.log(err.message);
  //     throw new Error(err.message);
  //   }
  // },
  // getdocumentsWithNestedCollection: async (
  //   collectionName,
  //   userId,
  //   subCollectionName
  // ) => {
  //   try {
  //     const response = await getDocs(
  //       collection(db, collectionName, userId, subCollectionName)
  //     );
  //     const data = response.docs.map((doc) => doc.data());
  //     return data;
  //   } catch (err) {
  //     throw new Error(err.message);
  //   }
  // },
};

export default firebaseService;
