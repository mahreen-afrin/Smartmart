// src/slices/notificationApiSlice.js
import { apiSlice } from "./apiSlice";  // Assuming you're using a centralized apiSlice

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new notification
    createNotification: builder.mutation({
      query: (notificationData) => ({
        url: '/api/notifications',
        method: 'POST',
        body: notificationData,
      }),
    }),

    // Fetch all notifications
    fetchNotifications: builder.query({
      query: () => '/api/notifications', // Assuming endpoint to get all notifications
    }),

    // Mark notification as read
    markAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `/api/notifications/${notificationId}/read`,
        method: 'PUT',
      }),
    }),

    // Delete a notification
    deleteNotification: builder.mutation({
      query: (notificationId) => ({
        url: `/api/notifications/${notificationId}`,
        method: 'DELETE',
      }),
    }),

    // Mark all notifications as read
    markAllAsRead: builder.mutation({
      query: () => ({
        url: '/api/notifications/mark-all-read',
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useFetchNotificationsQuery,
  useMarkAsReadMutation,
  useDeleteNotificationMutation,
  useMarkAllAsReadMutation,
} = notificationApiSlice;
