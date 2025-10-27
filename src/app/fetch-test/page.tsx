"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type User = { id: number; name: string };
type ApiResponse = { user: User[] };

function Page() {
  const [response, setResponse] = useState<string>("");

  const searchParams = useSearchParams();
  console.log(searchParams);

  //   useEffect(() => {
  //     const run = async () => {
  //       try {
  //         // forward current page query params to the API
  //         const name = searchParams?.get("name") ?? "";
  //         const query = name ? `?name=${encodeURIComponent(name)}` : "";
  //         // const res = await fetch(`/api/users${query}`);
  //         const res = await fetch(`/api/users?id=2&name=Bob`);
  //         if (!res.ok) {
  //           console.error("fetch /api/users failed:", res.status);
  //           return;
  //         }

  //         const data = (await res.json()) as ApiResponse;
  //         console.log("/api/users ->", data);

  //         const firstUser = data.user?.[0];
  //         if (firstUser) setResponse(firstUser.name);
  //         else setResponse("");
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     };
  //     run();
  //   }, [searchParams]);

  useEffect(() => {
    const run = async () => {
      const res = await fetch(`/api/users?id=2&name=Bob`);

      if (!res.ok) {
        console.error("fetch /api/users failed:", res.status);
        return;
      }

      const data = await res.json();
      const person = data.user?.[0];
      console.log(data);
      setResponse(person.name);
    };
    run();
  }, [searchParams]);

  return <div className="text-white">{response}</div>;
}

export default Page;
