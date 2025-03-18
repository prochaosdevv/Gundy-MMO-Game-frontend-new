"use client";
import { API_URL } from "@/utils/config";
import axios from "axios";
import React, { createContext, useState, ReactNode, useEffect, useRef } from "react";



// Create the context
export const ContractContext = createContext();


const ContractContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [freindOpen, setFreindOpen] = useState(false);
  const [activeChatTab, setActiveChatTab] = useState("room")
  const [activeChatId, setActiveChatId] = useState(null)
  const [ad, setAd] = useState(null)
  const [activeRoom, setActiveRoom] = useState("landing")
  const [activeChatUsername, setActiveChatUsername] = useState(null)
  const activeRoomRef  = useRef(activeRoom)
  const [activeVoiceUsers, setActiveVoiceUsers] = useState(0);
  
  useEffect(() => {
    activeRoomRef.current = activeRoom; // Always update ref when state changes
}, [activeRoom]);
    // const access_token =  window.localStorage.getItem("access_token");

  // console.log(access_token)
 const getAd = async () => {
            const access_token =    window.localStorage.getItem("access_token")  ;
        
            try {
              const res = await axios.get(`${API_URL}/get-ad-banner`);
           
              if (res.status === 200) {
                setAd(res.data);
              }
            } catch (err) {}
          };



  const getMe = async () => {
    const access_token =    window.localStorage.getItem("access_token")  ;

    try {
      const res = await axios.get(`${API_URL}/get/user`, {
        headers: {
          "x-access-token": access_token,
        },
      });
      console.log(res)
      if (res.status === 200) {
        setUser(res.data.user);
      }
    } catch (err) {}
  };
useEffect(()=>{
  getMe()
},[])
const getAllUsers = async () => {
  
  try {
    const res = await axios.get(`${API_URL}/all/user`, {
      headers: {
        // "x-access-token": access_token,
      },
    });

    if (res.status === 200) {
      setAllUser(res.data.data);
    }
  } catch (err) {}
};
useEffect(()=>{
    getAllUsers()
    getAd()
},[])
  return (
    <ContractContext.Provider value={{user,allUser,getMe,getAllUsers,setFreindOpen,setChatOpen,chatOpen,freindOpen,activeChatTab,activeRoom,setActiveRoom,activeRoomRef, setActiveChatId,activeChatId,ad, setActiveChatTab,showChatIcon, setShowChatIcon,activeChatUsername, setActiveChatUsername,setActiveVoiceUsers,activeVoiceUsers}}>
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContextProvider;
