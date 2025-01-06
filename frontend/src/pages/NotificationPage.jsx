// src/pages/NotificationPage.jsx
import React, { useEffect } from "react";
import { useFetchNotificationsQuery, useMarkAsReadMutation } from "../slices/notificationApiSlice";

const NotificationPage = () => {
  const { data: notifications = [], isLoading, isError } = useFetchNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation();

  useEffect(() => {
    // You can handle any additional logic here, like a toast notification for success
  }, [notifications]);

  const handleMarkAsRead = async (id) => {
    const success = await markAsRead(id).unwrap();
    if (success) {
      // Optionally, you can manage the UI state here if needed
      console.log("Notification marked as read");
    }
  };

  if (isLoading) return <p>Loading notifications...</p>;
  if (isError) return <p>Error fetching notifications!</p>;

  return (
    <div>
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {notifications.map((notif) => (
            <li key={notif._id} style={{ backgroundColor: notif.read ? "lightgray" : "white" }}>
              <span>{notif.message}</span>
              <button onClick={() => handleMarkAsRead(notif._id)}>Mark as Read</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPage;
