import { db } from "@/libs/firebase";
import React, { useRef, useState } from "react";
import { collection, addDoc } from 'firebase/firestore';
import { useSession } from "next-auth/react";

const MessageForm: React.FC = () => {

  const { data: session } = useSession();
  const [newMessage, setNewMessage] = useState('');
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (newMessage.trim()) {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        email: session?.user?.email,
        name: session?.user?.name,
        timestamp: new Date(),
      });
      setNewMessage('');
    }
  };
  return (
    <section >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
        />

        <button type="submit" disabled={!newMessage}>
          Send
        </button>
      </form>
    </section>
  );
};

export default MessageForm;
