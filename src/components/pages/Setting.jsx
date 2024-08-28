import React, { useState } from "react";
import { UserRoundCheck, Lock, Bell, User } from "lucide-react";

const Settings = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const firstName = userDetails ? userDetails.firstName : "User";
  const lastName = userDetails ? userDetails.lastName : "User";
  const email = userDetails ? userDetails.email : "User";

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
    <div className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 mt-5">
      <div className="flex">
        <div className="w-1/5 bg-white dark:bg-neutral-900 dark:text-gray-100 rounded-md mr-4 p-4 border dark:border-neutral-700">
          <div className="flex flex-col">
            <button
              className={`py-2 px-3 text-left text-sm ${
                activeTab === "profile"
                  ? "text-blue-500"
                  : "text-gray-700 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <User className="inline-block mr-2 h-5 w-5" /> Profile Setting
            </button>
            <button
              className={`py-2 px-3 text-left text-sm ${
                activeTab === "password"
                  ? "text-blue-500"
                  : "text-gray-700 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("password")}
            >
              <Lock className="inline-block mr-2 h-5 w-5" /> Change Password
            </button>
          </div>
        </div>

        <div className="w-4/5 bg-white dark:bg-neutral-900 dark:text-gray-100 rounded-md p-4 border dark:border-neutral-700">
          {activeTab === "profile" && (
            <div className="space-y-4">
              <h5 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-5">
                Profile Details
              </h5>
              <div className="flex justify-center mb-4">
                <label className="relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0"
                  />
                  {loading ? (
                    <div className="w-20 h-20 border border-gray-300 dark:border-neutral-700 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400 animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          d="M12 2v4m0 12v4m-10-10h4m12 0h4m-2-10l2 2m-12 12l-2-2m2-10l2 2m12-2l-2 2"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-20 h-20 border border-gray-300 dark:border-neutral-700 rounded-full overflow-hidden flex items-center justify-center">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserRoundCheck className="w-10 h-10 text-gray-500 dark:text-gray-400" />
                      )}
                    </div>
                  )}
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="mt-1 p-2 border border-gray-300 dark:border-neutral-700 rounded w-full text-sm bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
                    value={firstName}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="mt-1 p-2 border border-gray-300 dark:border-neutral-700 rounded w-full text-sm bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
                    value={lastName}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="mt-1 p-2 border border-gray-300 dark:border-neutral-700 rounded w-full text-sm bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
                    value={email}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    placeholder="Mobile number"
                    className="mt-1 p-2 border border-gray-300 dark:border-neutral-700 rounded w-full text-sm bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-sm">
                    Gender
                  </label>
                  <div className="flex space-x-4 text-sm mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        className="mr-2"
                      />
                      <span>Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="mr-2"
                      />
                      <span>Female</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        className="mr-2"
                      />
                      <span>Others</span>
                    </label>
                  </div>
                </div>
                <div className="col-span-1">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm">
                    Residential Address
                  </label>
                  <textarea
                    className="mt-1 p-2 border border-gray-300 dark:border-neutral-700 rounded w-full text-sm bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
                    placeholder="Residential Address"
                    rows={3}
                  ></textarea>
                </div>
              </div>
              <div className="text-right mt-4">
                <button className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded shadow hover:bg-blue-600 dark:hover:bg-blue-700 text-sm">
                  Save
                </button>
              </div>
            </div>
          )}

          {activeTab === "password" && (
            <div className="space-y-4">
              <form autoComplete="off">
                <h5 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-5">
                  Change Password
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="mt-1 p-2 border border-gray-300 dark:border-neutral-700 rounded w-full text-sm bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="New Password"
                      className="mt-1 p-2 border border-gray-300 dark:border-neutral-700 rounded w-full text-sm bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 text-sm">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="mt-1 p-2 border border-gray-300 dark:border-neutral-700 rounded w-full text-sm bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
                <div className="text-right mt-4">
                  <button className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded shadow hover:bg-blue-600 dark:hover:bg-blue-700 text-sm">
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-4">
              <h5 className="text1xl font-semibold text-gray-900 dark:text-gray-100  mb-5">
                Notification Setting
              </h5>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700 dark:text-gray-300">
                    Receive email notifications
                  </span>
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-500"
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700 dark:text-gray-300">
                    Receive SMS notifications
                  </span>
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-500"
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-700 dark:text-gray-300">
                    Receive push notifications
                  </span>
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-500"
                  />
                </div>
              </div>
              <div className="text-right mt-4">
                <button className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded shadow hover:bg-blue-600 text-sm">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
