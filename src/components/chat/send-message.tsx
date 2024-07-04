import React, { useRef, useState } from "react";
import { ActiveChateUserType, UserType } from "@/types/authTypes";
import { createMessage } from "@/libs/firebase/Mutate";
import { Button, Form, Input } from "antd";

interface MessageFormProps {
  activeUser: ActiveChateUserType | null;
  authUser: UserType | null;
}
const MessageForm: React.FC<MessageFormProps> = ({ activeUser , authUser }) => {
  const handleSubmit = async (values: any) => {
    if (values.message.trim() && authUser && activeUser) {
      // Add chats to db
      if (activeUser.is_gorup_chat) return alert("This is a group chat");
      createMessage({
        type: "text",
        text: values.message,
        sender_id: authUser.id,
        receiver_id: activeUser.user?.id ? activeUser.user?.id : 0,
        room_id: activeUser.id
       })

      values.message = "";
    }
  };
  return (
    <section>
      {activeUser && (
        <Form onFinish={handleSubmit} className="flex">
          <Form.Item
              name="message"
              className="w-[500px"
              rules={[{ required: false, message: "Please input your name!" }]}
          >
            <Input
              type="text"
              placeholder="Type your message here..."
            />
          </Form.Item>

          <Button htmlType="submit">
            Send
          </Button>
        </Form>
      )}
    </section>
  );
};

export default MessageForm;
