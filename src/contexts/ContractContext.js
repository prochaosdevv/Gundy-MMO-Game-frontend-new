"use client";
import { API_URL } from "@/utils/config";
import axios from "axios";
import React, { createContext, useState, ReactNode, useEffect, useRef } from "react";
import { useAccount } from "wagmi";



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
  const [airTokBot, setAirTokBot] = useState(false);
  
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

const {address,isConnected}=useAccount()
      const createUser = async () => {
        try {
          const res = await axios.post(`${API_URL}/create/user`, {
            address:address,
          });
          if (res?.status === 201) {
            
              setUser(res.data.data)
             
              window.localStorage.setItem("access_token", res.data.token);
              window.localStorage.setItem("username", res.data.data.username);
           
          }
          if (res?.status === 200) {
           
               setUser(res.data.data)
               window.localStorage.setItem("access_token", res.data.token);
               window.localStorage.setItem("username", res.data.data.username);
         
          }
        } catch (err) {
          console.log(err);
          if (err.response?.status === 404) {
            console.log(err);
          }
        }
      };
      useEffect(() => {
        if (address && isConnected) {
          createUser();
        }
      }, [isConnected, address]);

useEffect(()=>{
    getAllUsers()
    getAd()
},[])
  return (
    <ContractContext.Provider value={{user,allUser,getMe,getAllUsers,setFreindOpen,setChatOpen,chatOpen,freindOpen,activeChatTab,activeRoom,setActiveRoom,activeRoomRef, setActiveChatId,activeChatId,ad, setActiveChatTab,showChatIcon, setShowChatIcon,activeChatUsername, setActiveChatUsername,setActiveVoiceUsers,activeVoiceUsers,airTokBot, setAirTokBot}}>
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContextProvider;
