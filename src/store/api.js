import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COHORT_CODE = "REPLACE_WITH_CODE";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT_CODE}/`;

// TODO: configure createApi to use API_URL as the base URL
// TODO: add "Puppy" as a tag type.
const api = createApi({
  reducerPath: "puppyBowlApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Puppy"],
  endpoints: (builder) => ({
    getPlayers: builder.query({
      query: () => "players",
      providesTags: ["Puppy"],
    }),
  }),
});

export const { useGetPlayersQuery } = api;
export default api;

