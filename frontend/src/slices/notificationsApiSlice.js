import { NOTIFICATIONS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: NOTIFICATIONS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getNotificationDetails: builder.query({
      query: (id) => ({
        url: `${NOTIFICATIONS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createNotification: builder.mutation({
      query: (data) => ({
        url: `${NOTIFICATIONS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Notification"],
    }),

    deleteNotification: builder.mutation({
      query: (notificationId) => ({
        url: `${NOTIFICATIONS_URL}/${notificationId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetNotificationDetailsQuery,
  useCreateNotificationMutation,
  useDeleteNotificationMutation,
} = notificationsApiSlice;
