import { firebaseConfig } from "@/configs/firebaseConfig";
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { collection, getFirestore } from "firebase/firestore";
// initialization
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const roomsCollection = collection(db, 'rooms');

const messagesCollection = (roomId: string) => collection(db, `rooms/${roomId}/messages`);

export {  db, roomsCollection, messagesCollection }

