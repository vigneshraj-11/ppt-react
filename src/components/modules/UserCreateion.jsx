import React, { useState } from "react";
import DynamicFormModal from "../../UIComponents/DynamicModal";
import DynamicDataGrid from "../../UIComponents/DynamicDataGrid";

const data = [
  {
    key: "1",
    userId: "U001",
    firstName: "Vignesh",
    lastName: "Brown",
    shift: "Morning",
    location: "New York",
    officeLocation: "Lake Park",
    reportingTo: "Manager A",
    role: "Developer",
    emailId: "john.brown@example.com",
  },
  {
    key: "2",
    userId: "U002",
    firstName: "Jim",
    lastName: "Green",
    shift: "Evening",
    location: "London",
    officeLocation: "Lake Park",
    reportingTo: "Manager B",
    role: "Designer",
    emailId: "jim.green@example.com",
  },
];

const columns = [
  {
    title: "User ID",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Shift",
    dataIndex: "shift",
    key: "shift",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "Office Location",
    dataIndex: "officeLocation",
    key: "officeLocation",
  },
  {
    title: "Reporting To",
    dataIndex: "reportingTo",
    key: "reportingTo",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Email ID",
    dataIndex: "emailId",
    key: "emailId",
  },
];

const UserCreation = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);

  const formFields = [
    {
      type: "input",
      name: "firstName",
      label: "First Name",
      placeholder: "Enter First name",
      rules: [{ required: true, message: "Please enter first name!" }],
    },
    {
      type: "input",
      name: "lastName",
      label: "Last Name",
      placeholder: "Enter Last Name",
      rules: [{ required: true, message: "Please enter last name!" }],
    },
    {
      type: "input",
      name: "email",
      label: "Email",
      placeholder: "Enter Email ID",
      rules: [{ required: true, message: "Please enter email id!" }],
    },
  ];

  const formFields1 = [
    {
      type: "upload",
      name: "profilePicture",
      label: "Select file to Uplaod",
      action: "/upload",
      rules: [{ required: true, message: "Plaese select file to Uplaod" }],
    },
  ];

  const handleAddNew = () => {
    setModalVisible(true);
  };

  const handleUpload = () => {
    setModalVisible1(true);
  };

  return (
    <div>
      <DynamicFormModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        formFields={formFields}
        title="User Creation"
      />
      <DynamicFormModal
        isVisible={isModalVisible1}
        onClose={() => setModalVisible1(false)}
        formFields={formFields1}
        title="Bluk Upload"
      />
      <DynamicDataGrid
        columns={columns}
        data={data}
        buttons={[
          { title: "Upload", onClick: handleUpload, type: "default" },
          { title: "Add New", onClick: handleAddNew, type: "primary" },
        ]}
      />
    </div>
  );
};

export default UserCreation;
