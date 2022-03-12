import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyDazZx9w_yzTQxQVhvQdhDgZBpoZLdcMdE",
  authDomain: "crwn-db-806da.firebaseapp.com",
  projectId: "crwn-db-806da",
  storageBucket: "crwn-db-806da.appspot.com",
  messagingSenderId: "1098681427856",
  appId: "1:1098681427856:web:38efc36262ea029fa27515",
  measurementId: "G-LKYCG8QBD6"
};

export const createUserProfileDocument = async (userAuth, additonalData)=>{
if(!userAuth) return;
const userRef = firestore.doc(`users/${userAuth.uid}`);
const snapShot = await userRef.get();
// console.log(snapShot);

if(!snapShot.exists){
  const {displayName, email} = userAuth;
  const createdAt = new Date();

  try{
    userRef.set({
      displayName,
      email,
      createdAt,
      ...additonalData
    })
    }catch(error){
      console.log("Error in creating user", error.message); 
  }
}
return userRef;
}

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

  export default firebase;