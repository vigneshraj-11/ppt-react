import React, { useState } from "react";
import DynamicFormModal from "../../UIComponents/DynamicModal";
import DynamicDataGrid from "../../UIComponents/DynamicDataGrid";

const data = [
  {
    key: "1",
    departmentId: "D001",
    departmentName: "HR",
    departmentDescription: "Human Resources",
  },
  {
    key: "2",
    departmentId: "D002",
    departmentName: "IT",
    departmentDescription: "Information Technology",
  },
];

const columns = [
  {
    title: "Department ID",
    dataIndex: "departmentId",
    key: "departmentId",
  },
  {
    title: "Department Name",
    dataIndex: "departmentName",
    key: "departmentName",
  },
  {
    title: "Description",
    dataIndex: "departmentDescription",
    key: "departmentDescription",
  },
];

const DepartmentDetails = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const formFields = [
    {
      type: "input",
      name: "departmentId",
      label: "Department ID",
      placeholder: "Enter Department ID",
      rules: [{ required: true, message: "Please enter department ID" }],
    },
    {
      type: "input",
      name: "departmentName",
      label: "Department Name",
      placeholder: "Enter Department Name",
      rules: [{ required: true, message: "Please enter department name" }],
    },
    {
      type: "input",
      name: "departmentDescription",
      label: "Department Description",
      placeholder: "Enter Department Description",
      rules: [
        { required: true, message: "Please enter department description" },
      ],
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
        title="Department Creation"
      />
      <DynamicDataGrid
        columns={columns}
        data={data}
        buttons={[{ title: "Add New", onClick: handleAddNew, type: "primary" }]}
      />
    </div>
  );
};

export default DepartmentDetails;
