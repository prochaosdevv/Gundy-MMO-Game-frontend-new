'use client';

// import GameComponent from "@/components/GameComponent";
import Image from "next/image";
import dynamic from 'next/dynamic'
import { Suspense, useContext } from "react";
import MenuBar from "@/components/MenuBar";
// import ChatBox from "@/components/ChatBox";
// import FriendBox from "@/components/FriendBox";
// import EmoteBox from "@/components/EmoteBox";
// import ProfileBox from "@/components/ProfileBox";
// import SettingBox from "@/components/SettingBox";
// import WalletBox from "@/components/WalletBox";
// import PopupBox from "@/components/PopupBox";
import { ContractContext } from "@/contexts/ContractContext";
import { Box } from "@mui/material";
import BankContainer from "@/components/BankContainer";

const GameComponent = dynamic(
  () => import('@/components/GameComponent'),
  { ssr: false }
)
const ChatBox = dynamic(
  () => import('@/components/ChatBox'),
  { ssr: false }
)

const FriendBox = dynamic(
  () => import('@/components/FriendBox'),
  { ssr: false }
)

const ProfileBox = dynamic(
  () => import('@/components/ProfileBox'),
  { ssr: false }
)

const SettingBox = dynamic(
  () => import('@/components/SettingBox'),
  { ssr: false }
)

const WalletBox = dynamic(
  () => import('@/components/WalletBox'),
  { ssr: false }
)

const EmoteBox = dynamic(
  () => import('@/components/EmoteBox'),
  { ssr: false }
)

const PopupBox = dynamic(
  () => import('@/components/PopupBox'),
  { ssr: false }
)


export default function Home() {
   const {chatOpen,setChatOpen,ad,activeRoom,showChatIcon}=useContext(ContractContext)
   console.log(activeRoom,ad);
   
  return (
    <Suspense>
    <div id="pixi-container" style={{position:"relative"}}>
      
        <GameComponent />
        <MenuBar />
        <ChatBox />
        <FriendBox />
        <EmoteBox />
        <ProfileBox />
        <SettingBox />
        <WalletBox />
        <PopupBox />
        {
        (activeRoom == "landing" &&  ad) &&
        <Box 
  sx={{
    width: "316px",
    height: "148px",
    position: "absolute",
    top: "23.5%",
    left: "593px",
    background: "#ff9e00f5",
    border: "6px solid #4e3855",
    borderRadius: "5px 5px 0 0",
    transform: "rotate(0.5deg)",
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    alignItems: "center",
    p: "10px",
    "& img": {
      width: "100%",
      height: "100%",
    },
    "& p": {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    alignItems: "center", 
    fontSize:"24px",
    fontWeight:"bold"
    },
  }}

  id="adBanner"
>
  <a href={ad.link} target="_blank" >
  <img src={ad.imageUrl} alt="Ad" />
  </a>
  
</Box>
        }
        {
        (activeRoom == "bank") &&
        <Box 
  sx={{
    width: "600px",
    height: "auto",
    position: "absolute",
    top: "16%",
    right: "110px",
    background: "#d2d8f3",
    // border: "6px solid #4e3855",
    borderRadius: "15px",
    // transform: "rotate(0.5deg)",
  
    // p: "10px",
  
  
  }}


>
<BankContainer/>


  
</Box>
        }
 {/* {showChatIcon && !chatOpen&&<Box sx={{
  cursor:"pointer",
  position: "absolute",
  top: "52%",
  left: "-6px",

 }} onClick={() => setChatOpen(!chatOpen)}>
          <div className="icon_wrapper"  id="chatIconLeft">
            <img src="/assets/chat_bg1.png" className="icon_bg" alt="chat_bg" />
            <img src="/assets/chat_icon.png" className="icon_chat" alt="chat" />
          </div>
        </Box>} */}

    </div>
    </Suspense>
  );
}
