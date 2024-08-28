import React, { useState } from "react";
import DynamicFormModal from "../../UIComponents/DynamicModal";
import DynamicDataGrid from "../../UIComponents/DynamicDataGrid";

const data = [
  {
    key: "1",
    clientId: "C001",
    clientName: "Client 1",
    clientEmail: "client1@example.com",
    clientPhone: "123-456-7890",
    clientAddress: "123 Main St, City, Country",
  },
  {
    key: "2",
    clientId: "C002",
    clientName: "Client 2",
    clientEmail: "client2@example.com",
    clientPhone: "987-654-3210",
    clientAddress: "456 Elm St, City, Country",
  },
];

const columns = [
  {
    title: "Client ID",
    dataIndex: "clientId",
    key: "clientId",
  },
  {
    title: "Client Name",
    dataIndex: "clientName",
    key: "clientName",
  },
  {
    title: "Email",
    dataIndex: "clientEmail",
    key: "clientEmail",
  },
  {
    title: "Phone",
    dataIndex: "clientPhone",
    key: "clientPhone",
  },
  {
    title: "Address",
    dataIndex: "clientAddress",
    key: "clientAddress",
  },
];

const ProjectCreation = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const formFields = [
    {
      type: "input",
      name: "clientId",
      label: "Client ID",
      placeholder: "Enter Client ID",
      rules: [{ required: true, message: "Please enter client ID" }],
    },
    {
      type: "input",
      name: "clientName",
      label: "Client Name",
      placeholder: "Enter Client Name",
      rules: [{ required: true, message: "Please enter client name" }],
    },
    {
      type: "input",
      name: "clientEmail",
      label: "Client Email",
      placeholder: "Enter Client Email",
      rules: [{ required: true, message: "Please enter client email" }],
    },
    {
      type: "input",
      name: "clientPhone",
      label: "Client Phone",
      placeholder: "Enter Client Phone",
      rules: [{ required: true, message: "Please enter client phone" }],
    },
    {
      type: "input",
      name: "clientAddress",
      label: "Client Address",
      placeholder: "Enter Client Address",
      rules: [{ required: true, message: "Please enter client address" }],
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
        title="Client Creation"
      />
      <DynamicDataGrid
        columns={columns}
        data={data}
        buttons={[{ title: "Add New", onClick: handleAddNew, type: "primary" }]}
      />
    </div>
  );
};

export default ProjectCreation;
