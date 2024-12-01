//simple createSlice is for no-apis
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//fetchBaseQuery is the function that will allow us to make requests to our backend api
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Request", "User", "Notification"],
  endpoints: (builder) => ({}),
});
