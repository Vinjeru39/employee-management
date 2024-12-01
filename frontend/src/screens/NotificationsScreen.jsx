import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";

import {
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
} from "../slices/notificationsApiSlice";

const NotificationsScreen = () => {
  const {
    data: notifications,
    isLoading,
    error,
    refetch,
  } = useGetNotificationsQuery();

  const [deleteNotification, { isLoading: loadingDelete }] =
    useDeleteNotificationMutation();

  const handleDismiss = async (id) => {
    try {
      await deleteNotification(id);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const reversedNotifications = notifications
    ? [...notifications].reverse()
    : [];

  return (
    <Container style={{ marginTop: "20px" }}>
      <h3 style={{ marginBottom: "20px" }}>Notifications</h3>
      <Row>
        {reversedNotifications?.length === 0 ? (
          <Col>
            <Card
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9", // Light background for empty notification
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Card.Body style={{ padding: "12px" }}>
                No new notifications
              </Card.Body>
            </Card>
          </Col>
        ) : (
          reversedNotifications?.map((notification, index) => (
            <Col key={index} xs={12} style={{ marginBottom: "10px" }}>
              <Card
                style={{
                  border: "1px solid #ddd", // Lighter grey border
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9", // Light background
                  padding: "10px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", // Subtle shadow
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flexGrow: 1 }}>
                    {/* Notification type and text in the same line */}
                    <span
                      style={{
                        color: "#6c757d",
                        fontSize: "14px",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    >
                      {notification.type}:
                    </span>
                    <span
                      style={{
                        color: "#343a40",
                        fontSize: "16px",
                      }}
                    >
                      {notification.text}
                    </span>
                    {/* Displaying the createdAt timestamp */}
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#6c757d",
                        marginTop: "4px",
                      }}
                    >
                      {formatDate(notification.createdAt)}
                    </div>
                  </div>
                  {/* Dismiss button */}
                  <FaTimesCircle
                    size={18}
                    onClick={() => handleDismiss(notification._id)}
                    style={{
                      color: "#007bff", // Blue color for dismiss button
                      cursor: "pointer",
                    }}
                  />
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default NotificationsScreen;
