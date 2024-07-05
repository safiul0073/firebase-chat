import React, { useRef, useState } from "react";
import { ActiveChateUserType, UserType } from "@/types/authTypes";
import { createMessage } from "@/libs/firebase/Mutate";
import { Button, Form, Input, Modal } from "antd";
import Image from "next/image";

interface MessageFormProps {
  activeUser: ActiveChateUserType | null;
  authUser: UserType | null;
}
interface MessageTypes {
  type: string;
  text?: string;
  files?: File[];
}
const MessageForm: React.FC<MessageFormProps> = ({ activeUser, authUser }) => {
  const [message, setMessage] = useState<MessageTypes>({
    type: "text",
    text: "",
    files: [],
  });
  const handleSubmit = () => {
    if ((message.text || message.files?.length) && authUser?.id && activeUser) {
      // Add chats to db
      createMessage({
        type: message.type,
        text: message.text,
        files: message.files,
        sender_id: authUser.id,
        receiver_id: activeUser.user?.id ? activeUser.user?.id : 0,
        room_id: activeUser.id,
      });

      setMessage({
        type: "text",
        text: "",
        files: [],
      });
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    handleSubmit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setMessage({
      type: "text",
      text: "",
      files: [],
    })
    setIsModalOpen(false);
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMessage({
        ...message,
        files: [...Array.from(e.target.files)],
      });
    }
    setIsModalOpen(true);
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <React.Fragment>
      <div className="flex items-center">
        <input
          className="w-full border rounded py-2 px-4 mr-2"
          type="text"
          value={message.text}
          onChange={(e) => setMessage({ ...message, text: e.target.value })}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          Send
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4  ml-2 rounded"
        >
          File
        </button>
        <input
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          ref={fileInputRef}
        />
      </div>
      <Modal
        title="join"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          {message.files?.map((file: File, index: number) => (
            file.type.includes("image") ? (
              <Image key={index} src={URL.createObjectURL(file)} alt="file" width={100} height={100} />
            ): (
              <div key={index}>{file.name}</div>
            )
          ))}
        </div>
        <Input type="text" className="w-full mt-4" placeholder="Message" value={message.text} onChange={(e) => setMessage({ ...message, text: e.target.value })}/>
      </Modal>
    </React.Fragment>
  );
};

export default MessageForm;
