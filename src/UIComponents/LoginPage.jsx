import React, { useState, useEffect } from "react";
import { Form, Input, Button, Spin } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons"; // Import social media icons
import "./LoginPage.css";
import { getUserByEmail, login } from "../apicalling/APICalling";
import { Tooltip } from "antd";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  X,
  Youtube,
} from "lucide-react";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/app/home");
    }
  }, [navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    console.log("Received values of form: ", values);
    const isLoggedIn = await login(values.email, values.password);
    if (isLoggedIn != null) {
      try {
        const userData = await getUserByEmail(isLoggedIn.data.email);
        console.log("User data:", userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setLoading(false);
        navigate("/app/home");
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    } else {
      console.error("Login failed");
    }
  };

  const handleBubbleClick = (event) => {
    const bubble = event.target;
    bubble.classList.add("burst");
    setTimeout(() => {
      bubble.style.display = "none";
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="welcome-text">
          Welcome to <br />
          Project Support
        </h1>
        <Form name="login" onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              className="h-[45px] rounded-full p-3 pl-5 flex flex-row-reverse"
              placeholder="Email address"
              prefix={<MailOutlined className="text-slate-500" />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              className="h-[45px] rounded-full p-4 pl-5 text-center"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item className="login-form-button-wrapper">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={loading}
            >
              {loading ? <Spin /> : "Log In"}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="login-background">
        <div className="title">CTD TECHS</div>
        <div className="brand-message">
          <p className="mb-2">Empower your organization</p>
          <p style={{ fontSize: "26px" }}>
            with our timesheet and activity management solution
          </p>
        </div>
        <div className="bubble bubble1" onClick={handleBubbleClick}></div>
        <div className="bubble bubble2" onClick={handleBubbleClick}></div>
        <div className="bubble bubble3" onClick={handleBubbleClick}></div>
        <div className="bubble bubble4" onClick={handleBubbleClick}></div>

        <div className="social-icons items-center">
          <Tooltip title="Visit our Facebook page">
            <a
              className="cursor-pointer"
              href="https://www.facebook.com/CTDTechs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook
                style={{ fontSize: "24px", color: "white" }}
              />
            </a>
          </Tooltip>
          <Tooltip title="Follow us on Instagram">
            <a
              className="cursor-pointer"
              href="https://www.instagram.com/ctdtechs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram
                style={{ fontSize: "24px", color: "white" }}
              />
            </a>
          </Tooltip>
          <Tooltip title="Connect with us on LinkedIn">
            <a
              className="cursor-pointer"
              href="https://in.linkedin.com/company/ctdtechs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin
                style={{ fontSize: "24px", color: "white" }}
              />
            </a>
          </Tooltip>
          <Tooltip title="Subscribe to our YouTube channel">
            <a
              className="cursor-pointer"
              href="https://www.youtube.com/channel/UCiiAkSlc8WGPHW_aCSWiQYw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube style={{ fontSize: "24px", color: "white" }} />
            </a>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
