import React, { useState } from "react";
import { Table, Input, Button, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const DynamicDataGrid = ({ columns, data, buttons }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filtered = data.filter((item) =>
      Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(value)
      )
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Input
            placeholder="Search"
            value={searchText}
            onChange={handleSearch}
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col>
          {buttons &&
            buttons.map((button, index) => (
              <Button
                key={index}
                type={button.type || "default"}
                onClick={button.onClick}
                style={{ marginLeft: 8 }}
              >
                {button.title}
              </Button>
            ))}
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        className="border rounded-sm shadow-sm"
        size="small"
      />
    </div>
  );
};

export default DynamicDataGrid;
