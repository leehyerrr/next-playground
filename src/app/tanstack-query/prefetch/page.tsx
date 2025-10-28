import React from "react";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { pokemonOptions } from "./pokemon";
import { getQueryClient } from "@/app/tanstack-query/prefetch/get-query-client";
import { PokemonInfo } from "./pokemon-info";

export default function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(pokemonOptions);

  return (
    <main>
      <h1>Pokemon Info</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PokemonInfo />
      </HydrationBoundary>
    </main>
  );
}
