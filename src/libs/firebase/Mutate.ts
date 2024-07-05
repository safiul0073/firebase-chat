import { db, storageRef } from "@/libs/firebase/firebase";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { uploadBytes } from "firebase/storage";

export interface RoomTypes {
  is_gorup_chat?: boolean
  name?: string
  participants: number[]
  last_message?: string
  updated_at?: Date
}

export interface MessageTypes {
    type: string // "text" | "image" | "audio" | "video"
    text?: string
    files?: File[]
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

  const uploadMessage: any = {
    type: message.type?? "text",
    text: message.text ?? "",
    sender_id: Number(message.sender_id),
    receiver_id: Number(message.receiver_id),
    room_id: message.room_id,
    file_paths: [], 
    created_at: serverTimestamp()
  }

  if (message.type == "image" && message?.files && !!message.files.length) {
    message.files.forEach((file: any) => {
      uploadBytes(storageRef, file).then((snapshot) => {
        uploadMessage.filePaths.push(snapshot.ref.fullPath)
      })
    })
  }

  await addDoc(collection(db, "messages"), {
    ...uploadMessage
  })
};

export { createRoom, createMessage }