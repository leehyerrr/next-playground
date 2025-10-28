import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "0", 10);

  const pageSize = 10;

  const projects = Array(pageSize)
    .fill(0)
    .map((_, i) => {
      const id = page * pageSize + (i + 1);
      return {
        name: "Project " + id,
        id,
      };
    });

  // 1초 대기 (비동기 예시)
  await new Promise((r) => setTimeout(r, 1000));

  return NextResponse.json({
    projects,
    hasMore: page < 9,
  });
}
