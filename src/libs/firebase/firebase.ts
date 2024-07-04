import { firebaseConfig } from "@/configs/firebaseConfig";
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { collection, getFirestore } from "firebase/firestore";
// initialization
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {  db }

