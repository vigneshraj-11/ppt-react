import React, { useState } from "react";
import DynamicFormModal from "../../UIComponents/DynamicModal";
import DynamicDataGrid from "../../UIComponents/DynamicDataGrid";

const data = [
  {
    key: "1",
    activityId: "A001",
    activityName: "Activity 1",
    activityDescription: "Description for Activity 1",
  },
  {
    key: "2",
    activityId: "A002",
    activityName: "Activity 2",
    activityDescription: "Description for Activity 2",
  },
];

const columns = [
  {
    title: "Activity ID",
    dataIndex: "activityId",
    key: "activityId",
  },
  {
    title: "Activity Name",
    dataIndex: "activityName",
    key: "activityName",
  },
  {
    title: "Description",
    dataIndex: "activityDescription",
    key: "activityDescription",
  },
];

const ActivityDetails = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const formFields = [
    {
      type: "input",
      name: "activityId",
      label: "Activity ID",
      placeholder: "Enter Activity ID",
      rules: [{ required: true, message: "Please enter activity ID" }],
    },
    {
      type: "input",
      name: "activityName",
      label: "Activity Name",
      placeholder: "Enter Activity Name",
      rules: [{ required: true, message: "Please enter activity name" }],
    },
    {
      type: "input",
      name: "activityDescription",
      label: "Activity Description",
      placeholder: "Enter Activity Description",
      rules: [{ required: true, message: "Please enter activity description" }],
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
        title="Activity Creation"
      />
      <DynamicDataGrid
        columns={columns}
        data={data}
        buttons={[{ title: "Add New", onClick: handleAddNew, type: "primary" }]}
      />
    </div>
  );
};

export default ActivityDetails;
