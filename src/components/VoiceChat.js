"use client";
import { useContext, useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { ContractContext } from "@/contexts/ContractContext";
import { useAccount } from "wagmi";
import axios from "axios";
import { API_URL } from "@/utils/config";




export default function VoiceChat() {
    const [joined, setJoined] = useState(false);
    
    const {activeRoom,user,setActiveVoiceUsers} = useContext(ContractContext)
    const [localAudioTrack, setLocalAudioTrack] = useState(null);
    const [activeClient, setActiveClient] = useState(null);
  
    const setupAgora = async (token) => {
        const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        const APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID; // Replace with your Agora App ID
        // alert(user._id)
        const TEMP_TOKEN = token; // Get from Agora console
        const CHANNEL_NAME = activeRoom;
        const UID = user._id;
        await client.join(APP_ID, CHANNEL_NAME, TEMP_TOKEN, UID);
        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        await client.publish([audioTrack]);
        setLocalAudioTrack(audioTrack);
        setJoined(true);
        setActiveVoiceUsers(client.remoteUsers.length + 1)
        client.on("user-published", async (user, mediaType) => {
            if (mediaType === "audio") {
                await client.subscribe(user, mediaType);
                user.audioTrack.play();
            }
        });

        client.on("user-joined", (user) => {
            console.log("User Joined:", user.uid);
            if(joined){
                setActiveVoiceUsers(client.remoteUsers.length + 1); // +1 includes self
            }
            else{
            setActiveVoiceUsers(client.remoteUsers.length); // +1 includes self

            }
        });

        // ✅ Update active users count when someone leaves
        client.on("user-left", (user) => {
            console.log("User Left:", user.uid);
            if(joined){
                setActiveVoiceUsers(client.remoteUsers.length + 1); // +1 includes self
            }
            else{
            setActiveVoiceUsers(client.remoteUsers.length); // +1 includes self

            }
        });
        setActiveClient(client)
    };


    useEffect(() => {
     
     return () => {
            if (joined) {
                activeClient.leave();
                localAudioTrack?.close();
            }
        };
    }, [joined]);

    const leaveCall = async () => {
        localAudioTrack?.close();
        await activeClient.leave();      
        activeClient.removeAllListeners();       
        setActiveClient(null) 
        setJoined(false);
        setActiveVoiceUsers(activeClient.remoteUsers.length)
    };

    const joinCall = async () => {  
// alert("hi")
          const access_token =    window.localStorage.getItem("access_token")  ;
                
                    try {
                      const res = await axios.get(`${API_URL}/get/agora/token?channel=${activeRoom}`, {
                        headers: {
                          "x-access-token": access_token,
                        },
                      });
                   
                      if (res.status === 200) {
                        if(res.data.status){
                            setupAgora(res.data.token)
                        }
                        
                      }
                    } catch (err) {
                        console.log(err)
                    }
        
    }
const {address}=useAccount()
    return (

        address?(
            joined ? (
                <div
                    onClick={() => leaveCall()}
                    className="join-btn"
                >
                    Leave Call
                </div>
            ) : activeRoom && user._id ? (
                <div className="join-btn" onClick={() =>  joinCall()}> Join</div>
            ) : <></> 
            
        )  
        :
        <div style={{height:"25px"}} />   
    );
}
