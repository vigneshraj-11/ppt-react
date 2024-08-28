import React, { useState } from "react";
import DynamicFormModal from "../../UIComponents/DynamicModal";
import DynamicDataGrid from "../../UIComponents/DynamicDataGrid";

const data = [
  {
    key: "1",
    roleId: "R001",
    roleName: "role1",
    roleDes: "sample",
  },
  {
    key: "2",
    roleId: "R002",
    roleName: "role2",
    roleDes: "sample",
  },
];

const columns = [
  {
    title: "Role ID",
    dataIndex: "roleId",
    key: "roleId",
  },
  {
    title: "Role Name",
    dataIndex: "roleName",
    key: "roleName",
  },
  {
    title: "Description",
    dataIndex: "roleDes",
    key: "roleDes",
  },
];

const RoleDetails = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const formFields = [
    {
      type: "input",
      name: "roleName",
      label: "Role Name",
      placeholder: "Enter Role name",
      rules: [{ required: true, message: "Please enter role name" }],
    },
    {
      type: "input",
      name: "roleDes",
      label: "Role Description",
      placeholder: "Enter Role Description",
      rules: [{ required: true, message: "Please enter role description" }],
    },
  ];

  const handleAddNew = () => {
    setModalVisible(true);
  };

  return (
    <div>
      <DynamicFormModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        formFields={formFields}
        title="Role Creation"
      />
      <DynamicDataGrid
        columns={columns}
        data={data}
        buttons={[{ title: "Add New", onClick: handleAddNew, type: "primary" }]}
      />
    </div>
  );
};

export default RoleDetails;
