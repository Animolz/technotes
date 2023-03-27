import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      keepUnusedDataFor: 5,
      transformResponse: (resData) => {
        const loadedUsers = resData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, resData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),

    addUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    updateUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: (result, error, arg) => [
        {
          type: "User",
          id: arg.id,
        },
      ],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: "/users",
        method: "DELETE",
        body: {
          id,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        {
          type: "User",
          id: arg.id,
        },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

// Return query result
export const selectUserResult = usersApiSlice.endpoints.getUsers.select();

// Creates memoized selector
export const selectUserData = createSelector(
  selectUserResult,
  (usersResult) => usersResult.data
);

// getSelector creates selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds,
} = usersAdapter.getSelectors((state) => selectUserData(state) ?? initialState);
