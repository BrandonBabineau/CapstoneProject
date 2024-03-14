import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com/",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (registerUser) => ({
        url: "/auth/register",
        method: "POST",
        body: registerUser,
      }),
    }),
    login: builder.mutation({
      query: (loginUser) => ({
        url: "/auth/login",
        method: "POST",
        body: loginUser,
      }),
    }),
    cart: builder.query({
      query: (userId) => ({
        url: `/carts/user/${userId}`,
      }),
    }),
    deleteCart: builder.mutation({
      query: (cartId) => ({
        url: `/carts/${cartId}`,
        method: "DELETE",
      }),
    }),
    getProduct: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
      }),
    }),
  }),
});

// Export the API slice and hooks
export const {
  useRegisterMutation,
  useLoginMutation,
  useCartQuery,
  useDeleteCartMutation,
  useGetProductQuery, 
} = apiSlice;
