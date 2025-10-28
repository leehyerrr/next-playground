"use client";

import { useEffect, useState } from "react";

function RouteHandler() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`/api/users?name=${"Bob"}`)
      .then((res) => res.json())
      .then((data) => setUsers(data.user));
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
