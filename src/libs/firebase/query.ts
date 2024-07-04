import { collection, addDoc, query, orderBy, onSnapshot, doc, getDoc, getDocs, where, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from "@/libs/firebase/firebase";
import prisma from "@/configs/prisma";
const getRoom = async (roomId: string) => {

    const docRef = doc(db, "rooms", roomId);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
}

const getAllRooms = async (userId: number) => {
    let rooms: any = [];
    const q = query(collection(db, "rooms"), where("participants", "array-contains", Number(userId)));
    console.log("query", q)
    const querySnapshot = await getDocs(q);
    return querySnapshot;
}

const getMessages = async (roomId: string) => {
    return query(collection(db, "messages"), where("room_id", "==", roomId), orderBy("created_at", "desc"));
}


export { getRoom, getAllRooms, getMessages }