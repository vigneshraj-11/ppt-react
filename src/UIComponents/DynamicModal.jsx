import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Upload,
  Radio,
  Checkbox,
  TimePicker,
  DatePicker,
  Button,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const { TextArea } = Input;

const DynamicFormModal = ({ isVisible, onClose, formFields, title }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isVisible) {
      form.resetFields();
    }
  }, [isVisible, form]);

  const renderFormField = (field) => {
    switch (field.type) {
      case "input":
        return (
          <Form.Item name={field.name} label={field.label} rules={field.rules}>
            <Input placeholder={field.placeholder} />
          </Form.Item>
        );
      case "select":
        return (
          <Form.Item name={field.name} label={field.label} rules={field.rules}>
            <Select placeholder={field.placeholder}>
              {field.options.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        );
      case "upload":
        return (
          <Form.Item
            name={field.name}
            label={field.label}
            valuePropName="fileList"
            getValueFromEvent={field.getValueFromEvent}
            rules={field.rules}
            className="custom-upload-dragger"
          >
            <Upload
              name="file"
              listType="picture"
              action={field.action}
              dragger
            >
              <p className="custom-upload-icon">
                <UploadOutlined />
              </p>
              <p className="custom-upload-text">Click or drag file to upload</p>
              <p className="custom-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload>
          </Form.Item>
        );
      case "radio":
        return (
          <Form.Item name={field.name} label={field.label} rules={field.rules}>
            <Radio.Group>
              {field.options.map((option) => (
                <Radio key={option.value} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        );
      case "checkbox":
        return (
          <Form.Item
            name={field.name}
            valuePropName="checked"
            rules={field.rules}
          >
            <Checkbox>{field.label}</Checkbox>
          </Form.Item>
        );
      case "timepicker":
        return (
          <Form.Item name={field.name} label={field.label} rules={field.rules}>
            <TimePicker style={{ width: "470px" }} />
          </Form.Item>
        );
      case "datepicker":
        return (
          <Form.Item name={field.name} label={field.label} rules={field.rules}>
            <DatePicker style={{ width: "470px" }} />
          </Form.Item>
        );
      case "textarea":
        return (
          <Form.Item name={field.name} label={field.label} rules={field.rules}>
            <TextArea rows={4} placeholder={field.placeholder} />
          </Form.Item>
        );
      case "rangepicker":
        return (
          <Form.Item name={field.name} label={field.label} rules={field.rules}>
            <RangePicker
              style={{ width: "470px" }}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [
                  dayjs("00:00:00", "HH:mm:ss"),
                  dayjs("11:59:59", "HH:mm:ss"),
                ],
              }}
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Form values:", values);
        onClose();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Modal title={title} visible={isVisible} onOk={handleOk} onCancel={onClose}>
      <Form form={form} layout="vertical" className="mt-5">
        {formFields.map((field) => renderFormField(field))}
      </Form>
    </Modal>
  );
};

export default DynamicFormModal;
