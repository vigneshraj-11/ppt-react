import React, { useState } from "react";
import { Row, Col, Input, Select } from "antd";
import EmployeeCard from "./EmployeeCard"; // Correct path to your EmployeeCard component

const { Option } = Select;

const EmployeeList = ({ title, employees }) => {
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter((employee) => {
    const matchesStatus =
      filterStatus === "" || employee.status === filterStatus;
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCall = (name) => {
    console.log(`Calling ${name}...`);
    const encodedName = encodeURIComponent(name);
    const teamsUrl = `https://teams.microsoft.com/l/chat/0/0?users=${encodedName}`;
    window.open(teamsUrl, "_blank");
  };

  const handleMessage = (name) => {
    console.log(`Calling ${name}...`);
    const encodedName = encodeURIComponent(name);
    const teamsUrl = `https://teams.microsoft.com/l/chat/0/0?users=${encodedName}`;
    window.open(teamsUrl, "");
  };

  return (
    <div>
      <div
        style={{ marginBottom: 16 }}
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-base font-bold">{title}</h2>
        </div>
        <div className="flex space-x-3">
          <Select
            placeholder="Filter by status"
            onChange={(value) => setFilterStatus(value)}
            style={{ width: 200 }}
          >
            <Option value="">All</Option>
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
            <Option value="Leave">Leave</Option>
            <Option value="Out of Office">Out of Office</Option>
          </Select>
          <Input
            placeholder="Search by name or email"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300 }}
          />
        </div>
      </div>
      <div className="h-[600px] overflow-scroll">
        <Row gutter={[16, 16]}>
          {filteredEmployees.map((employee, index) => (
            <Col key={index} span={6}>
              <EmployeeCard
                profilePicture={employee.profilePicture}
                name={employee.name}
                email={employee.email}
                role={employee.role}
                status={employee.status}
                onCall={() => handleCall(employee.email)}
                onMessage={() => handleMessage(employee.email)}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default EmployeeList;
