import React, { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import EmployeeList from "../../UIComponents/EmployeeList";
import { getUserList } from "../../apicalling/APICalling";

const Peoples = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const users = await getUserList();
        // Filter out admins and format the remaining users
        const formattedEmployees = users
          .filter((user) => !user.is_admin) // Filter out admins
          .map((user) => ({
            profilePicture:
              "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg", // Replace with actual profile picture if available
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: "Employee", // Fixed role as Employee
            status: user.is_active ? "Active" : "Inactive",
          }))
          .sort((a, b) => a.name.localeCompare(b.name)); // Sort employees by name

        setEmployees(formattedEmployees);
        setLoading(false);
      } catch (err) {
        setError("Failed to load employees");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

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
        <Spin tip="Loading employees..." />
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
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6 mt-5">
      <div className="col-span-4 bg-white dark:bg-zinc-800 shadow rounded p-4 border">
        <EmployeeList title="In Our Organization" employees={employees} />
      </div>
    </div>
  );
};

export default Peoples;
