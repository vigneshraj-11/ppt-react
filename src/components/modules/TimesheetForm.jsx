import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  DatePicker,
  Dropdown,
  Menu,
  message,
  Tooltip,
  Tag,
  notification,
} from "antd";
import { ChevronDown, ChevronUp, Settings, Star, X } from "lucide-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getClientById, getActivityList } from "../../apicalling/APICalling";

dayjs.extend(customParseFormat);

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const TimesheetForm = ({ onSubmit, onSubmit1 }) => {
  const [form] = Form.useForm();
  const [isFormVisible, setFormVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [formMode, setFormMode] = useState("toggle");
  const [templates, setTemplates] = useState([]);
  const [isSaveDisabled, setSaveDisabled] = useState(false);
  const [isTemplateDisabled, setTemplateDisabled] = useState(false);
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    const savedFormMode = localStorage.getItem("formMode") || "toggle";
    setFormMode(savedFormMode);
    setFormVisible(savedFormMode === "onscreen");

    const savedTemplates = JSON.parse(localStorage.getItem("templates")) || [];
    setTemplates(savedTemplates);
  }, []);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const activityData = await getActivityList();
        console.log(activityData);
        setActivity(activityData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load activityData");
        setLoading(false);
      }
    };

    fetchActivityData();
  }, []);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clientData = await getClientById(1); // Assuming 1 is the client ID
        console.log(clientData);
        setClients([clientData]);
        setProjects(clientData.projects);
        setLoading(false);
      } catch (err) {
        setError("Failed to load clients or projects");
        setLoading(false);
      }
    };

    fetchClientData();
  }, []);

  const handleAddNewActivity = () => {
    setIsAddingActivity(true); // Switch to input mode
  };

  const handleActivityInputBlur = (e) => {
    const newActivity = e.target.value.trim();
    if (newActivity && !activities.includes(newActivity)) {
      setActivities([...activities, newActivity]);
      form.setFieldsValue({ activity: newActivity }); // Set the newly added activity
    }
    setIsAddingActivity(false); // Switch back to select mode
  };

  const handleToggleForm = () => {
    if (formMode === "toggle") {
      setFormVisible(!isFormVisible);
    }
  };

  const handleDatePickerVisibility = () => {
    setDatePickerVisible(!isDatePickerVisible);
    setTemplateDisabled(!isTemplateDisabled);
    if (!isDatePickerVisible) {
      setSaveDisabled(false);
    }
  };

  const handleMenuClick = ({ key }) => {
    setFormMode(key);
    setFormVisible(key === "onscreen");
    localStorage.setItem("formMode", key);
  };

  const handleSubmit = async (values) => {
    if (isDatePickerVisible === true) {
      if (startTime === null) {
        message.warning("Please pick the time range.");
      }
      setSaveDisabled(true);
      await onSubmit1(values, startTime, endTime);
      setDatePickerVisible(false);
      form.resetFields();
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
      await onSubmit(values);
      form.resetFields();
      setSaveDisabled(false);
    }
  };

  const handleFavoriteDoubleClick = async (template) => {
    const key = "updatable";
    notification.open({
      key,
      message: "Processing...",
      description: "Your request is being processed.",
      duration: 0,
    });
    try {
      await onSubmit(template);
      notification.success({
        key,
        message: "Success!",
        description: "Your template has been submitted successfully.",
      });
    } catch (error) {
      notification.error({
        key,
        message: "Error!",
        description: "There was an error submitting your template.",
      });
    }
  };

  const handleSaveTemplate = () => {
    form
      .validateFields()
      .then(() => {
        const formData = form.getFieldsValue();
        if (templates.length >= 16) {
          message.error("You can only save up to 16 favorites.");
          return;
        }
        const updatedTemplates = [...templates, formData];
        setTemplates(updatedTemplates);
        localStorage.setItem("templates", JSON.stringify(updatedTemplates));
        form.resetFields();
        message.success("Template saved successfully!");
      })
      .catch((errorInfo) => {});
  };

  const handleRangeChange = (dates) => {
    if (dates) {
      const [start, end] = dates;
      const differenceInMinutes = end.diff(start, "minute");

      if (differenceInMinutes > 60) {
        message.error("Time range cannot exceed one hour.");
        setSaveDisabled(true);
      } else {
        setSaveDisabled(false);

        const formattedStartTime = start.format("hh:mm:ss A");
        const formattedEndTime = end.format("hh:mm:ss A");

        setStartTime(formattedStartTime);
        setEndTime(formattedEndTime);
      }
    } else {
      setStartTime(null);
      setEndTime(null);
    }
  };

  const handleDeleteFavorite = (index) => {
    const updatedTemplates = templates.filter((_, i) => i !== index);
    setTemplates(updatedTemplates);
    localStorage.setItem("templates", JSON.stringify(updatedTemplates));
    message.success("Favorite deleted successfully.");
  };

  const renderFavoriteMenu = (index) => (
    <Menu
      onClick={({ key }) => {
        if (key === "delete") {
          handleDeleteFavorite(index);
        }
      }}
    >
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  const settingsMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="onscreen">Onscreen</Menu.Item>
      <Menu.Item key="toggle">Toggle</Menu.Item>
    </Menu>
  );

  return (
    <div className="mb-5">
    <div>
      <div className="flex flex-row mb-4 justify-between">
        <div className="flex flex-row">
          <h6 className="font-semibold">Timesheet Entry</h6>
          {formMode === "toggle" &&
            (isFormVisible ? (
              <ChevronUp
                className="mt-1 text-blue-500 h-5 cursor-pointer"
                onClick={handleToggleForm}
              />
            ) : (
              <ChevronDown
                className="mt-1 text-blue-500 h-5 cursor-pointer"
                onClick={handleToggleForm}
              />
            ))}
        </div>
        <div className="flex flex-row space-x-2 mb-4">
          {isFormVisible && (
            <>
              <Button
                className="h-6 mt-0.5"
                type="dashed"
                onClick={handleDatePickerVisibility}
              >
                Missed task
              </Button>
              {isDatePickerVisible && (
                <div className="flex items-center space-x-2">
                  <RangePicker
                    placeholder={["Start Time", "End Time"]}
                    style={{ width: 400 }}
                    className="h-6"
                    showTime={{
                      format: "hh:mm A",
                      hideDisabledOptions: true,
                      defaultValue: [
                        dayjs("00:00:00", "HH:mm:ss"),
                        dayjs("11:59:59", "HH:mm:ss"),
                      ],
                    }}
                    format="YYYY-MM-DD hh:mm A"
                    onChange={handleRangeChange}
                  />
                  <X
                    className="text-red-500 h-5 cursor-pointer"
                    onClick={handleDatePickerVisibility}
                  />
                </div>
              )}
              <Dropdown overlay={settingsMenu} trigger={["click"]}>
                <Settings className="h-5 mt-1 cursor-pointer" />
              </Dropdown>
            </>
          )}
        </div>
      </div>
      <div
        className={`form-container ${isFormVisible ? "slide-down" : "slide-up"}`}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxWidth: "100%", margin: "auto" }}
        >
          <Row gutter={16}>
            <Col span={4}>
              <Form.Item
                name="client"
                label="Client"
                rules={[{ required: true, message: "Please select a client" }]}
              >
                <Select placeholder="Select a client" showSearch>
                  {clients.map((client) => (
                    <Option key={client.id} value={client.name}>
                      {client.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item
                name="project"
                label="Project"
                rules={[{ required: true, message: "Please select a project" }]}
              >
                <Select placeholder="Select a project" showSearch>
                  {projects.map((project) => (
                    <Option key={project.id} value={project.id}>
                      {project.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="activity"
                label="Activity"
                rules={[
                  { required: true, message: "Please select an activity" },
                ]}
              >
                {isAddingActivity ? (
                  <Input
                    placeholder="Enter new activity"
                    onBlur={handleActivityInputBlur}
                    autoFocus
                  />
                ) : (
                  <Select
                    showSearch
                    placeholder="Select an activity"
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Button type="link" onClick={handleAddNewActivity}>
                          + Add New Activity
                        </Button>
                      </>
                    )}
                  >
                    {activity.map((activities) => (
                      <Option key={activities.id} value={activities.id}>
                        {activities.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>

            <Col span={4}>
              <Form.Item
                name="assignedBy"
                label="Assigned By"
                rules={[
                  {
                    required: true,
                    message: "Please select who assigned this task",
                  },
                ]}
              >
                <Select placeholder="Select a person" showSearch>
                <Option value="Alwyn">Alwyn</Option>
                <Option value="Varatharajan">Varatharajan</Option>
                <Option value="Vasanth">Vasanth</Option>
                <Option value="Steephan">Steephan</Option>
                <Option value="Suresh P">Suresh P</Option>
                <Option value="Lavanya">Lavanya</Option>
                <Option value="Pravalika">Pravalika</Option>
                <Option value="Ganesh">Ganesh</Option>
                <Option value="Murugan">Murugan</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name="comments"
                label="Comments"
                rules={[
                  { required: true, message: "Please add your comments" },
                ]}
              >
                <TextArea rows={3} placeholder="Enter your comments here..." />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end">
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isSaveDisabled} // Disable the save button based on validation
              >
                Save
              </Button>
            </Col>
            <Col>
              <Button
                onClick={handleSaveTemplate}
                disabled={isTemplateDisabled} // Disable the template save button
                className="ml-2"
              >
                Save as Template
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      </div>
      <div className="favorite-templates-container mt-2">
        <h6 className="font-semibold mb-5 flex flex-row items-center space-x-5">
          <Star className="h-4 text-yellow-500" />
          Favorites
        </h6>

        <div className="flex flex-row flex-wrap">
          {templates.map((template, index) => (
            <Dropdown
              overlay={renderFavoriteMenu(index)}
              trigger={["contextMenu"]}
              key={index}
            >
              <Tooltip title="Click to Add task">
                <Tag
                  color="blue"
                  onClick={() => handleFavoriteDoubleClick(template)}
                  className="cursor-pointer mb-2"
                >
                  {template.client} - {template.comments}
                </Tag>
              </Tooltip>
            </Dropdown>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimesheetForm;
