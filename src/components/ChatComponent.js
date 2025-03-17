'use client';

import { ContractContext } from '@/contexts/ContractContext';
import { API_URL } from '@/utils/config';
import { truncateAddress } from '@/utils/functions';
import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';

const ChatComponent = ({ chatId }) => {
 const { user , setActiveChatId,activeChatUsername,} =
    useContext(ContractContext);
    const [messages, setMessages] = useState([]);
    const [input,setInput] = useState(null)

        const getMessage = async () => {
            const access_token =    window.localStorage.getItem("access_token")  ;
        
            try {
              const res = await axios.get(`${API_URL}/get/messages/${chatId}`, {
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
        
        try {
          const res = await axios.post(`${API_URL}/send/message`, { 
                receiver: chatId,
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
                      <div className="chat-box" style={{height:chatId&&"59vh"}}>
                      <Box sx={{
  display: "flex",
  justifyContent:"space-between",
  alignItems:"center",
  pb:"15px",
  borderBottom:"1px solid gray",
      "& span":{
        background: "linear-gradient(180deg, #254cf9, #000000b0)",
  padding: "5px 15px",
  borderRadius: "20px",
  fontSize: "14px",
  border: "2px solid #13192d",
  color:"rgb(255 255 255 / 70%)",
  cursor:"pointer"
      }
            }}>
            {/* <Typography>{activeChatUsername}</Typography> */}
            <Box sx={{
              display: "flex",
  justifyContent:"space-between",
  alignItems:"center",
  gap:"5px",
 
  "& img":{
    width:"35px",
    height:"35px",
    border: "2px solid #70D8FF",
    borderRadius:"50%"

  }
            }}>
            <img src="/assets/icons/vc.png" alt="User" />
            <div className="name_box" style={{fontSize:"16px",marginBottom:"0"}}> {" "}{activeChatUsername?truncateAddress(activeChatUsername):"NA"}</div>
            </Box>
            <span className='' onClick={() => setActiveChatId(null)}>Back</span>
            </Box>
         {messages.map((msg, index) => (
       
            <div
              key={index}
              className={`message ${msg.sender == user._id   ? "" : "incoming" }`}
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0",
                padding:"10px 0 0",
                justifyContent: msg.sender === user._id    ?   "flex-end" :  "flex-start",
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
          textAlign: msg.sender === user._id ? "right" : "left",
          lineHeight:"normal",
          fontWeight:"bold"
        }}
      >
         {formatMessageDate(msg.createdAt)?.date} , {formatMessageDate(msg.createdAt)?.time}
      </div>
                <div
                  className="message-text"
                  style={{
                    backgroundColor: msg.sender === user._id   ?   "#007bff" : "#e5e5e5",
                    color: msg.sender === user._id   ?  "#fff" : "#000",
                    padding: "10px",
                    borderRadius: msg.sender === user._id 
                      ?"15px 15px 0px 15px" 
                      : "15px 15px 15px 0px" ,
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
        </>
    )
}

export default ChatComponent;
