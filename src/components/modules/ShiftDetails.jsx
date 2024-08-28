import React, { useState } from "react";
import DynamicFormModal from "../../UIComponents/DynamicModal";
import DynamicDataGrid from "../../UIComponents/DynamicDataGrid";

const data = [
  {
    key: "1",
    shiftId: "S001",
    shiftName: "Morning Shift",
    shiftDescription: "Shift from 8 AM to 4 PM",
  },
  {
    key: "2",
    shiftId: "S002",
    shiftName: "Night Shift",
    shiftDescription: "Shift from 4 PM to 12 AM",
  },
];

const columns = [
  {
    title: "Shift ID",
    dataIndex: "shiftId",
    key: "shiftId",
  },
  {
    title: "Shift Name",
    dataIndex: "shiftName",
    key: "shiftName",
  },
  {
    title: "Description",
    dataIndex: "shiftDescription",
    key: "shiftDescription",
  },
];

const ShiftDetails = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const formFields = [
    {
      type: "input",
      name: "shiftId",
      label: "Shift ID",
      placeholder: "Enter Shift ID",
      rules: [{ required: true, message: "Please enter shift ID" }],
    },
    {
      type: "input",
      name: "shiftName",
      label: "Shift Name",
      placeholder: "Enter Shift Name",
      rules: [{ required: true, message: "Please enter shift name" }],
    },
    {
      type: "input",
      name: "shiftDescription",
      label: "Shift Description",
      placeholder: "Enter Shift Description",
      rules: [{ required: true, message: "Please enter shift description" }],
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
        title="Shift Creation"
      />
      <DynamicDataGrid
        columns={columns}
        data={data}
        buttons={[{ title: "Add New", onClick: handleAddNew, type: "primary" }]}
      />
    </div>
  );
};

export default ShiftDetails;
