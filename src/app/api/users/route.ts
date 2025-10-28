import { NextResponse } from "next/server";

const DB = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Sam" },
  { id: 4, name: "Bob two" },
];

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const name = searchParams.get("name") as string;
  return NextResponse.json({
    user: DB.filter((user) => user.name.includes(name)),
  });
}
