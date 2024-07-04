"use client";
import React, { useEffect, useState } from "react";
import { ActiveChateUserType, UserType } from "@/types/authTypes";
import { getAllRooms, getRoom } from "@/libs/firebase/query";
interface PropsType {
  setActiveUser: (user: ActiveChateUserType | null) => void;
  authUser: UserType | null;
}
export const Users = ({ setActiveUser, authUser }: PropsType) => {
  const [chats, setChats] = useState<any>([]);
  const [localUsers, setlocalUsers] = useState<any>([]);

  const getAllUsers = async () => {
    if (!authUser) return;
    const res = await getAllRooms(authUser?.id);
    const userResponse = await fetch("/api/user/alluser")
    const users = await userResponse.json()
    const rooms = res.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setlocalUsers(users)
    setChats(rooms);
  };
  useEffect(() => {
    getAllUsers();
  }, [authUser]);
  const [activeLocalUser, setUser] = useState<ActiveChateUserType | null>(null);
  const handleClick = (chat: ActiveChateUserType) => {
    const perticipitent = chat.participants.find((id: number) => id !== authUser?.id);
    const user = localUsers.find((user: UserType) => user.id === perticipitent)
    setActiveUser({
      ...chat,
      user: user
    });
    setUser(chat);
  };
  return (
    <div className="flex flex-col">
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
  );
};
