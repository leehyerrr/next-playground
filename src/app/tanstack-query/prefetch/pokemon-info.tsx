"use client";

import React from "react";
import Image from "next/image";
import { useSuspenseQuery } from "@tanstack/react-query";
import { pokemonOptions } from "./pokemon";

export function PokemonInfo() {
  const { data } = useSuspenseQuery(pokemonOptions);

  return (
    <div>
      <figure>
        <Image
          src={data.sprites.front_shiny}
          width={200}
          height={200}
          alt={data.name}
        />
        <h2>I&apos;m {data.name}</h2>
      </figure>
    </div>
  );
}
