'use client';

import { useContext, useEffect, useState } from "react";
import FriendListRow from "./FriendListRow";
import FriendPendingRow from "./FriendPendingRow";
import FriendAddList from "./FriendAddList";
import { API_URL } from "@/utils/config";
import axios from "axios";
import { ContractContext } from "@/contexts/ContractContext";
import { useAccount } from "wagmi";
import { ConnectWalletButton } from "./CustomConnectButton";
import { Box } from "@mui/material";

const FriendBox = () => {
    const [activeTab, setActiveTab] = useState("frnd_first_panel");

    const closeBox = () => {
        document.getElementById("friend_popup").style.display = "none";
    };
 const {allUser,user:loggedUser}=useContext(ContractContext)
  const {address,isConnected}=useAccount()


 const [searchQuery, setSearchQuery] = useState("");
 const [pendingFriends, setPendingFriends] = useState([]);
 const [friends, setFriends] = useState([]);
 
 // Filter users based on search input

 
 const filteredUsers = allUser?.filter(user =>
    user?.username.toLowerCase().includes(searchQuery.toLowerCase()) &&
    user?.address !== address &&
    !loggedUser?.friendRequests.includes(user?._id) &&
    !loggedUser?.friends.includes(user?._id)
);



 const pendingFriendRequest = async () => {
     const access_token =  window.localStorage.getItem("access_token") ;

   try {
     const res = await axios.get(`${API_URL}/pending-friends`, {
       headers: {
         "x-access-token": access_token,
       },
     });

     if (res.status === 200) {
       setPendingFriends(res.data);
     }
   } catch (err) {}
 };
 useEffect(() => {
    if (loggedUser?.address) {
      const interval = setInterval(() => {
        pendingFriendRequest();
        getFriends();
      }, 3000);
  
      return () => clearInterval(interval); 
    }
  }, [loggedUser?.address]);
  



const getFriends = async () => {
  const access_token =  window.localStorage.getItem("access_token") ;
  try {
    const res = await axios.get(`${API_URL}/friends`, {
      headers: {
        "x-access-token": access_token,
      },
    });

    if (res.status === 200) {
      setFriends(res.data);
    }
  } catch (err) {}
};
 



    return (
        <>
            <div id="friend_popup" className="friend-container" style={{ display: "none" }}>
                <div className="cross_box profile_cross" onClick={closeBox}>
                    <div className="cross_bg">
                        <img src="/assets/cross.png" className="cross_btn" alt="Close" />
                    </div>
                </div>
                {
                    address ?
                    <>
                    

                {/* Tabs */}
                <div className="friend_tab">
                    <img
                        // src="/assets/frnd_list_btn.png"
                        src={`${activeTab === "frnd_first_panel" ? "/assets/friend_list_active.png" : "/assets/frnd_list_btn.png"}`}
                        className={`frnd_list_btn ${activeTab === "frnd_first_panel" ? "active" : ""}`}
                        alt="Friends List"
                        onClick={() => setActiveTab("frnd_first_panel")}
                    />
                    <img
                        // src="/assets/pending_btn.png"
                        src={`${activeTab === "frnd_second_panel" ? "/assets/pending_active.png" : "/assets/pending_btn.png"}`}
                        className={`pending_btn ${activeTab === "frnd_second_panel" ? "active" : ""}`}
                        alt="Pending Requests"
                        onClick={() => setActiveTab("frnd_second_panel")}
                    />
                    <img
                        // src="/assets/add_frnd_btn.png"
                        src={`${activeTab === "frnd_third_panel" ? "/assets/add_friend_active.png" : "/assets/add_frnd_btn.png"}`}
                        className={`add_frnd_btn ${activeTab === "frnd_third_panel" ? "active" : ""}`}
                        alt="Add Friend"
                        onClick={() => setActiveTab("frnd_third_panel")}
                    />
                </div>

                {/* Panels */}
                <div className="frnd_panel" style={{ display: activeTab === "frnd_first_panel" ? "block" : "none" }}>
                    {/* Friends List */}
                    {friends?.length>0?friends.map((user, index) => (
                      <FriendListRow getFriends={getFriends} key={index}  user={user}/>
                   
                    ))
                    :
                    <p style={{ textAlign: "center", color: "#000",paddingTop:"2rem",fontSize:"20px",fontWeight:"600" }}>Friends Not Found.</p>}
                </div>
             

                <div className="frnd_panel" style={{ display: activeTab === "frnd_second_panel" ? "block" : "none" }}>
                    {/* Pending Requests */}
                    {
                        pendingFriends?.length>0?pendingFriends.map((user, index) => (
                            <FriendPendingRow pendingFriendRequest={pendingFriendRequest} key={index} user={user}/>
                    )):
                    <p style={{ textAlign: "center", color: "#000",paddingTop:"2rem",fontSize:"20px",fontWeight:"600" }}>Not Requested yet.</p>
                    }
                </div>

                <div className="frnd_panel" style={{ display: activeTab === "frnd_third_panel" ? "block" : "none",lineHeight:"0" }}>
                    {/* Search Box */}
                    <div className="search_input_box">
                        <img src="/assets/search_icon.png" alt="Search" />
                        <input type="text" placeholder="Search by Username..."  value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                    {/* <div className="frnd_panel"> */}
                    {/* Friends List */}
                    {filteredUsers?.length > 0 ? (
                filteredUsers.map((user, index) => (
                    <FriendAddList friend={user} key={index} />
                ))
            ) : (
                <p style={{ textAlign: "center", color: "#000",paddingTop:"2rem",fontSize:"20px",fontWeight:"600" }}>No users found</p>
            )}
                {/* </div> */}
                </div>

                </>
                    :
                    <Box sx={{
        p:"5rem"
    }}>
    <ConnectWalletButton />
    </Box>
                }
            </div>
        </>
    );
};

export default FriendBox;
