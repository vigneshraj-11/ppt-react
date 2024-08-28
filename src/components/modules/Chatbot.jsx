import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, X } from "lucide-react";
import "./Chatbot.css";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const [showCreateTicketButton, setShowCreateTicketButton] = useState(false);
  const chatWindowRef = useRef(null);
  const botButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleNavigate = (hash) => {
    navigate("/details");
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (botButtonRef.current) {
        botButtonRef.current.classList.add("bouncingBot");
        setTimeout(() => {
          botButtonRef.current.classList.remove("bouncingBot");
        }, 2000);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    // Check if the message is related to an issue
    if (
      input.toLowerCase().includes("issue") ||
      input.toLowerCase().includes("problem") ||
      input.toLowerCase().includes("bug") ||
      input.toLowerCase().includes("fault")
    ) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sorry to hear you're facing an issue! Can I raise a ticket for this?",
          sender: "bot",
        },
      ]);
      setShowCreateTicketButton(true);
      return; // Skip API call
    }

    if (input.toLowerCase().includes("i want to view pricing models")) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sure",
          sender: "bot",
        },
      ]);
      handleNavigate("pricing");
      // setShowCreateTicketButton(true);
      return; // Skip API call
    }

    if (input.toLowerCase().includes("dashboard")) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sure",
          sender: "bot",
        },
      ]);
      navigate("app/dashboard");
      return;
    }

    if (input.toLowerCase().includes("user details")) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sure",
          sender: "bot",
        },
      ]);
      navigate("app/user-details");
      return;
    }

    if (input.toLowerCase().includes("document details")) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sure",
          sender: "bot",
        },
      ]);
      navigate("app/document-details");
      return;
    }

    if (input.toLowerCase().includes("setting")) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sure",
          sender: "bot",
        },
      ]);
      navigate("app/setting");
      return;
    }

    if (input.toLowerCase().includes("tickets")) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Sure",
          sender: "bot",
        },
      ]);
      navigate("app/tickets");
      return;
    }

    setIsTyping(true);
    setShowTypingIndicator(true);
    try {
      await streamBotResponse(input);
    } catch (error) {
      setIsTyping(false);
      setShowTypingIndicator(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, something went wrong.", sender: "bot" },
      ]);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    const newMessages = [...messages, { text: suggestion, sender: "user" }];
    setMessages(newMessages);

    setIsTyping(true);
    setShowTypingIndicator(true);
    try {
      await streamBotResponse(suggestion);
    } catch (error) {
      setIsTyping(false);
      setShowTypingIndicator(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, something went wrong.", sender: "bot" },
      ]);
    }
  };

  const streamBotResponse = async (message) => {
    const knowledgeBaseText = `Knowledge Base: DAaaS (Document Automation as a Service) is a sophisticated solution developed by CTD Techs, led by Vignesh Gunasekaran, a Full Stack Java Developer and AI Specialist. This innovative platform is designed to transform document management through automation, offering both cloud and on-premises deployment options to cater to a range of business needs with unparalleled flexibility and scalability. DAaaS features three pricing plans, applicable to both modles types ( cloud and on prem): Basic Plan ($19.99/month): Supports PDF, JPG, and PNG formats with 70-80% OCR accuracy and a 24-hour turnaround. Includes a basic dashboard for essential document management. Premium Plan ($49.99/month): Upgrades to 90% OCR accuracy, supports handwritten documents, offers phone support, and includes advanced analytics for enhanced document insights. Enterprise Plan: Provides custom pricing with 99.99% OCR accuracy, a 6-hour turnaround time, and a dedicated account manager. This plan includes customizable features tailored to specific business requirements. DAaaS ensures secure deployment and efficient document digitization while supporting digital transformation. It is backed by clearly defined Service Level Agreements (SLAs) for processing times and offers comprehensive support for development, training, and deployment. For further information or to discuss tailored solutions, please contact our sales team at sales@ctdtechs.com. DAaaS is committed to revolutionizing document automation with a robust and reliable platform designed to meet diverse business needs.`;

    const formattedMessage = `Knowledge Base: ${knowledgeBaseText}

    Question: ${message}

    Rules:
    1. Provide responses related to the knowledge base content.
    2. If the user sends a greeting, reply in 10 words or fewer.
    3. Respond in a professional manner, similar to a sales team leader.
    4. Do not use phrases like "according to the knowledge base" or "based on the knowledge base."
    5. Do not mention "friend" or "response from [anything]. or "Hey there!" or "Hi there"
    6. If the user mentions an issue, problem, fault, or bug, respond with: "Sorry to hear you're facing an issue! Can I raise a ticket for this?"

    Please ensure strict adherence to these rules.`;

    const response = await fetch("http://37.27.125.244:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        messages: [
          {
            role: "user",
            content: formattedMessage,
          },
        ],
        system: "talk like a support pesron",
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Failed to read response body");
    }

    let content = "";
    const decoder = new TextDecoder();
    let buffer = "";

    setShowTypingIndicator(false); // Hide typing indicator when stream starts

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      let boundary = buffer.indexOf("\n");
      while (boundary !== -1) {
        let jsonStr = buffer.slice(0, boundary).trim();
        buffer = buffer.slice(boundary + 1);

        if (jsonStr) {
          try {
            const jsonResponse = JSON.parse(jsonStr);
            if (jsonResponse.done === false) {
              let messageContent = jsonResponse.message.content.replace(
                /"/g,
                ""
              ); // Remove double quotes
              content += messageContent;
              setMessages((prevMessages) => {
                const lastMessage = prevMessages[prevMessages.length - 1];
                if (lastMessage && lastMessage.sender === "bot") {
                  return [
                    ...prevMessages.slice(0, -1),
                    { ...lastMessage, text: content },
                  ];
                } else {
                  return [
                    ...prevMessages,
                    { text: messageContent, sender: "bot" },
                  ];
                }
              });
            }
          } catch (jsonError) {
            console.error("Error parsing JSON:", jsonError);
            console.error("Response text:", jsonStr);
          }
        }

        boundary = buffer.indexOf("\n");
      }
    }

    setIsTyping(false);
  };

  // Function to handle ticket creation
  const handleCreateTicket = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: "Ticket created successfully. Our team will get back to you shortly.",
        sender: "bot",
      },
    ]);
    setShowCreateTicketButton(false); // Hide the button after creating a ticket
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-2 right-5 z-100">
      {!isOpen && (
        <button
          ref={botButtonRef}
          className="chatbotClass bg-gradient-to-r from-blue-500 to-orange-500 text-white font-bold p-3 rounded-full shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bot className="h-6 w-6" />
        </button>
      )}
      {isOpen && (
        <div className="chatbot bg-white text-black dark:bg-neutral-900 dark:text-black border border-slate-500 shadow-lg rounded-lg p-4 mt-2 w-80 h-96 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl ml-3 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-orange-500">
              Timesheet Bot
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div
            className="chat-window flex-1 p-3 h-96 overflow-y-auto"
            ref={chatWindowRef}
            style={{ fontSize: 14, fontFamily: "sans-serif", lineHeight: 1.5 }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-2 mb-1 mt-1 rounded-lg ${
                    msg.sender === "user" ? "bg-blue-200" : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && showTypingIndicator && (
              <div className="text-left">
                <div className="inline-block p-2 mb-1 mt-1 rounded-lg bg-gray-200">
                  <TypingIndicator />
                </div>
              </div>
            )}
            {showCreateTicketButton && (
              <div className="text-left mt-2">
                <button
                  onClick={handleCreateTicket}
                  className="bg-blue-500 text-white p-2 rounded-full"
                >
                  Create Ticket
                </button>
              </div>
            )}
          </div>
          <div className="input-area relative">
            <input
              id="aiMessage"
              type="text"
              placeholder="Ask your queries"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="w-full border border-gray-300 h-12 rounded-full pl-4 pr-10"
            />
            <button
              onClick={handleSend}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full flex items-center justify-center"
            >
              <Send className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const TypingIndicator = () => {
  return (
    <div className="flex space-x-1 p-2">
      <div className="dot bg-gray-500 h-2 w-2 rounded-full animate-bounce"></div>
      <div className="dot bg-gray-500 h-2 w-2 rounded-full animate-bounce animation-delay-200"></div>
      <div className="dot bg-gray-500 h-2 w-2 rounded-full animate-bounce animation-delay-400"></div>
    </div>
  );
};

export default Chatbot;
