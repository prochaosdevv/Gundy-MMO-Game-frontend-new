"use client";

import { ContractContext } from "@/contexts/ContractContext";
import { useContext, useEffect, useRef, useState } from "react";
import PrivateChat from "./PrivateChat";
import ChatComponent from "./ChatComponent";
import { API_URL } from "@/utils/config";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
import VoiceChat from "./VoiceChat";
import { motion } from "framer-motion";
import { ConnectWalletButton } from "./CustomConnectButton";
import { useAccount } from "wagmi";

const ChatBox = () => {
  const {
    activeChatTab,
    activeChatId,
    activeRoom,
    setActiveChatTab,
    activeVoiceUsers,
    user,
    chatOpen,
    setChatOpen,
    showChatIcon,
  } = useContext(ContractContext);
  const [messages, setMessages] = useState([]);

  const [conversation, setConversation] = useState([]);


  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
    useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  const getMessage = async () => {
    try {
      const res = await axios.get(`${API_URL}/get/room/messages/${activeRoom}`);
  
      if (res.status === 200) {
        const messages = res.data.messages;
  
        const senderIds = [...new Set(messages.map((msg) => msg.sender))];
  
        const userPromises = senderIds.map(async (id) => {
          try {
            const userRes = await axios.get(`${API_URL}/get/single/user/${id}`);
            return { id, data: userRes.data }; 
          } catch (error) {
            console.error(`Error fetching user ${id}:`, error);
            return { id, data: null };
          }
        });
  
        
        const users = await Promise.all(userPromises);
  
   
        const userMap = users.reduce((acc, user) => {
          if (user.data) acc[user.id] = user.data;
          return acc;
        }, {});
  
        // Add user details to each message
        const updatedMessages = messages.map((msg) => ({
          ...msg,
          senderUser: userMap[msg.sender].user.username || {}, // Attach user data if available
        }));
  
        // Update state
        setMessages(updatedMessages);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

 
  
  useEffect(() => {
    let interval = setInterval(() => {
      getMessage();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);




  const [loader, setLoader] = useState(false);
  const sendMessage = async () => {
    if (input.trim() === "") return;
    setLoader(true);
    const access_token = window.localStorage.getItem("access_token");
    if (!activeRoom) {
      return;

    }
    try {
      const res = await axios.post(
        `${API_URL}/send/room/message`,
        {
          room: activeRoom,
          text: input,
        },
        {
          headers: {
            "x-access-token": access_token,
          },
        }
      );

      if (res.status === 200) {
        setLoader(false);
        // setMessages(res.data.messages);
        setInput("");
      }
    } catch (err) {
      setLoader(false);
    }
  };

  const getConversation = async () => {
    const access_token = window.localStorage.getItem("access_token");

    try {
      const res = await axios.get(`${API_URL}/get/chats`, {
        headers: {
          "x-access-token": access_token,
        },
      });

      if (res.status === 200) {
        setConversation(res.data.conversations);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (user?.address) {
      const interval = setInterval(() => {
        getConversation();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [user?.address]);

  const formatMessageDate = (timestamp) => {
    const messageDate = new Date(timestamp);
    return {
      date: messageDate.toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      time: messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const { address } = useAccount();





  return (
    <Box>
      {showChatIcon && (
        <motion.div
          className="chat-bubble"
          initial={{ left: chatOpen ? 315 : -6 }} // Ensure it starts correctly
          animate={{ left: chatOpen ? 312 : -6 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onClick={() => setChatOpen(!chatOpen)}
        >
          <div className="icon_wrapper_">
            <img src="/assets/chat_bg1.png" className="icon_bg" alt="chat_bg" />
            <img src="/assets/chat_icon.png" className="icon_chat" alt="chat" />
          </div>
        </motion.div>
      )}
      <motion.div
        id="chatbox"
        className="chat-container"
        initial={{ width: 0 }}
        animate={{ width: chatOpen ? 320 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={{
          overflow: chatOpen ? "visible" : "hidden",
        }}
      >
        <div>
          <motion.div
            className="chat-tabs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`tab ${activeChatTab == "room" ? "" : "active"}`}
              onClick={() => setActiveChatTab("room")}
            >
              Room Chat
            </div>
            <div
              className={`tab ${activeChatTab == "private" ? "" : "active"}`}
              onClick={() => setActiveChatTab("private")}
            >
              Private Chats
            </div>
          </motion.div>

          <motion.div
            className={`chat-content ${
              activeChatTab === "room" ? "active" : ""
            }`}
            style={{
              display: activeChatTab === "room" ? "block" : "none",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="chat-container-inner">
              <>
                <>
                  {user && (
                    <div className="vc-section">
                      {activeVoiceUsers > 0 && (
                        <>
                          <span className="vc-label">VC:</span>
                          <div className="vc-avatars">
                            {activeVoiceUsers == 1 ? (
                              <img src="/assets/icons/vc.png" alt="User" />
                            ) : activeVoiceUsers == 2 ? (
                              <>
                                <img src="/assets/icons/vc.png" alt="User" />
                                <img src="/assets/icons/vc.png" alt="User" />
                              </>
                            ) : activeVoiceUsers >= 3 ? (
                              <>
                                <img src="/assets/icons/vc.png" alt="User" />
                                <img src="/assets/icons/vc.png" alt="User" />
                                <img src="/assets/icons/vc.png" alt="User" />
                              </>
                            ) : (
                              <></>
                            )}
                            {activeVoiceUsers > 3 ? +activeVoiceUsers - 3 : ""}
                          </div>
                        </>
                      )}
                      <VoiceChat />
                    </div>
                  )}
                  <div className="chat-box" style={{ paddingTop: "0" }}>
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`message ${
                          msg?.sender == user?._id ? "" : "incoming"
                        }`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          margin: "0",
                          padding: "10px 0 0",
                          justifyContent:
                            msg?.sender === user?._id
                              ? "flex-end"
                              : "flex-start",
                          borderBottom: "none",
                        }}
                      >
                        {/* <img
                src={msg.sender === "incoming" ? "/assets/icons/vc.png" : "/assets/icons/user.png"}
                alt="User"
                style={{ width: "35px", height: "35px", borderRadius: "50%", margin: "0 10px" }}
              /> */}

                        <div
                          className="message-content"
                          style={{
                            maxWidth: "60%",
                            wordWrap: "break-word",
                          }}
                        >
                       
                          <div
                            style={{
                              fontSize: "10px",
                              color: "#999",
                              marginTop: "5px",
                              textAlign:
                                msg.sender === user?._id ? "right" : "left",
                              lineHeight: "normal",
                              fontWeight: "bold",
                            }}
                          >
                            {formatMessageDate(msg.createdAt)?.date} ,{" "}
                            {formatMessageDate(msg.createdAt)?.time}
                          </div>
                          <div
                            className="message-text"
                            style={{
                              backgroundColor:
                                msg.sender === user?._id
                                  ? "#007bff"
                                  : "#e5e5e5",
                              color: msg.sender === user?._id ? "#fff" : "#000",
                              padding: "5px 10px",
                              borderRadius:
                                msg.sender === user?._id
                                  ? "15px 15px 0px 15px"
                                  : "15px 15px 15px 0px",
                              fontSize: "14px",
                            }}
                          >
                             <div
                            style={{
                              fontSize: "10px",
                              color:msg.sender === user?._id ? "#fff":"#000",
                              marginTop: "5px",
                              marginBottom: "5px",
                              textAlign:
                                msg.sender === user?._id ? "right" : "left",
                              lineHeight: "normal",
                              fontWeight: "bold",
                            }}
                          >
                            {msg?.senderUser}
                          </div>
                            {msg?.text}
                          </div>
                        </div>
                      </div>
                    ))}
                      <div ref={messagesEndRef} />
                  </div>
                  {user && (
                    <div className="chat_main_box">
                      {address ? (
                        <div className="chat-input">
                          <input
                            type="text"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && sendMessage()
                            }
                          />
                          <div className="send-btn" onClick={sendMessage}>
                            {loader ? (
                              <CircularProgress
                                sx={{
                                  width: "16px !important",
                                  height: "16px !important",
                                  color: "#fff !important",
                                }}
                              />
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
                  )}
                </>
              </>
            </div>
          </motion.div>

          <motion.div
            className="chat-content"
            style={{
              display: activeChatTab === "private" ? "block" : "none",
              position: "relative",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="chat-container-inner">
              {/* <div className="chat-bubble" style={{right:"-40px"}}  onClick={() => setChatOpen(!chatOpen)}>
          <div className="icon_wrapper_"  >
            <img src="/assets/chat_bg1.png" className="icon_bg" alt="chat_bg" />
            <img src="/assets/chat_icon.png" className="icon_chat" alt="chat" />
          </div>
        </div> */}
              <>
                {!address ? (
                  <Box
                    sx={{
                      p: "1.5rem",
                    }}
                  >
                    <ConnectWalletButton />
                  </Box>
                ) : (
                  <>
                    {activeChatId ? (
                      <ChatComponent chatId={activeChatId} />
                    ) : (
                      <>
                        <div className="chat-box">
                          {conversation.map((v, index) => {
                            return <PrivateChat chat={v} key={index} />;
                          })}
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Box>
  );
};

export default ChatBox;
