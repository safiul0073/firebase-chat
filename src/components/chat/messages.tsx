import React, { useState, useEffect } from "react";
import { ActiveChateUserType, UserType } from "@/types/authTypes";
import { getMessages } from "@/libs/firebase/query";
import { onSnapshot } from "firebase/firestore";
import { MessageTypes } from "@/types/messageTypes";
import moment from "moment";
import { Image } from "antd";
interface PagePropsTypes {
  activeUser: ActiveChateUserType | null;
  authUser: UserType | null;
}
const MessageList: React.FC<PagePropsTypes> = ({ activeUser, authUser }) => {
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
      setMessages(msgs.reverse());
    });

    return () => unsubscribe();
  };
  useEffect(() => {
    setMessageFromDb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUser, authUser]);

  return (
    <div className="bg-gray-200 flex-1 overflow-y-scroll">
      <div className="px-4 py-2">
        {messages.map((message: any, index: number) => (
          <li key={index} className="flex flex-col gap-2">
            {authUser && activeUser && showMessageSingleMessage(message, authUser, activeUser)}
          </li>
        ))}
      </div>
    </div>
  );
};

export default MessageList;

const showMessageSingleMessage = (
  message: MessageTypes,
  authUser: UserType,
  activeUser: ActiveChateUserType
) => {
  return message.sender_id == authUser.id ? (
    <React.Fragment>
      <div className="flex items-center justify-end">
        <div className="bg-blue-500 text-white rounded-lg p-2 shadow mr-2 max-w-sm">
          {message.text}
        </div>
        <Image
          className="w-8 h-8 rounded-full"
          src="https://picsum.photos/50/50"
          alt="User Avatar"
        />
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className="flex items-center mb-1">
        <Image
          className="w-8 h-8 rounded-full mr-2"
          src="https://picsum.photos/50/50"
          alt="User Avatar"
        />
        <div className="font-medium">{activeUser.name}</div>
      </div>
      <div className="bg-white rounded-lg p-2 shadow mb-2 max-w-sm">
        {message.text}
      </div>
    </React.Fragment>
  );
};
