"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ChatBotIcon from "@/public/chat-bot-svgrepo-com.svg";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const maxLength = 150;
  const charsLeft = maxLength - inputValue.length;

  useEffect(() => {
    // Load messages from localStorage on initial load
    const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(savedMessages);
  }, []);

  const updateMessagesAndStorage = useCallback((newMessage) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      localStorage.setItem("messages", JSON.stringify(updatedMessages));
      return updatedMessages;
    });
  }, []);

  const handleSubmit = async () => {
    // Prevent form submission if inputValue is empty or only contains whitespace
    if (!inputValue.trim()) return;

    // Create the new user message using inputValue directly instead of using FormData
    const newUserMessage = { content: inputValue.trim(), role: "user" };
    updateMessagesAndStorage(newUserMessage);

    // Reset inputValue after the message is sent
    setInputValue("");

    // Proceed with the API call
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, newUserMessage] }),
      });

      if (!response.ok) throw new Error("Network response was not ok.");

      const data = await response.json();
      const { content, role } = data.response.message;
      const openAiResponse = { content, role };

      // Update messages and storage with the assistant's response
      updateMessagesAndStorage(openAiResponse);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  const handleInputChange = (e) => {
    const textarea = e.target;
    if (textarea.value.length <= maxLength) {
      setInputValue(textarea.value);
    }
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem("messages");
  }

  return (
    <div className="flex flex-col items-center p-3 md:border-l-2 md:border-gray-600">
      <div className="mb-3 flex gap-3 self-baseline">
        <Image
          src={ChatBotIcon}
          priority
          alt="chat icon"
          width={50}
          height={50}
        />
        <div className="rounded-md bg-yellow-300 p-3 text-black">
          <p>Hello I am Tom&apos;s personal assistant</p>
        </div>
      </div>

      {messages.map((message, index) => {
        if (message.role === "user") {
          return <UserChat key={index} message={message.content} />;
        } else {
          return <AssistantChat key={index} message={message.content} />;
        }
      })}

      <div className="flex w-full justify-around text-black">
        <form onSubmit={handleSubmit} className="mt-3 flex w-full flex-col">
          <span
            className={`pointer-events-none text-white ${charsLeft < 20 ? "inline-block" : "invisible"} `}
          >
            characters left: {charsLeft}
          </span>
          <div className="flex flex-col justify-center">
            <textarea
              className="w-[400px] rounded-md p-2"
              style={{
                overflowY: "hidden",
                minHeight: "40px",
                height: "auto",
                resize: "none",
                width: "100%",
              }}
              name="prompt"
              type="text"
              value={inputValue}
              placeholder="Ask about Tom"
              maxLength={maxLength}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // Prevent the default action to avoid inserting a new line
                  handleSubmit(e); // Call your submit function
                }
              }}
            />
            <div className="flex h-16 gap-3">
              <button
                className="mt-3 w-24 rounded bg-yellow-300 p-2 hover:bg-yellow-400"
                type="submit"
              >
                Send
              </button>
              <button
                className="mt-3 w-24 rounded bg-red-400 p-2 hover:bg-yellow-400"
                onClick={handleClearChat}
              >
                <p className="text-center">Clear chat</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const UserChat = ({ message }) => {
  return (
    <div className="mb-3 max-w-[300px] self-end rounded-md bg-white p-3 text-black">
      <p>{message}</p>
    </div>
  );
};
const AssistantChat = ({ message }) => {
  return (
    <div className="flex- mb-3 flex items-start gap-3  self-baseline">
      <Image
        src={ChatBotIcon}
        priority
        alt="chat icon"
        width={50}
        height={50}
        className=" align-top"
      />
      <div className="max-w-[300px] rounded-md bg-yellow-300 p-3 text-black">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Chat;
