import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  // тут базовий baseUrl бекенда
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2' }),
  endpoints: builder => ({
    // builder це функція яка будує функцію getPokemonByName с get запитом
    // яка повертає 'https://pokeapi.co/api/v2/pokemon/${name}' 
    getPokemonByName: builder.query({
      query: name => `/pokemon/${name}`,
    }),
  }),
});
// далі експортуемо зарезирвований хук   useGetPokemonByNameQuery
export const { useGetPokemonByNameQuery } = pokemonApi;
