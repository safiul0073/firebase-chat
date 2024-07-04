"use client"
import { signOut, useSession } from "next-auth/react"
import Chat from "@/components/chat/index"
import { Button } from "antd";
export default function Home() {
  const { data: session, status, update } = useSession()
  
  return (
    <div>
      <div className="w-full h-16 bg-gray-100 flex justify-between items-center px-12">
        <h1 className="text-3xl text-center">{session?.user?.name}</h1>
        <Button onClick={() => signOut()}>Logout</Button>
      </div>
      <Chat />
    </div>
  );
}
