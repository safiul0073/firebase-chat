"use client";
import React, { useState } from "react";
import MessageList from "./messages";
import MessageForm from "./send-message";
import { Users } from "./Users";
import { ActiveChateUserType, UserType } from "@/types/authTypes";
import { useSession } from "next-auth/react";
const Index = () => {
  const [activeUser, setActiveUser] = useState<ActiveChateUserType | null>(null);
  const { data: session } = useSession();
  return session?.user && (
    <div className="flex flex-row gap-2 p-12 h-screen">
      <div className="w-1/4">
        <Users setActiveUser={setActiveUser} authUser={session.user} />
      </div>
      <div className="w-3/4 flex flex-col border-1 border-gray-200">
        <MessageList authUser={session.user} activeUser={activeUser} />
        <MessageForm activeUser={activeUser} authUser={session.user} />
      </div>
    </div>
  );
};

export default Index;
