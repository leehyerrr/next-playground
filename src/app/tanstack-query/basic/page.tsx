"use client";

import {
  QueryClient,
  useQuery,
  useQueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
// import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type Dispatch, type SetStateAction } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

// const persister = createAsyncStoragePersister({
//   storage: window.localStorage,
// });

type Post = {
  id: number;
  title: string;
  body: string;
};

function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async (): Promise<Array<Post>> => {
      console.log("ttt");
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return await response.json();
    },
    // refetchInterval: 1000, // 1초마다 자동 재요청
  });
}

function Posts({ setPostId }: { setPostId: Dispatch<SetStateAction<number>> }) {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = usePosts();

  return (
    <div>
      <h1 className="text-3xl">Posts</h1>
      <div>
        {status === "pending" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data.map((post) => (
                <p key={post.id}>
                  <a
                    onClick={() => setPostId(post.id)}
                    href="#"
                    style={
                      // We can access the query data here to show bold links for
                      // ones that are cached
                      queryClient.getQueryData(["post", post.id])
                        ? {
                            fontWeight: "bold",
                            color: "green",
                          }
                        : {}
                    }
                  >
                    {post.title}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
}

const getPostById = async (id: number): Promise<Post> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return await response.json();
};

function usePost(postId: number) {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
}

function Post({
  postId,
  setPostId,
}: {
  postId: number;
  setPostId: Dispatch<SetStateAction<number>>;
}) {
  const { status, data, error, isFetching } = usePost(postId);

  return (
    <div>
      <div>
        <a
          onClick={() => setPostId(-1)}
          href="#"
          className="bg-blue-700 p-3 inline-block text-white"
        >
          Back
        </a>
      </div>
      {!postId || status === "pending" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data.title}</h1>
          <div>
            <p>{data.body}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [postId, setPostId] = useState(-1);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <p>내용내용</p>
        {postId > -1 ? (
          <Post postId={postId} setPostId={setPostId} />
        ) : (
          <Posts setPostId={setPostId} />
        )}{" "}
      </QueryClientProvider>
    </>
  );
}
