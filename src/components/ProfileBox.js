'use client';

import { ContractContext } from "@/contexts/ContractContext";
import { truncateAddress } from "@/utils/functions";
import { useContext } from "react";
import { ConnectWalletButton } from "./CustomConnectButton";
import { useAccount } from "wagmi";

const ProfileBox = () => {
    const {user}=useContext(ContractContext)
    console.log(user)
  const {address,isConnected}=useAccount()
    
    const closeBox = () => {
        document.getElementById("profile_box").style.display = "none";
    }
    return (
        <>
         <div id="profile_box" className="profile-container" style={{"display": "none"}}>
   <div className="cross_box profile_cross" onClick={() => closeBox()}>
    <div className="cross_bg">
        <img src="/assets/cross.png" className="cross_btn" alt="Close" id="profile_close_btn" />
        
    </div>
</div>
{
    address ?

<div className="flex_box">
    <div className="left_box">
      <img src="/assets/Gundy.png" className="icon-img" alt="Friends" />
    </div>
    <div className="right_box">
     <p className="username" style={{paddingTop: "12px"}}>Username</p>
      <div className="name_box">{user?.username?truncateAddress(user?.username):"NA"}</div>
      <p className="username">Stats</p>
      <div className="profile_text_box">
        <div className="profile_subpanel" style={{paddingBottom: "10px"}}>
            <div>$GWORLD earned</div>
            <div>1,056,123</div>
        </div>
        <div className="profile_subpanel" style={{paddingBottom: "10px"}}>
            <div>Items Collected</div>
            <div>10/56</div>
        </div>
        <div className="profile_subpanel" style={{paddingBottom: "10px"}}>
            <div>Playtime</div>
            <div>00d01h06m</div>
        </div>
        <div className="profile_subpanel">
            <div>Member Since</div>
            <div>{new Date(user?.createdAt).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  </div>
:
    <ConnectWalletButton />
}

  
 
  </div>
        </>
    )
}

export default ProfileBox;
