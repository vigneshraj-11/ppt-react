import React, { useState, useEffect } from "react";
import { Clock, ClipboardCheck, Users, ActivitySquare } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  ComposedChart,
} from "recharts";
import { Alert, Button, Spin } from "antd";
import { getTimesheetRecords } from "../../apicalling/APICalling"; // Adjust the import as needed
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const Home = ({ userName, userID }) => {
  const [greetingMessage, setGreetingMessage] = useState("");
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalHours, setTotalHours] = useState(0);
  const [totalClient, setTotalClient] = useState(0);
  const [totalProject, setTotalProject] = useState(0);
  const [totalTask, setTotalTask] = useState(0);

  useEffect(() => {
    const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        return "Good morning";
      } else if (currentHour < 18) {
        return "Good afternoon";
      } else {
        return "Good evening";
      }
    };

    setGreetingMessage(`${getGreeting()}, ${userName}!`);
  }, [userName]);

  useEffect(() => {
    const fetchRecentTasks = async () => {
      try {
        const records = await getTimesheetRecords(userID);

        const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format
        const todayRecords = records.filter((record) => record.date === today);
        const totalRecords = records;

        // Sorting the records by timesheet_id in descending order
        todayRecords.sort((a, b) => b.timesheet_id - a.timesheet_id);
        totalRecords.sort((a, b) => b.timesheet_id - a.timesheet_id);

        // Slicing the first 5 records
        const latestRecords = todayRecords.slice(0, 5);
        const latestRecords1 = todayRecords;
        const latestRecords2 = todayRecords;

        const totalTimeInMinutes = latestRecords1.reduce((acc, record) => {
          if (record.end_time) {
            const startTime = new Date(`1970-01-01T${record.start_time}Z`);
            const endTime = new Date(`1970-01-01T${record.end_time}Z`);

            const differenceInMinutes = (endTime - startTime) / (1000 * 60); // Convert milliseconds to minutes
            return acc + differenceInMinutes;
          }
          return acc;
        }, 0);

        const totalHours = Math.floor(totalTimeInMinutes / 60); // Get the total hours
        const remainingMinutes = totalTimeInMinutes % 60; // Get the remaining minutes

        // Combine hours and minutes into a proper format
        const formattedTime = totalHours + remainingMinutes / 100;

        console.log(formattedTime.toFixed(2)); // This will give you the correct time format

        console.log("Total hours" + totalHours.toFixed(2));

        const uniqueClients = new Set(
          latestRecords2.map((record) => record.client_name)
        ).size;
        const uniqueProjects = new Set(
          latestRecords2.map((record) => record.project_name)
        ).size;
        const totalTasks = latestRecords1.length;

        const tasks = latestRecords.map((record) => {
          let hours = 0.0;
          let durationFormatted = 0.0;
          if (record.end_time && record.start_time) {
            // Helper function to parse time strings into Date objects
            const parseTime = (time) => {
              const [hours, minutes, seconds] = time.split(":").map(Number);
              return new Date(1970, 0, 1, hours, minutes, seconds);
            };

            // Create Date objects for start and end times
            const startDate = parseTime(record.start_time);
            const endDate = parseTime(record.end_time);

            // Calculate the difference in milliseconds
            let durationMillis = endDate - startDate;

            // Handle case where end time is earlier than start time (next day scenario)
            if (durationMillis < 0) {
              durationMillis += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
            }

            // Convert milliseconds to total minutes
            const totalMinutes = durationMillis / (1000 * 60);

            // Calculate hours and minutes
            const hours = Math.floor(totalMinutes / 60);
            const minutes = Math.round(totalMinutes % 60); // Round minutes to avoid fractional minutes

            durationFormatted = `${hours}.${minutes.toString().padStart(2, "0")}`;
            console.log(
              `Start Time: ${record.start_time}, End Time: ${record.end_time}`
            );
            console.log(`Duration: ${durationFormatted}`);
          }

          const status = record.end_time ? "Completed" : "In Progress";

          return {
            id: record.timesheet_id,
            task: record.activity_name,
            hours: durationFormatted,
            status: status,
          };
        });

        setRecentTasks(tasks);
        setTotalHours(`${formattedTime.toFixed(2)}`);
        setTotalClient(`${uniqueClients}`);
        setTotalProject(`${uniqueProjects}`);
        setTotalTask(`${totalTasks}`);
      } catch (err) {
        setError("Failed to load timesheet records.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentTasks();
  }, [userID]);

  const effortData = [
    { day: "Sun", hours: 0 },
    { day: "Mon", hours: 8 },
    { day: "Tue", hours: 6 },
    { day: "Wed", hours: 7 },
    { day: "Thu", hours: 5 },
    { day: "Fri", hours: 6 },
    { day: "Sat", hours: 0 },
  ];

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
    <div className="p-3 mt-2" id="contentDiv">
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <h1 className="text-2xl p-1 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-orange-500 cursor-pointer">
          {greetingMessage}
        </h1>
      </div>
      <p className="p-2 text-sm text-gray-400 dark:text-gray-400">
        Here's an overview of your dashboard.
      </p>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 mt-5"
        id="dashboardContent"
      >
        <div className="bg-white dark:bg-zinc-800 shadow rounded p-4 border flex items-center">
          <Clock className="w-6 h-6 text-orange-500 mr-3" />
          <div>
            <h2 className="text-base font-bold">Total Work Hours</h2>
            <p className="text-2xl font-bold">{totalHours} Hrs</p>
            <p className="text-slate-500 text-sm">Details from today</p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 shadow rounded p-4 border flex items-center">
          <Users className="w-6 h-6 text-red-500 mr-3" />
          <div>
            <h2 className="text-base font-bold">No of Clients</h2>
            <p className="text-2xl font-bold">{totalClient}</p>
            <p className="text-slate-500 text-sm">Overall Details</p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 shadow rounded p-4 border flex items-center">
          <ActivitySquare className="w-6 h-6 text-green-500 mr-3" />
          <div>
            <h2 className="text-base font-bold">No of Projects</h2>
            <p className="text-2xl font-bold">{totalProject}</p>
            <p className="text-slate-500 text-sm">Overall Details</p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-800 shadow rounded p-4 border flex items-center">
          <ClipboardCheck className="w-6 h-6 text-blue-500 mr-3" />
          <div>
            <h2 className="text-base font-bold">No of Tasks</h2>
            <p className="text-2xl font-bold">{totalTask}</p>
            <p className="text-slate-500 text-sm">Details from today</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6 mt-5">
        <div className="bg-white dark:bg-zinc-800 shadow rounded p-4 border">
          <h2 className="text-base font-bold mb-4">Recent Tasks</h2>
          <table className="table w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">Task</th>
                <th className="px-4 py-2">Effort</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-4 py-2">{task.task}</td>
                  <td className="px-4 py-2">{task.hours} Hrs</td>
                  <td className="px-4 py-2">
                    <span
                      className={`w-24 h-8 flex items-center justify-center rounded-full text-white text-sm ${
                        task.status === "Completed"
                          ? "bg-green-500"
                          : task.status === "In Progress"
                            ? "bg-yellow-500"
                            : task.status === "Pending"
                              ? "bg-red-500"
                              : ""
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white dark:bg-zinc-800 shadow-sm rounded-lg p-6 border dark:border-zinc-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
            Hours of Effort
          </h2>
          <ComposedChart
            width={500}
            height={300}
            data={effortData}
            margin={{ top: 10, right: 30, bottom: 20, left: 5 }}
          >
            <XAxis dataKey="day" stroke="#4b5563" />
            <YAxis stroke="#4b5563" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                color: "#fff",
                borderRadius: "2px",
                border: "none",
              }}
              itemStyle={{ color: "#fff" }}
            />
            <CartesianGrid stroke="#c3c3c3" strokeDasharray="3 3" />
            <Bar
              dataKey="hours"
              barSize={3}
              fill="#4F46E5"
              radius={[10, 10, 0, 0]}
            />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="#c3c3c3"
              strokeWidth={1}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </div>
      </div>
    </div>
  );
};

export default Home;
