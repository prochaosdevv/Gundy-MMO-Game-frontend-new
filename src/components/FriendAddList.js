"use client";
import React, { useContext, useState } from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import axios from "axios";
import { API_URL } from "@/utils/config";
import { ContractContext } from "@/contexts/ContractContext";
import { HourglassBottom } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const FriendAddList = ({ friend }) => {
  const { getAllUsers, user } = useContext(ContractContext);

  const [loader, setLoader] = useState(false);

  const sendFriendRequest = async () => {
    setLoader(true);
    const access_token = window.localStorage.getItem("access_token");
    try {
      const res = await axios.post(
        `${API_URL}/send-request`,
        {
          receiverId: friend?._id,
        },
        {
          headers: {
            "x-access-token": access_token,
          },
        }
      );
      if (res?.status === 200) {
        setLoader(false);
        getAllUsers();
      }
    } catch (err) {
      setLoader(false);
      console.log(err);
      if (err.response?.status === 404) {
        console.log(err);
      }
    }
  };

  return (
    <div className="frnd_list_item offline">
      <div className="frnd_list_item_left">
        <img src="/assets/offline.png" alt="Offline" />
        <p>{friend?.username}</p>
      </div>

      {friend.friendRequests.includes(user?._id) ? (
        <div className="icon-btn">
          <HourglassBottom />
        </div>
      ) : loader ? (
        <div className="icon-btn">
          <CircularProgress
            sx={{
              width: "16px !important",
              height: "16px !important",
              color: "#fff !important",
            }}
          />
        </div>
      ) : (
        <div className="icon-btn" onClick={sendFriendRequest}>
          <ArrowOutwardIcon />
        </div>
      )}
    </div>
  );
};

export default FriendAddList;
