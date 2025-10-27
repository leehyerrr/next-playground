import { NextResponse } from "next/server";

const DB = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const name = searchParams.get("name") as string;
  return NextResponse.json({
    user: DB.filter((user) => user.name.includes(name)),
  });
}
