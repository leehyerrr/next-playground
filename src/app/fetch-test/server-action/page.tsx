"use client";

import searchUsers from "@/app/actions/user-action";
import { useEffect, useState } from "react";

type User = { id: number; name: string };

function ServerAction() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    searchUsers("Bob")
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("searchUsers failed:", err);
        setUsers([]);
      });
  }, []);

  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default ServerAction;
