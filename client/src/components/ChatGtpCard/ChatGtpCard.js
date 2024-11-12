import React, { useState, useEffect, useRef } from "react";
import "./ChatGtpCard.css";
import AddIcon from "@mui/icons-material/Add";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import { sendMessageToOpenAI } from "../../openapi/OpenAi";
import CloseIcon from '@mui/icons-material/Close';

const ChatGtpCard = ({ showGtp, setshowGtp }) => {
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState([]); // Initialize as empty
  const chatsEndRef = useRef(null);

  const handleSend = async () => {
    if (input.trim()) {
      const response = await sendMessageToOpenAI(input);
      setAnswers((prev) => [
        ...prev,
        {
          question: input,
          aiAnswer: response.data.candidates[0].content.parts[0].text,
        },
      ]);
      setInput(""); // Clear input after sending
    }
  };

  const newChat = () => {
    setAnswers([]);
  };

  const handleShow = () =>{
    setshowGtp(false)
  }

  useEffect(() => {
    chatsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [answers]);

  return (
    <div className={showGtp ? "chatGtp-container" : "no-container"}>
      <div className="chatgtp-sidebar">
        <div className="chatgtp-sidebar-top">
          <img
            src="https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg"
            alt="ChatGPT Logo"
          />
          <h3>Chat GPT</h3>
        </div>
        <div className="chatgtp-sidebar-middle" onClick={newChat}>
          <AddIcon />
          <h4>New Chat</h4>
        </div>
        <div className="chatgtp-sidebar-bottom">
          <div className="chatgtp-sidebar-bottom-button">
            <ChatBubbleOutlineIcon />
            <h5>What is programming?</h5>
          </div>
          <div className="chatgtp-sidebar-bottom-button">
            <ChatBubbleOutlineIcon />
            <h5>How to use ChatGPT?</h5>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          <div className="cross" onClick={handleShow}>
          <CloseIcon style={{color:"white"}}/>
          </div>
          
          <div className="chat bot">
            <img
              src="https://static.vecteezy.com/system/resources/previews/024/558/808/original/openai-chatgpt-logo-icon-free-png.png"
              alt="Bot"
            />
            <p>Hello, I am ChatGPT. How can I help you?</p>
          </div>

          {answers.map((message, index) => (
            <div key={index}>
              <div className="chat">
                <img
                  src="https://www.kevinashleyphotography.com/wp-content/uploads/2015/11/person.jpg"
                  alt="User"
                />
                <p>{message.question}</p>
              </div>
              <div ref={chatsEndRef} />
              <div className="chat bot">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/024/558/808/original/openai-chatgpt-logo-icon-free-png.png"
                  alt="Bot"
                />

                <p>{message.aiAnswer}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a Message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSend}>
              <SendIcon style={{ color: "rgb(208, 208, 208)" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGtpCard;
