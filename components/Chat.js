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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const prompt = formData.get("prompt");

    if (!prompt) return;

    const newUserMessage = { content: prompt, role: "user" };
    updateMessagesAndStorage(newUserMessage);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Make sure to use the most current state
      body: JSON.stringify({ messages: [...messages, newUserMessage] }),
    });

    if (!response.ok) {
      // Handle error
      throw new Error("Something went wrong with the API :(");
      return;
    }

    const data = await response.json();
    const { content, role } = data.response.message;
    const openAiResponse = { content, role };

    updateMessagesAndStorage(openAiResponse);
    e.target.reset();
  };

  const handleInputChange = (e) => {
    const textarea = e.target;
    if (textarea.value.length <= maxLength) {
      setInputValue(textarea.value);
    }
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

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
        <form onSubmit={handleSubmit}>
          <span
            className={`pointer-events-none text-white ${charsLeft < 20 ? "inline-block" : "hidden"} `}
          >
            characters left: {charsLeft}
          </span>
          <div className="flex flex-col justify-center">
            <textarea
              className="w-64 rounded-md p-2"
              style={{
                overflowY: "hidden",
                minHeight: "40px",
                height: "auto",
                resize: "none",
              }}
              name="prompt"
              type="text"
              value={inputValue}
              placeholder="Ask about Tom"
              maxLength={maxLength}
              onChange={handleInputChange}
            />

            <button
              className="mt-3 w-24 rounded bg-yellow-300 p-2 hover:bg-yellow-400"
              type="submit"
            >
              Send
            </button>
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
