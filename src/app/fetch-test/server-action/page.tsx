"use client";

import searchUsers from "@/app/actions/user-action";
import { useEffect, useState } from "react";

function ServerAction() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    searchUsers("Bob").then((data) => setUsers(data));
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
