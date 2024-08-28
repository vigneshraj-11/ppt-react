import React, { useState } from "react";
import { UserRoundCheck } from "lucide-react";
import RoleDetails from "./RoleDetails";
import DepartmentDetails from "./DepartmentDetails";
import LocationDetails from "./LocationDetails";
import ShiftDetails from "./ShiftDetails";
import ActivityDetails from "./ActivityDetails";

const MasterData = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("role");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
        setLoading(false);
      };
      setLoading(true);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100">
      <div className="flex">
        <div className="w-1/5 bg-white dark:bg-neutral-900 dark:text-gray-100 rounded-md mr-4 p-4 border dark:border-neutral-700">
          <div className="flex flex-col">
            <button
              className={`py-2 px-3 text-left text-sm ${
                activeTab === "role"
                  ? "text-blue-600"
                  : "text-gray-700 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("role")}
            >
              Role Details
            </button>
            <button
              className={`py-2 px-3 text-left text-sm ${
                activeTab === "department"
                  ? "text-blue-600"
                  : "text-gray-700 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("department")}
            >
              Department Details
            </button>
            <button
              className={`py-2 px-3 text-left text-sm ${
                activeTab === "location"
                  ? "text-blue-600"
                  : "text-gray-700 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("location")}
            >
              Location Details
            </button>
            <button
              className={`py-2 px-3 text-left text-sm ${
                activeTab === "shift"
                  ? "text-blue-600"
                  : "text-gray-700 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("shift")}
            >
              Shift Details
            </button>
            <button
              className={`py-2 px-3 text-left text-sm ${
                activeTab === "activity"
                  ? "text-blue-600"
                  : "text-gray-700 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("activity")}
            >
              Activity Details
            </button>
          </div>
        </div>

        <div className="w-4/5 bg-white dark:bg-neutral-900 dark:text-gray-100 rounded-md p-4 border dark:border-neutral-700">
          {activeTab === "role" && (
            <div className="space-y-4">
              <h6 className="text-1xl font-semibold text-gray-900 dark:text-gray-100 mb-5">
                Role Details
              </h6>
              <RoleDetails />
            </div>
          )}

          {activeTab === "department" && (
            <div className="space-y-4">
              <h6 className="text-1xl font-semibold text-gray-900 dark:text-gray-100 mb-5">
                Department Details
              </h6>
              <DepartmentDetails />
            </div>
          )}

          {activeTab === "location" && (
            <div className="space-y-4">
              <h6 className="text-1xl font-semibold text-gray-900 dark:text-gray-100 mb-5">
                Location Details
              </h6>
              <LocationDetails />
            </div>
          )}

          {activeTab === "shift" && (
            <div className="space-y-4">
              <h6 className="text-1xl font-semibold text-gray-900 dark:text-gray-100 mb-5">
                Shift Details
              </h6>
              <ShiftDetails />
            </div>
          )}

          {activeTab === "activity" && (
            <div className="space-y-4">
              <h6 className="text-1xl font-semibold text-gray-900 dark:text-gray-100 mb-5">
                Activity Details
              </h6>
              <ActivityDetails />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterData;
