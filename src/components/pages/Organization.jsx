import React from "react";
import { Tabs } from "antd";
import Peoples from "../modules/Peoples";
import OrganizationChart from "../modules/OrganizationChart";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Peoples",
    children: (
      <>
        <Peoples />
      </>
    ),
  },
];
const Organization = () => (
  <div className="mt-5">
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </div>
);
export default Organization;
