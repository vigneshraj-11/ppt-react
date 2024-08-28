import React, { useState } from "react";
import { Tree, Card, Avatar } from "antd";

const sampleData = [
  {
    title: "CEO",
    key: "0-0",
    name: "John Doe",
    designation: "CEO",
    details: "Leading the company",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    children: [
      {
        title: "CTO",
        key: "0-0-0",
        name: "Jane Smith",
        designation: "CTO",
        details: "Oversees technology",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        children: [
          {
            title: "Dev Manager",
            key: "0-0-0-0",
            name: "Alice Johnson",
            designation: "Development Manager",
            details: "Manages development team",
            avatar: "https://randomuser.me/api/portraits/women/3.jpg",
          },
          {
            title: "QA Manager",
            key: "0-0-0-1",
            name: "Bob Brown",
            designation: "QA Manager",
            details: "Manages QA team",
            avatar: "https://randomuser.me/api/portraits/men/4.jpg",
          },
        ],
      },
      {
        title: "CFO",
        key: "0-0-1",
        name: "Michael Green",
        designation: "CFO",
        details: "Manages finances",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        children: [
          {
            title: "Accountant",
            key: "0-0-1-0",
            name: "Nancy White",
            designation: "Accountant",
            details: "Handles accounts",
            avatar: "https://randomuser.me/api/portraits/women/6.jpg",
          },
        ],
      },
    ],
  },
];

const OrganizationChart = () => {
  const [gData, setGData] = useState(sampleData);
  const [expandedKeys] = useState(["0-0", "0-0-0", "0-0-0-0"]);

  const onDragEnter = (info) => {
    console.log(info);
  };

  const onDrop = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...gData];

    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar = [];
      let i;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setGData(data);
  };

  const renderTreeNodes = (data) =>
    data.map((item) => {
      const title = (
        <Card style={{ width: 300, height: 100 }} key={item.key}>
          <Card.Meta
            avatar={
              <Avatar src={item.avatar} style={{ width: 60, height: 60 }} />
            }
            title={item.name}
            description={
              <>
                <span>
                  {item.designation}, {item.details}
                </span>
              </>
            }
            style={{ fontSize: 12 }}
          />
        </Card>
      );

      if (item.children) {
        return (
          <Tree.TreeNode title={title} key={item.key}>
            {renderTreeNodes(item.children)}
          </Tree.TreeNode>
        );
      }
      return <Tree.TreeNode title={title} key={item.key} />;
    });

  return (
    <>
      <Tree
        className="draggable-tree"
        defaultExpandedKeys={expandedKeys}
        draggable
        blockNode
        onDragEnter={onDragEnter}
        onDrop={onDrop}
      >
        {renderTreeNodes(gData)}
      </Tree>
    </>
  );
};

export default OrganizationChart;
