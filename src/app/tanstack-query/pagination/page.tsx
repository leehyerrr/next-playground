"use client";

import {
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

const fetchProjects = async (
  page = 0
): Promise<{
  projects: Array<{ name: string; id: number }>;
  hasMore: boolean;
}> => {
  const response = await fetch(`/api/tanstack/pagination?page=${page}`);
  return await response.json();
};

function Example() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);

  const { status, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["projects", page],
    queryFn: () => fetchProjects(page),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  // Prefetch the next page!
  useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["projects", page + 1],
        queryFn: () => fetchProjects(page + 1),
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);

  return (
    <div>
      <p>content</p>
      {status === "pending" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>Error: {error.message}</div>
      ) : (
        // `data` will either resolve to the latest page's data
        // or if fetching a new page, the last successful page's data
        <div>
          {data.projects.map((project) => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <div>Current Page: {page + 1}</div>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          setPage((old) => (data?.hasMore ? old + 1 : old));
        }}
        disabled={isPlaceholderData || !data?.hasMore}
      >
        Next Page
      </button>
      {
        // Since the last page's data potentially sticks around between page requests,
        // we can use `isFetching` to show a background loading
        // indicator since our `status === 'pending'` state won't be triggered
        isFetching ? <span> Loading...</span> : null
      }{" "}
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </div>
  );
}
