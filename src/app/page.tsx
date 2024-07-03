"use client"
import { useSession } from "next-auth/react"
import Chat from "@/components/Chat/index"
export default function Home() {
  const { data: session, status, update } = useSession()
  
  return (
    <div>
      <Chat />
    </div>
  );
}
