'use client';


import { Box } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Switch_Wallet_Button from "../../public/assets/Switch_Wallet_Button.png"

import { zeroAddress } from "viem";
import { truncateAddress } from "@/utils/functions";
import { ConnectWalletButton, DisconnectWalletButton, SwitchNetworkButton } from "./CustomConnectButton";

const WalletBox = () => {
 const {address,isConnected}=useAccount()
    const closeBox = () => {
        document.getElementById("wallet_box").style.display = "none";
    }

    return (
        <>
         <div id="wallet_box" className="wallet-container" style={{"display": "none"}}>
   <div className="cross_box" onClick={() => closeBox()}>
    <div className="cross_bg">
        <img src="/assets/cross.png" className="cross_btn" alt="Close" id="wallet_close_btn" />
        
    </div>
</div>

   <div className="wallet_inner">
   {
   address&&
   <>
    <p className="wallet_text">Wallet:</p>
    <p className="wallet_text_2">{truncateAddress(address||zeroAddress)}</p>
   </>
    }

    <div className="wallet_btns">
        {/* <div className="wallet_inner_btn">
            <p>Switch Wallet</p>
         
        </div> */}
        {/* <Box sx={{
          m:"0 auto",
          width:"72%"
        }}> */}
        <ConnectWalletButton />
      {address&&<DisconnectWalletButton />}
      {address &&<SwitchNetworkButton />}
       {/* </Box> */}
        {/* <div className="wallet_inner_btn btn_logout">
            <p>Disconnect Wallet</p>
        </div> */}
    </div>

       
   </div>

  
 
  </div>
        </>
    )
}

export default WalletBox;
