"use client";

import { ContractContext } from "@/contexts/ContractContext";
import { useContext, useEffect, useState } from "react";
import PrivateChat from "./PrivateChat";
import ChatComponent from "./ChatComponent";
import { API_URL } from "@/utils/config";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const ChatBox = () => {
  const { activeChatTab,activeChatId,activeRoom,setActiveChatTab, chatOpen, setChatOpen } =
    useContext(ContractContext);
    const [messages, setMessages] = useState([]);
    const [conversation, setConversation] = useState([]);
    

    const [input, setInput] = useState("");
  
     const getMessage = async () => {
            const access_token =    window.localStorage.getItem("access_token")  ;
          
            try {
              const res = await axios.get(`${API_URL}/get/room/messages/${activeRoom}`, {
                headers: {
                  "x-access-token": access_token,
                },
              });
           
              if (res.status === 200) {
                setMessages(res.data.messages);
              }
            } catch (err) {}
          };
        useEffect(()=>{
          let interval =   setInterval(() => {
                getMessage()                
            }, 2000);

            return () => {
                clearInterval(interval)
            }
        },[]) 
         
    const [loader,setLoader]=useState(false)
    const sendMessage = async () => {
      if (input.trim() === "") return;
      setLoader(true)
    
        const access_token =    window.localStorage.getItem("access_token")  ;
        if(!activeRoom){
            return;
        }
        try {
          const res = await axios.post(`${API_URL}/send/room/message`, { 
             room: activeRoom,
                text: input            
          },
          {
            headers: {
            "x-access-token": access_token,              
          }});
       
          if (res.status === 200) {
            setLoader(false)
            setMessages(res.data.messages);
            setInput("")
          }
        } catch (err) {
          setLoader(false)
        }
      };


         const getConversation = async () => {
                  const access_token =    window.localStorage.getItem("access_token")  ;
              
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
              useEffect(()=>{
                let interval =   setInterval(() => {
                    getConversation()                
                  }, 2000);
      
                  return () => {
                      clearInterval(interval)
                  }
              },[]) 
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
  return (
    <>
      <div
        id="chatbox"
        className="chat-container"
        // style={{width:chatOpen?"320px":"0px"}}
      >
        <div>
          <div
            className="chat-tabs"
            // style={{visibility:chatOpen?"visible":"none",overFlow:chatOpen?"auto":"hidden"}}
          >
            <div
              className={`tab ${activeChatTab=="room"?"active":""}`}
              onClick={() => setActiveChatTab("room")}
            >
              Room Chat
            </div>
            <div className={`tab ${activeChatTab=="private"?"active":""}`} onClick={() => setActiveChatTab("private")}>
              Private Chats
            </div>
          </div>

          <div
      className={`chat-content ${activeChatTab === "room" ? "active" : ""}`}
    >
      <div className="chat-container-inner">
      <div className="vc-section">
                <span className="vc-label">VC:</span>
                <div className="vc-avatars">
                  <img src="/assets/icons/vc.png" alt="User" />
                  <img src="/assets/icons/vc.png" alt="User" />
                  <img src="/assets/icons/vc.png" alt="User" />
                </div>
                <div className="join-btn">Join</div>
              </div>
        <div className="chat-box" style={{paddingTop:"0"}}>
        {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender}`}
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0",
                padding:"10px 0 0",
                justifyContent: msg.sender === "incoming" ? "flex-start" : "flex-end",
                borderBottom:"none"
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
          // textAlign: msg.sender === user._id ? "right" : "left",
          lineHeight:"normal",
          fontWeight:"bold"
        }}
      >
         {formatMessageDate(msg.createdAt)?.date} , {formatMessageDate(msg.createdAt)?.time}
      </div>
                <div
                  className="message-text"
                  style={{
                    backgroundColor: msg.sender === "incoming" ? "#e5e5e5" : "#007bff",
                    color: msg.sender === "incoming" ? "#000" : "#fff",
                    padding: "10px",
                    borderRadius: msg.sender === "incoming" 
                      ? "15px 15px 15px 0px" 
                      : "15px 15px 0px 15px",
                    fontSize: "14px",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="chat_main_box">
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <div className="send-btn" onClick={sendMessage}>
            {
              loader?
                   <CircularProgress
                                  sx={{
                                    width: "16px !important",
                                    height: "16px !important",
                                    color: "#fff !important",
                                  }}
                                />
                                :"Send"
            }
            
            </div>
          </div>
        </div>
      </div>
    </div>

          <div
            className="chat-content"
            style={{
              display: activeChatTab === "private" ? "block" : "none",
              position: "relative",
            }}
          >
            <div className="chat-container-inner">
            

            
                {
                    activeChatId ?
                    <ChatComponent chatId={activeChatId} /> :
                    <>
                      <div className="chat-box">
                        {
                            conversation.map((v,index) => {
                                return <PrivateChat chat={v} key={index}/>
                            })
                        }

                        </div>               
                    </>
                }
          
          
              </div>
            </div>
          </div>
        </div>

        <div className="chat-bubble" onClick={() => setChatOpen(!chatOpen)}>
          <div className="icon_wrapper"  >
            <img src="/assets/chat_bg1.png" className="icon_bg" alt="chat_bg" />
            <img src="/assets/chat_icon.png" className="icon_chat" alt="chat" />
          </div>
        </div>
    
    </>
  );
};

export default ChatBox;
