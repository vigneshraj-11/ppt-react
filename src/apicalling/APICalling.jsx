import axios from "axios";

// const BASE_URL = "http://localhost:8000/api";
const BASE_URL = "http://37.27.125.244:8123/api";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/token/`, {
      email: username,
      password: password,
    });
    const { access, refresh } = response.data;
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${BASE_URL}/users/user/${email}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const getUserList = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${BASE_URL}/users/list/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error;
  }
};

export const getClientById = async (userId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${BASE_URL}/users/clients/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching client:", error);
    throw error;
  }
};

export const getActivityList = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${BASE_URL}/users/activities/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching activities list:", error);
    throw error;
  }
};

export const addTask = async (taskData) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(`${BASE_URL}/users/add_task/`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const addMissedTask = async (taskData) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${BASE_URL}/users/missed_task/`,
      taskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const getTimesheetRecords = async (employeeId) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${BASE_URL}/users/get_timesheet_records/`,
      {
        employee_id: employeeId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching timesheet records:", error);
    throw error;
  }
};
