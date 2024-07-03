import React, { useState, useEffect } from "react";
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from "@/libs/firebase";

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="">
      <ul>
        {messages.map((message:any) => (
          <li key={message.id}>{message?.user?.name}{message.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
