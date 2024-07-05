import { firebaseConfig } from "@/configs/firebaseConfig";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
// initialization
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage();
const storageRef = ref(storage, 'some-child');

export {  db, storageRef }

