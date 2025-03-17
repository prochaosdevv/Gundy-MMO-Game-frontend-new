'use client';
import { ContractContext } from '@/contexts/ContractContext';
import { API_URL } from '@/utils/config';
import { truncateAddress } from '@/utils/functions';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react'

const FriendListRow = ({user,getFriends}) => {
 const { activeChatTab, setActiveChatTab,setActiveChatId, chatOpen, setChatOpen,setActiveChatUsername } =
    useContext(ContractContext);
    const handleOPenChat=()=>{
      setActiveChatUsername(user?.username)
        setChatOpen(true)
        // setTimeout(() => {
            setActiveChatTab("private")
            setActiveChatId(user._id)
        // }, 1000);
    }
const [loader,setLoader]=useState(false)

    const unFriend = async () => {
      setLoader(true)
        const access_token = window.localStorage.getItem("access_token");
        try {
          const res = await axios.post(`${API_URL}/unfriend`, {
            friendId:user?._id,

          },{
            headers: {
                "x-access-token": access_token,
              },
          });
          if (res?.status === 200) {
            setLoader(false)
            getFriends()
          }
      
        } catch (err) {
          console.log(err);
          if (err.response?.status === 404) {
            console.log(err);
            setLoader(false)
          }
        }
      };
    



  return (
    <div className="frnd_list_item offline">
    <div className="frnd_list_item_left">
        <img src="/assets/offline.png" alt="Offline" />
        <p>{user ? truncateAddress(user.username) : null}</p>
    </div>
    <div className="frnd_list_item_right" >
    <img src="/assets/frnd_chat_btn.png" alt="Chat" style={{cursor:"pointer"}} onClick={handleOPenChat} />
    {loader ? (
      <div className="icon-btn" style={{width:"40px",height:"40px"}}>
      <CircularProgress
                    sx={{
                      width: "16px !important",
                      height: "16px !important",
                      color: "#fff !important",
                    }}
                  />
        </div>
               
                ) : (
        <img src="/assets/remove_btn.png" alt="Remove" style={{cursor:"pointer"}}  onClick={() => unFriend()}  />
                )}
                  
        
    </div>
</div>
  )
}

export default FriendListRow