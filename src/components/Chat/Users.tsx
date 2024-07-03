"use client";
import React, { useEffect, useState } from "react";

export const Users = () => {
  const [users, setUsers] = useState<any>([]);
  const getAllUsers = async () => {
    const res = await fetch("/api/user/alluser");
    setUsers(await res.json());
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return <div className="flex flex-col">
    {
      users.map((user: any) => <div key={user.id}>{user.name}</div>)
    }
  </div>;
};
