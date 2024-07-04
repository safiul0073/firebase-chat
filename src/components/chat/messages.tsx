import React, { useState, useEffect } from "react";
import { ActiveChateUserType, UserType } from "@/types/authTypes";
import { getMessages } from "@/libs/firebase/query";
import { onSnapshot } from "firebase/firestore";
interface MessageTypes {
  activeUser: ActiveChateUserType | null;
  authUser: UserType | null;
}
const MessageList: React.FC<MessageTypes> = ({ activeUser, authUser }) => {
  const [messages, setMessages] = useState<any>([]);
  const setMessageFromDb = async () => {
    if (!activeUser || !authUser) {
      setMessages([]);
      return;
    }
    const messgeRespnse = await getMessages(activeUser.id);

    const unsubscribe = onSnapshot(messgeRespnse, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs.reverse())
    });

    return () => unsubscribe();
  };
  useEffect(() => {
    setMessageFromDb();
  }, [activeUser, authUser]);

  return (
    <div className="h-[calc(100vh-80px)]">
      <ul>
        {messages.map((message: any, index: number) => (
          <li key={index} className="flex flex-col">
            <div className="flex justify-between items-center p-2 border-1">
              <p>{message.text}</p>
              <div className="text-right"> 
                {message.sender_id === authUser?.id ? "You" : activeUser?.name}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
