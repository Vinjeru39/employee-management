import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Tooltip, OverlayTrigger, Badge } from "react-bootstrap";
import { useGetNotificationsQuery } from "../slices/notificationsApiSlice";

import { IoIosNotifications } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function TriggerRendererProp() {
  const { data: notifications, isLoading, error } = useGetNotificationsQuery();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/notifications");
  };

  const slicedNotifications = notifications?.slice(-3);
  const reversedNotifications = slicedNotifications
    ? [...slicedNotifications].reverse()
    : [];

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={
        <Tooltip id="button-tooltip-2" className="custom-tooltip">
          <div style={{ textAlign: "left" }}>
            <h6 className="mb-2">Top Notifications</h6>
            {reversedNotifications?.length > 0 ? (
              reversedNotifications.map((notification, index) => (
                <div
                  key={index}
                  style={{ padding: "8px 0", borderBottom: "1px solid #ccc" }}
                >
                  <p style={{ fontWeight: "bold", marginBottom: "3px" }}>
                    Category: {notification.type}
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "#ddd" }}>
                    {notification.text}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ fontStyle: "italic", color: "#ddd" }}>
                No new notifications
              </p>
            )}
          </div>
        </Tooltip>
      }
    >
      {({ ref, ...triggerHandler }) => (
        <Button
          variant="dark"
          style={{ position: "relative" }}
          {...triggerHandler}
          className="d-inline-flex align-items-center"
          onClick={handleClick}
        >
          <IoIosNotifications size={24} style={{ color: "white" }} />

          <Badge
            ref={ref}
            bg="danger"
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              borderRadius: "50%",
            }}
          >
            {notifications?.length}
          </Badge>
        </Button>
      )}
    </OverlayTrigger>
  );
}

export default TriggerRendererProp;
