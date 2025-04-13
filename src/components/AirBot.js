'use client';

import { useContext, useEffect, useRef, useState } from "react";
import { ContractContext } from "@/contexts/ContractContext";
import { Box, CircularProgress } from "@mui/material";
import { ConnectWalletButton } from "./CustomConnectButton";
import { useAccount } from "wagmi";
import { API_URL } from "@/utils/config";
import axios from "axios";

const AirBot = () => {
  const { address } = useAccount();
  const { setAirTokBot , airTokBot,user} = useContext(ContractContext);
  const messagesEndRef = useRef(null);
  const [input, setInput] = useState("");
  const [loader, setLoader] = useState(false);
  const [messages, setMessages] = useState([]);
  // const sendMessage = async () => {
  //   if (input.trim() === "") return;
  //   setLoader(true);
  //   // const newMessage = { sender: "user", text: input, createdAt: new Date() };
  //   // setMessages([...messages, newMessage]);
  //   // streamChatRequest()
  //   // sendChatRequest()
  //   streamMessageChat()
  //   setInput("");
  //   setLoader(false);
  // };
  const formatMessageDate = (date) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return { date: new Date(date).toLocaleDateString(), time: new Date(date).toLocaleTimeString([], options) };
  };

      useEffect(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);

    async function sendChatRequest() {
      const response = await fetch('https://app.airtok.ai/api/v1/npc/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'e682a0c7-4abc-4d68-8b59-1b209b0dc1f6'
        },
        body: JSON.stringify({
          groupId: '-1002212916980',
          userPrompt: input,
          userId: user._id
        })
      });
      
      const data = await response.json();
      console.log(data.response);
      
      // Store userId for future requests
      localStorage.setItem('chatUserId', data.userId);
    }

    
    const getMessage = async () => {
      const access_token = window.localStorage.getItem("access_token");
  
      try {
        const res = await axios.get(`${API_URL}/get/airtok/messages`, {
          headers: {
            "x-access-token": access_token,
          },
        });
  
        if (res.status === 200) {
  
          if (messagesEndRef.current && res.data.messages.length != messages.length) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
          }
          setMessages(res.data.messages);
  
  
        }
      } catch (err) { }
    };
    const [intervalTimer, setIntervalTimer] = useState(0);

    useEffect(() => {
      if (airTokBot && user) {
        getMessage();
      }
    }, [intervalTimer])

    useEffect(() => {
      let interval = setInterval(() => {
        setIntervalTimer(new Date().getTime())
      }, 2000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);

      const sendMessage = async () => {
        if (input.trim() === "") return;
        setLoader(true)
    
        const access_token = window.localStorage.getItem("access_token");
    // alert("hi")
        try {
          const res = await axios.post(`${API_URL}/send/airtok/message`, {           
            text: input
          },
            {
              headers: {
                "x-access-token": access_token,
              }
            });
    
          if (res.status === 200) {
            setLoader(false)
            setMessages(res.data.messages);
            setInput("")
    
          }
        } catch (err) {
          setLoader(false)
        }
      };
  
   
  return (
    <div id="air_bot" className="air_bot">
      <div className="cross_box" style={{paddingRight:"5px",zIndex: 999999,position:"relative"}}  onClick={() => setAirTokBot(false)}>
        <div className="cross_bg" style={{position:"relative"}}>
          <img src="/assets/cross.png" className="cross_btn" alt="Close" />
        </div>
      </div>
      <p className="chat-header" style={{marginTop:"-15px"}}>AIRTOK BOT</p>
      <div className="air_bot_box_main">
        <div className="chat-box_">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === user._id ? "received" : "sent"}`}>
              <div className="message-content">
                <div className="message-time">
                  {formatMessageDate(msg.createdAt).date}, {formatMessageDate(msg.createdAt).time}
                </div>
                <div className="message-text">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat_main_box_">
          {address ? (
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <div className="send-btn" onClick={sendMessage}>
                {loader ? (
                  <CircularProgress sx={{ width: "16px !important", height: "16px !important", color: "#fff !important" }} />
                ) : (
                  "Send"
                )}
              </div>
            </div>
          ) : (
            <Box px={"1rem"}>
              <ConnectWalletButton />
            </Box>
          )}
        </div>
      </div>
      <style jsx>{`
        .chat-header {
          font-size: 20px;
          color: #000;
          opacity: 0.8;
          padding-bottom: 10px;
          text-align: center;
          font-weight: 600;
        }
    
        .message {
          display: flex;
          align-items: center;
          padding: 8px 0;
          justify-content: flex-start;
        }
        .message.sent {
          justify-content: flex-start;
        }
        .message.received {
          justify-content: flex-end;
        }
        .message-content {
          max-width: 55%;
          word-wrap: break-word;
        }
        .message-time {
          font-size: 10px;
          color: #999;
          margin-top: 5px;
          text-align: right;
          font-weight: bold;
        }
        .message-text {
          padding: 10px;
          border-radius: 15px;
          font-size: 14px;
        }
        .message.sent .message-text {
          background-color: #007bff;
          color: #fff;
          border-radius: 15px 15px 0 15px;
        }
        .message.received .message-text {
          background-color: #e5e5e5;
          color: #000;
          border-radius: 15px 15px 15px 0;
        }
      `}</style>
    </div>
  );
};

export default AirBot;