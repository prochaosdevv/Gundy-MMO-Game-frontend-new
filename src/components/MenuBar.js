'use client';

import { ContractContext } from "@/contexts/ContractContext";
import { useContext, useEffect, useState } from "react";

const MenuBar = () => {
  const {setChatOpen,chatOpen,setQuickChat, setAirTokBot,airTokBot}=useContext(ContractContext)
  const [quickText,setQuickText] = useState("")
  const handleAirBotClick = () => {
    setAirTokBot(!airTokBot)
    }
  const handleProfileIconClick = () => {
        const box = document.getElementById("profile_box");
        if (box.style.display === "block") {
          box.style.display = "none";
        } else {
          box.style.display = "block";
          document.getElementById("popupBox").style.display = "none";
          document.getElementById("setting_box").style.display = "none";
          document.getElementById("emote_box").style.display = "none";
          document.getElementById("wallet_box").style.display = "none";
          document.getElementById("friend_popup").style.display = "none";
        }
    }

    const  handlePopupIconClick = () => {
        if (document.getElementById("popupBox").style.display == "block") {
            document.getElementById("popupBox").style.display = "none";
          } else {
            document.getElementById("popupBox").style.display = "block";
          }
    }

    const handleChaticonClick = () => {
         if (document.getElementById("chatbox").style.display == "block") {
             document.getElementById("chatbox").style.display = "none";
        } else {
          document.getElementById("chatbox").style.display = "block";
        }
    }

    const handleSettingsiconClick = () => {
        const box = document.getElementById("setting_box");
        if (box.style.display === "block") {
          box.style.display = "none";
        } else {
          box.style.display = "block";
          document.getElementById("popupBox").style.display = "none";
          document.getElementById("wallet_box").style.display = "none";
          document.getElementById("emote_box").style.display = "none";
          document.getElementById("profile_box").style.display = "none";
        }
    }

    const  handleWalleticonClick = () => {
        const box = document.getElementById("wallet_box");
        if (box.style.display === "block") {
          box.style.display = "none";
        } else {
          box.style.display = "block";
          document.getElementById("popupBox").style.display = "none";
          document.getElementById("setting_box").style.display = "none";
          document.getElementById("emote_box").style.display = "none";
          document.getElementById("profile_box").style.display = "none";
          document.getElementById("friend_popup").style.display = "none";
        }
    }

    const  handleEmoteiconClick = () =>  {
        const box = document.getElementById("emote_box");
        if (box.style.display === "block") {
          box.style.display = "none";
        } else {
          box.style.display = "block";
          document.getElementById("popupBox").style.display = "none";
          document.getElementById("setting_box").style.display = "none";
          document.getElementById("wallet_box").style.display = "none";
          document.getElementById("profile_box").style.display = "none";
          document.getElementById("friend_popup").style.display = "none";
        }
    }

    const  handleFriendiconClick = () => {
        const box = document.getElementById("friend_popup");
        if (box.style.display === "block") {
          box.style.display = "none";
        } else {
          box.style.display = "block";
          document.getElementById("popupBox").style.display = "none";
          document.getElementById("setting_box").style.display = "none";
          document.getElementById("wallet_box").style.display = "none";
          document.getElementById("profile_box").style.display = "none";
        }
    }

    useEffect(() => {

  
     
      // tabs
      document.querySelectorAll(".tab").forEach((tab) => {
        tab.addEventListener("click", function () {
          document
            .querySelectorAll(".tab")
            .forEach((t) => t.classList.remove("active"));
          document
            .querySelectorAll(".chat-content")
            .forEach((content) => content.classList.remove("active"));

          this.classList.add("active");
          document
            .getElementById(this.dataset.tab + "-chat")
            .classList.add("active");
        });
      });
//  <!-- popup start -->
      document.addEventListener("DOMContentLoaded", function () {
        const tabs = document.querySelectorAll(".tab_");
        const contents = document.querySelectorAll(".right_box_inner");

        tabs.forEach((tab) => {
          tab.addEventListener("click", function () {
            const tabType = this.getAttribute("data-tab");

            // Remove active class from all tabs
            tabs.forEach((t) => t.classList.remove("active"));

            // Add active class to the clicked tab
            this.classList.add("active");

            // Show the corresponding content and hide others
            contents.forEach((content) => {
              if (content.getAttribute("data-content") === tabType) {
                content.style.display = "block";
              } else {
                content.style.display = "none";
              }
            });
          });
        });
      });
 
 
   
     
  // frnd_tabs
  document.addEventListener("DOMContentLoaded", function () {
        // Get buttons
        const friendListBtn = document.getElementById("frnd_list_btn");
        const pendingBtn = document.getElementById("pending_btn");
        const addFriendBtn = document.getElementById("add_frnd_btn");

        // Get panels
        const firstPanel = document.getElementById("frnd_first_panel");
        const secondPanel = document.getElementById("frnd_second_panel");
        const thirdPanel = document.getElementById("frnd_third_panel");

        // Function to show the selected panel and hide others
        function showPanel(panel) {
            firstPanel.style.display = "none";
            secondPanel.style.display = "none";
            thirdPanel.style.display = "none";

            panel.style.display = "block";
        }

        // Set initial state
        showPanel(firstPanel); // Show first panel by default

        // Add event listeners for tab switching
        friendListBtn.addEventListener("click", function () {
            showPanel(firstPanel);
        });

        pendingBtn.addEventListener("click", function () {
            showPanel(secondPanel);
        });

        addFriendBtn.addEventListener("click", function () {
            showPanel(thirdPanel);
        });
    });

})
 



    return (
        <>
        <div id="menubar" className="ui-bar">
        <div className="icon-btn" id="chaticon" onClick={() => setChatOpen(!chatOpen)}>
          <img src="/assets/icons/ChatIcon.png" className="icon-img" alt="Chat" />
        </div>
        <div className="icon-btn" id="emote_btn" onClick={() => handleEmoteiconClick()}>
          <img src="/assets/icons/EmoteIcon.png" className="icon-img" alt="Emoji" />
        </div>
        <div className="icon-btn" id="popup" onClick={() => handlePopupIconClick()}>
          <img
            src="/assets/icons/InventoryIcon.png"
            className="icon-img"
            alt="Shirt"
          />
        </div>

        <div className="quickchat-box">
          <input type="text" placeholder="Quick Chat..." value={quickText} onChange={(e) => setQuickText(e.target.value)} />
          <div className="icon-btn" style={{"width": "40px", "height": "40px"}} onClick={() => {setQuickChat(quickText) ; setQuickText("")}}>
            <img
              src="/assets/icons/ArrowIcon.png"
              className="icon-img"
              alt="Send"
            />
          </div>
        </div>

        <div className="icon-btn" id="profile_btn" onClick={() => handleProfileIconClick()}>
          <img
            src="/assets/icons/ProfileIcon.png"
            className="icon-img"
            alt="Friends"
          />
        </div>
        <div className="icon-btn" id="friends_btn" onClick={() => handleFriendiconClick()}>
          <img
            src="/assets/icons/FriendsIcon.png"
            className="icon-img"
            alt="Friends"
          />
        </div>
        <div className="icon-btn" id="wallet_btn" onClick={() => handleWalleticonClick()}>
          <img
            src="/assets/icons/WalletIcon.png"
            className="icon-img"
            alt="Wallet"
          />
        </div>
        {/* <div className="icon-btn" onClick={() => handleAirBotClick()}>
          <img
            src="/assets/icons/ChatIcon.png"
            className="icon-img"
            alt="Wallet"
          />
        </div> */}
        <div className="icon-btn" id="setting_btn" onClick={() => handleSettingsiconClick()}>
          <img
            src="/assets/icons/SettingsIcon.png"
            className="icon-img"
            alt="Settings"
          />
        </div>
      </div>
        </>
    )
}
export default MenuBar;
