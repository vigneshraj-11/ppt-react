import React from "react";
import { Card, Button, Avatar, Row, Col, Badge } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { LuPhoneCall } from "react-icons/lu";

const statusColors = {
  Active: "green",
  Inactive: "yellow",
  Leave: "red",
  "Out of Office": "blue",
};

const EmployeeCard = ({
  profilePicture,
  name,
  email,
  role,
  status,
  onCall,
  onMessage,
}) => {
  return (
    <Card style={{ width: 280, marginBottom: 5 }}>
      <Row align="middle">
        <Col span={9}>
          <Badge
            dot
            color={statusColors[status]}
            style={{ position: "absolute", right: 0, top: 0 }}
          >
            <Avatar size={64} src={profilePicture} />
          </Badge>
        </Col>
        <Col
          span={15}
          style={{ fontSize: "12px" }}
          className="font-semibold text-gray-500"
        >
          <h3>{name}</h3>
          <p>{email}</p>
          <p>{role}</p>
        </Col>
      </Row>
      <Row justify="space-between" style={{ marginTop: 16 }}>
        <Col>
          <Button type="primary" icon={<LuPhoneCall />} onClick={onCall}>
            Phone
          </Button>
        </Col>
        <Col>
          <Button type="default" icon={<MessageOutlined />} onClick={onMessage}>
            Message
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default EmployeeCard;
