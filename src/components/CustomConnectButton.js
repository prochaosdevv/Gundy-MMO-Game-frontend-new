import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@mui/material";
import Switch_Wallet_Button from "../../public/assets/Switch_Wallet_Button.png";
import Disconnect_Wallet_Button from "../../public/assets/Disconnect_Wallet_Button.png";
import { useAccount, useDisconnect } from "wagmi";
import { API_URL } from "@/utils/config";
import axios from "axios";
import { useEffect } from "react";

export const ConnectWalletButton = () => {
    const {address,isConnected}=useAccount()
      const createUser = async () => {
        try {
          const res = await axios.post(`${API_URL}/create/user`, {
            address:address,
          });
          if (res?.status === 201) {
            if (typeof window !== "undefined"){
             
                localStorage.setItem("access_token", res.data.token);
                localStorage.setItem("username", res.data.data.username);
            }
          }
          if (res?.status === 200) {
            if (typeof window !== "undefined"){
               
                localStorage.setItem("access_token", res.data.token);
                localStorage.setItem("username", res.data.data.username);
            }
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
  return (
    <ConnectButton.Custom>
      {({ openConnectModal, account, chain, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

        if (connected) return null; // Hide if already connected

        return (
          <Button
          disableRipple
            onClick={openConnectModal}
            sx={{
              backgroundImage: `url(${Switch_Wallet_Button.src})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100%",
              padding: "0.8rem 0.5rem",
              border: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: "22px",
              textTransform: "none",
            }}
          >
            Connect Wallet
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};

export const DisconnectWalletButton = () => {
    const { disconnect } = useDisconnect();
    const handleDisconnect = () => {
        // Remove access token and username from localStorage
        if (typeof window !== "undefined") {
            localStorage.removeItem("access_token");
            localStorage.removeItem("username");
        }

        // Disconnect wallet
        disconnect();
    };
  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted }) => {
        if (!mounted || !account || !chain) return null; // Hide if not connected

        return (
          <Button
          disableRipple
              onClick={handleDisconnect}
            sx={{
                backgroundImage: `url(${Disconnect_Wallet_Button.src})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100%",
              padding: "0.8rem 0.5rem",
              border: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: "22px",
              textTransform: "none",
            }}
          >
            Disconnect Wallet
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};

export const SwitchNetworkButton = () => {
  return (
    <ConnectButton.Custom>
      {({ chain, openChainModal, mounted }) => {
        if (!mounted || !chain || !chain.unsupported) return null; // Hide if network is correct

        return (
          <Button
          disableRipple
            onClick={openChainModal}
            sx={{
                backgroundImage: `url(${Switch_Wallet_Button.src})`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100%",
              padding: "0.8rem 0.5rem",
              border: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: "22px",
              textTransform: "none",
            }}
          >
            Switch Network
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};
