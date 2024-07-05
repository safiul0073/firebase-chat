/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { ActiveChateUserType, UserType } from "@/types/authTypes";
import { getAllRooms, getRoom } from "@/libs/firebase/query";
import { Button, Input, Modal, SelectProps } from "antd";
import { createRoom } from "@/libs/firebase/Mutate";
import { Select } from "antd";
interface PropsType {
  setActiveUser: (user: ActiveChateUserType | null) => void;
  authUser: UserType | null;
}
export const Users = ({ setActiveUser, authUser }: PropsType) => {
  const [chats, setChats] = useState<any>([]);
  const [localUsers, setlocalUsers] = useState<any>([]);

  const getAllUsers = async () => {
    if (!authUser?.id) return;
    const res = await getAllRooms(authUser?.id);
    const userResponse = await fetch("/api/user/alluser");
    const users = await userResponse.json();
    const rooms = res.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setlocalUsers(users);
    setChats(rooms);
  };
  useEffect(() => {
    getAllUsers();
  }, [authUser]);

  const [activeLocalUser, setUser] = useState<ActiveChateUserType | null>(null);
  const handleClick = (chat: ActiveChateUserType) => {
    const perticipitent = chat.participants.find(
      (id: number) => id !== authUser?.id
    );
    const user = localUsers.find((user: UserType) => user.id === perticipitent);
    setActiveUser({
      ...chat,
      user: user,
    });
    setUser(chat);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupCreate, setGroupCreate] = useState<any>({
    is_gorup_chat: false,
    users: [],
    name: "",
  });
  const showModal = () => {
    setIsModalOpen(true);
    setGroupCreate({
      ...groupCreate,
      is_gorup_chat: false,
    });
  };
  const [userEmail, setUserEmail] = useState("");
  const handleOk = async () => {
    if (groupCreate.is_gorup_chat) {
      await createRoom({
        name: groupCreate.name,
        participants: groupCreate.users,
        is_gorup_chat: groupCreate.is_gorup_chat,
      });
      await getAllUsers();
      setIsModalOpen(false);
      return
    }
    const user = localUsers.find((user: UserType) => user.email === userEmail);
    if (!user) return;
    await createRoom({
      name: user.name,
      participants: groupCreate.is_gorup_chat
        ? groupCreate.users
        : [Number(authUser?.id), Number(user.id)],
      is_gorup_chat: groupCreate.is_gorup_chat,
    });
    await getAllUsers();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showUserModal = () => {
    setIsModalOpen(true);
    setGroupCreate({
      ...groupCreate,
      is_gorup_chat: true,
    });
  };

  const options: SelectProps["options"] = localUsers.map((user: UserType) => ({
    label: user.name,
    value: user.id,
  }));

  const handleChange = (value: string[]) => {
    setGroupCreate({
      ...groupCreate,
      users: value.map((id: string) => Number(id)),
    });
  };
  return (
    <React.Fragment>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Button type="primary" onClick={showModal}>
            Join User
          </Button>
          <Button type="primary" onClick={showUserModal}>
            Create Group
          </Button>
        </div>
        <div className="flex flex-col border-2 border-gray-400 shadow">
          {chats.map((user: any) => (
            <div
              onClick={() => handleClick(user)}
              key={user.id}
              className={`cursor-pointer p-2 hover:bg-gray-100 ${
                activeLocalUser?.id === user?.id ? "bg-gray-100" : ""
              }`}
            >
              {user.name}
            </div>
          ))}
        </div>
      </div>
      <Modal
        title="join"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {!groupCreate.is_gorup_chat ? (
          <Input
            type="text"
            placeholder="email for join"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
          />
        ) : (
          <div className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Enter Group Name"
              onChange={(e) =>
                setGroupCreate({ ...groupCreate, name: e.target.value })
              }
              value={groupCreate.name}
            />
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={handleChange}
              options={options}
            />
          </div>
        )}
      </Modal>
    </React.Fragment>
  );
};
