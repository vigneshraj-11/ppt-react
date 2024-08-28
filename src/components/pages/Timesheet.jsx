import React, { useState, useEffect } from "react";
import DynamicDataGrid from "../../UIComponents/DynamicDataGrid";
import TimesheetForm from "../modules/TimesheetForm";
import { Download } from "lucide-react";
import { addMissedTask, addTask, getTimesheetRecords } from "../../apicalling/APICalling";
import { Alert, message, Spin } from "antd";

const columns = [
  {
    title: "Client Name",
    dataIndex: "client_name",
    key: "clientName",
  },
  {
    title: "Project Name",
    dataIndex: "project_name",
    key: "projectName",
  },
  {
    title: "Activity",
    dataIndex: "activity_name",
    key: "activity",
  },
  {
    title: "Start time",
    dataIndex: "start_time",
    key: "starttime",
  },
  {
    title: "End time",
    dataIndex: "end_time",
    key: "endtime",
  },
  {
    title: "Assigned By",
    dataIndex: "assigned_by",
    key: "assignedBy",
  },
  {
    title: "Comments",
    dataIndex: "comments",
    key: "comments",
  },
  {
    title: "Status",
    dataIndex: "end_time",
    key: "status",
    render: (endTime) => {
      let status = endTime ? "Completed" : "Inprogress";
      let color;

      if (status === "Completed") {
        color = "lightgreen";
      } else if (status === "Inprogress") {
        color = "yellow";
      }

      return (
        <span
          style={{ background: color, fontSize: "12px" }}
          className="p-1.5 text-gray-700 font-semibold rounded-full"
        >
          {status}
        </span>
      );
    },
  },
];

const Timesheet = ({ userID }) => {
  const [timesheetRecords, setTimesheetRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTimesheetRecords = async () => {
    try {
      const records = await getTimesheetRecords(userID);
      const sortedRecords = records.sort(
        (a, b) => b.timesheet_id - a.timesheet_id
      );
      setTimesheetRecords([...sortedRecords]);
    } catch (err) {
      setError("Failed to load timesheet records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimesheetRecords();
  }, [userID]); // Fetch data only when userID changes

  useEffect(() => {
    console.log("Updated timesheetRecords:", timesheetRecords);
  }, [timesheetRecords]);

  const handleSubmit1 = async (values, startTime, endTime) => {
    const taskData = {
      activity_id: values.activity,
      assigned_by: values.assignedBy,
      employee_id: userID,
      project_id: values.project,
      client_name: values.client,
      comments: values.comments,
      start_time: startTime,
      end_time: endTime,
    };
    try {
      const response = await addMissedTask(taskData);
      if (response.status === "success") {
        try {
          const records = await getTimesheetRecords(userID);
          const sortedRecords = records.sort(
            (a, b) => b.timesheet_id - a.timesheet_id
          );
          setTimesheetRecords([...sortedRecords]);
        } catch (err) {
          setError("Failed to load timesheet records.");
        }
        message.success("Task added successfully");
      } else {
        message.error("Failed to add task");
      }
    } catch (error) {
      message.error("Failed to add task");
    }
  };

  const handleSubmit = async (values) => {
    const taskData = {
      activity_id: values.activity,
      assigned_by: values.assignedBy,
      employee_id: userID,
      project_id: values.project,
      client_name: values.client,
      comments: values.comments,
    };
    try {
      const response = await addTask(taskData);
      if (response.status === "success") {
        try {
          const records = await getTimesheetRecords(userID);
          const sortedRecords = records.sort(
            (a, b) => b.timesheet_id - a.timesheet_id
          );
          setTimesheetRecords([...sortedRecords]);
        } catch (err) {
          setError("Failed to load timesheet records.");
        }
        message.success("Task added successfully");
      } else {
        message.error("Failed to add task");
      }
    } catch (error) {
      message.error("Failed to add task");
    }
  };

  const handleAddNew = () => {};

  const handleSaveTemplate = (values) => {
    console.log("Template Saved:", values);
    // Handle save as template logic
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30vh", // Full viewport height
        }}
      >
        <Spin tip="Loading sheet..." />
      </div>
    );
  }

  if (error) {
    return (
      <>
        <div className="mt-5 mb-2">
          <Alert message="Error" description={error} type="error" />
        </div>
      </>
    );
  }

  return (
    <div className="mt-5">
      <TimesheetForm
        onSubmit={handleSubmit}
        onSubmit1={handleSubmit1}
        onSaveTemplate={handleSaveTemplate}
      />
      <DynamicDataGrid
        key={timesheetRecords.length}
        columns={columns}
        data={timesheetRecords}
        buttons={[
          {
            title: (
              <>
                <Download />
              </>
            ),
            onClick: handleAddNew,
            type: "primary",
          },
        ]}
      />
    </div>
  );
};

export default Timesheet;
