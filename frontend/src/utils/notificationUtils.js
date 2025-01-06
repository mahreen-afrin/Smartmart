// src/utils/notificationUtils.js
import { useFetchNotificationsQuery, useMarkAsReadMutation } from "../api/notificationApiSlice";

// Get notifications (using the query from notificationApiSlice)
export const getNotifications = () => {
  const { data: notifications, error, isLoading } = useFetchNotificationsQuery();
  
  if (isLoading) {
    console.log("Loading notifications...");
  }

  if (error) {
    console.error("Error fetching notifications:", error);
  }

  return notifications || [];
};

// Mark notification as read (using the mutation from notificationApiSlice)
export const markNotificationAsRead = async (notificationId) => {
  const [markAsRead] = useMarkAsReadMutation();

  try {
    const success = await markAsRead(notificationId).unwrap();
    if (success) {
      return true;
    } else {
      console.error("Failed to mark notification as read");
      return false;
    }
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return false;
  }
};
