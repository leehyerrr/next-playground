"use client";

import { useEffect, useState } from "react";

type User = { id: number; name: string };

function RouteHandler() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(`/api/users?name=${"Bob"}`)
      .then((res) => {
        if (!res.ok) throw new Error(`status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const list = data?.user ?? data?.users ?? [];
        setUsers(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        console.error("fetch /api/users failed:", err);
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

export default RouteHandler;
