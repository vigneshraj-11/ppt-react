import React, { useState } from "react";
import DynamicFormModal from "../../UIComponents/DynamicModal";
import DynamicDataGrid from "../../UIComponents/DynamicDataGrid";

const data = [
  {
    key: "1",
    locationId: "L001",
    locationName: "Location 1",
    locationDescription: "Description for Location 1",
  },
  {
    key: "2",
    locationId: "L002",
    locationName: "Location 2",
    locationDescription: "Description for Location 2",
  },
];

const columns = [
  {
    title: "Location ID",
    dataIndex: "locationId",
    key: "locationId",
  },
  {
    title: "Location Name",
    dataIndex: "locationName",
    key: "locationName",
  },
  {
    title: "Description",
    dataIndex: "locationDescription",
    key: "locationDescription",
  },
];

const LocationDetails = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const formFields = [
    {
      type: "input",
      name: "locationId",
      label: "Location ID",
      placeholder: "Enter Location ID",
      rules: [{ required: true, message: "Please enter location ID" }],
    },
    {
      type: "input",
      name: "locationName",
      label: "Location Name",
      placeholder: "Enter Location Name",
      rules: [{ required: true, message: "Please enter location name" }],
    },
    {
      type: "input",
      name: "locationDescription",
      label: "Location Description",
      placeholder: "Enter Location Description",
      rules: [{ required: true, message: "Please enter location description" }],
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
        title="Location Creation"
      />
      <DynamicDataGrid
        columns={columns}
        data={data}
        buttons={[{ title: "Add New", onClick: handleAddNew, type: "primary" }]}
      />
    </div>
  );
};

export default LocationDetails;
