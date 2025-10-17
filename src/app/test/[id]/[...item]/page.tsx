"use client";

import { useParams } from "next/navigation";

const Page = ({
  params,
}: {
  params: Promise<{ id: string; item: string[] }>;
}) => {
  console.log(params);
  // const { id, item } = await params;
  const { id, item } = useParams();
  // const xx = useParams();
  // console.log(xx);
  return (
    <>
      <div>id:{id}</div>
      <div>item:{item}</div>
    </>
  );
};

export default Page;
