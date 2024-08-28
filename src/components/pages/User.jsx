import React from "react";
import { Tabs } from "antd";
import UserCreateion from "../modules/UserCreateion";
import ProjectCreation from "../modules/ProjectCreation";
import MasterData from "../modules/MasterData";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "User Details",
    children: (
      <>
        <UserCreateion />
      </>
    ),
  },
  {
    key: "2",
    label: "Client & Project",
    children: (
      <>
        <ProjectCreation />
      </>
    ),
  },
  {
    key: "3",
    label: "Master Data",
    children: (
      <>
        <MasterData />
      </>
    ),
  },
];
const User = () => (
  <div className="mt-5">
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </div>
);
export default User;
