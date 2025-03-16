'use client';
import { ContractContext } from '@/contexts/ContractContext';
import { API_URL } from '@/utils/config';
import { truncateAddress } from '@/utils/functions';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react'

const FriendPendingRow = ({user,pendingFriendRequest}) => {


  const {getAllUsers}=useContext(ContractContext)
     
     const [acceptLoader, setAcceptLoader] = useState(false);
     const [rejectLoader, setRejectLoader] = useState(false);

    const accepFriendRequest = async () => {
      setAcceptLoader(true)
        const access_token = window.localStorage.getItem("access_token");
        try {
          const res = await axios.post(`${API_URL}/accept-request`, {
            requesterId:user?._id,

          },{
            headers: {
                "x-access-token": access_token,
              },
          });
          if (res?.status === 200) {
            setAcceptLoader(false)
            getAllUsers()
            pendingFriendRequest();
         
          }
      
        } catch (err) {
          setAcceptLoader(false)
          console.log(err);
          if (err.response?.status === 404) {
            console.log(err);
          }
        }
      };
    


      const rejectFriendRequest = async () => {
        setRejectLoader(true)
        const access_token = window.localStorage.getItem("access_token");
        try {
          const res = await axios.post(`${API_URL}/reject-request`, {
            requesterId:user?._id,
          },{
            headers: {
                "x-access-token": access_token,
              },
          });
          if (res?.status === 200) {
            setRejectLoader(false)
            getAllUsers()
            pendingFriendRequest();

         
          }
      
        } catch (err) {
          console.log(err);
          setRejectLoader(false)
          if (err.response?.status === 404) {
            console.log(err);
          }
        }
      };
    
  return (
    <div className="frnd_list_item" style={{ padding: "5px 10px" }}>
    <div className="frnd_list_item_left second_panel_text" style={{ gap: "1rem" }}>
        <p>{truncateAddress(user.username)}</p>
        <span>Incoming friend request</span>
    </div>
    <div className="frnd_list_item_right" style={{cursor: "pointer"}}>
    {acceptLoader ?  <div className="icon-btn" style={{width:"40px",height:"40px"}}>
              <CircularProgress
                sx={{
                  width: "16px !important",
                  height: "16px !important",
                  color: "#fff !important",
                }}
              />
            </div>
            :
        <img src="/assets/Accept.png" alt="Accept" onClick={() => accepFriendRequest()} />}
       {rejectLoader?   <div className="icon-btn" style={{width:"40px",height:"40px"}}>
                  <CircularProgress
                    sx={{
                      width: "16px !important",
                      height: "16px !important",
                      color: "#fff !important",
                    }}
                  />
                </div>
                :
        <img src="/assets/remove_btn.png" alt="Remove" onClick={() => rejectFriendRequest()} />}
    </div>
</div>
  )
}

export default FriendPendingRow