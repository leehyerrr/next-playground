const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q: string; a: string }>;
}) => {
  console.log(params);
  const { id } = await params;
  const { q, a } = await searchParams;
  return (
    <div>
      id:{id}
      <br />
      searchparams:{q},{a}
    </div>
  );
};

export default Page;
