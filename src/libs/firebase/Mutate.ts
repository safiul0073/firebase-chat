import { db } from "@/libs/firebase/firebase";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface RoomTypes {
  is_gorup_chat?: boolean
  name?: string
  participants: number[]
  last_message?: string
  updated_at?: Date
}

export interface MessageTypes {
    type: string // "text" | "image"
    text: string
    sender_id: number
    receiver_id: number
    room_id: string
    created_at?: Date
}
const createRoom = async (room: RoomTypes) => {
  const conversationRef = await addDoc(collection(db, "rooms"), {
    ...room,
    is_gorup_chat: room.is_gorup_chat ? room.is_gorup_chat : false,
    updatedAt: new Date()
  })
  return conversationRef
};

const createMessage = async (message: MessageTypes) => {
  await addDoc(collection(db, "messages"), {
    ...message,
    created_at: serverTimestamp()
  })
};

export { createRoom, createMessage }