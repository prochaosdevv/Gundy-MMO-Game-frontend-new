"use client";
import { copyToClipboard } from "@/utils/functions";
import {
  Box,
  MenuItem,
  Select,
  Typography,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
} from "@mui/material";

import React, { useState } from "react";

const steps = [
  "Awaiting Deposit",
  "Confirming",
  "Exchanging",
  "Sending to you",
];

const BankContainer = () => {
  const [selectCurrecncy_1, setSelectCurrecncy_1] = useState(1);
  const [address, setAddress] = useState("0x000000");
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [selectCurrecncy_2, setSelectCurrecncy_2] = useState(0);
  const [chooseBlockchain, setChooseBlockchain] = useState(1);
  const [chooseBlockchain_2, setChooseBlockchain_2] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleStep1 = () => {
    setStep1(false);
    setStep2(true);
  };
  const handleStep2 = () => {
    setStep1(false);
    setStep2(false);
    setStep3(true);
  };
  const returnToMenu = () => {
    setStep1(true);
    setStep2(false);
    setStep3(false);
  };
  const handleStepBack = () => {
    if (step3) {
      setStep3(false);
      setStep2(true);
    } else if (step2) {
      setStep2(false);
      setStep1(true);
    }
  };
  
  const [tooltipText, setTooltipText] = useState("Copy to clipboard");

  const handleCopy = (address) => {
    copyToClipboard(address);
    setTooltipText("Copied!");
    setTimeout(() => setTooltipText("Copy to clipboard"), 2000);
  };
  return (
<>
<div style={{position:"absolute",top:"18px",left:"18px",cursor:"pointer"}} onClick={handleStepBack}>
          <img src="/assets/exit_btn.png" style={{width:"80px"}} alt="Chat" />
        </div>
<Box  sx={{
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
    
    
    }}>
       
      <Box sx={{
        "& .label":{
          color: "#4a4b61",
                  fontSize: "15px",
                  fontWeight: "bold",
                  letterSpacing: "1.2px",
        },
        "& .label_small":{
          fontSize: "13px",
                      fontWeight: "bold",
                      letterSpacing: "1.2px",
        },
        "& .label_big":{
          fontSize: "20px",
                    fontWeight: "bold",
                    letterSpacing: "1.2px",
        },
        "& .btn_p":{
          textAlign: "center",
                    color: "#fff",
                    fontSize: "24px",
                    lineHeight: "normal",
                    fontWeight: "bold",
                    letterSpacing: "1.3px",
        },
      }}>
        <Typography
          sx={{
            background: "#8588a0",
            p: "0.6rem",
            color: "#d2d8f3",
            fontSize: "20px",
            textAlign: "center",
            borderRadius: "15px 15px 0 0",
            fontWeight: "bold",
            position:"relative"
          }}
        >
      {/* {(step2||step3)&&  <div className="icon-btn" style={{position:"absolute",top:"5px",left:"5px",width:"40px",height:"40px"}} onClick={handleStepBack}>
          <img src="/assets/icons/ArrowIcon.png" className="icon-img" alt="Chat" style={{transform:"rotate(-180deg)",height:"40px"}} />
        </div>} */}
          <em>Network Bridge</em>
        </Typography>
        {/* 1st step  */}
        {step1 && (
          <Box sx={{ p: "15px" }}>
            <Box>
              <Typography className="label">
                Choose Blockchain
              </Typography>

              <Select
                value={chooseBlockchain}
                onChange={(e) => setChooseBlockchain(e.target.value)}
                displayEmpty
                sx={{
                  minWidth: "100%",
                  backgroundImage: `url(/assets/choose_blockchain.png)`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  width: "auto",
                  padding: 1.5,
                  color: "#fff",
                  "& .MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                    padding: "0 !important",
                    minHeight: "unset",
                  },
                  "& fieldset": { border: "none" },
                  "& svg": { color: "#fff" },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      background: `#c4c9e1 !important`,
                      color: "#4a4b61 !important",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Optional: Adds shadow
                    },
                  },
                }}
              >
                <MenuItem value={0}>
                  <img
                    src="/assets/base_icon_.svg"
                    className=""
                    style={{ width: "25px", marginRight: "5px" }}
                    alt="icon"
                  />
                  <b>Base</b>
                </MenuItem>
                <MenuItem value={1}>
                  <img
                    src="/assets/eth_symbol.png"
                    className=""
                    style={{ width: "25px", marginRight: "5px" }}
                    alt="icon"
                  />
                  <b>Eth</b>
                </MenuItem>
              </Select>
              <Box
                sx={{
                  background: "#4a4b61",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: "7px",
                  my: "0.5rem",
                }}
              >
                <Box sx={{ px: "10px" }}>
                  <Typography className="label_small"
                    sx={{
                      color: "#d2d8f3",
                      lineHeight: "normal",
                    }}
                  >
                    You send
                  </Typography>
                  <Typography className="label_big"
                    sx={{
                      color: "#d2d8f3",
                      lineHeight: "normal",
                    }}
                  >
                    0.00048565
                  </Typography>
                </Box>
                <Select
                  value={selectCurrecncy_1}
                  onChange={(e) => setSelectCurrecncy_1(e.target.value)}
                  displayEmpty
                  sx={{
                    minWidth: 200,
                    backgroundImage: `url(/assets/chooseCurrency.png)`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    width: "auto",
                    padding: 1.5,
                    color: "#fff",
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      padding: "0 !important",
                      minHeight: "unset",
                    },
                    "& fieldset": { border: "none" },
                    "& svg": { color: "#fff" },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        background: `#c4c9e1 !important`,
                        color: "#4a4b61 !important",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Optional: Adds shadow
                      },
                    },
                  }}
                >
                  <MenuItem value={0}>
                    <img
                      src="/assets/base_icon_.svg"
                      className=""
                      style={{ width: "25px", marginRight: "5px" }}
                      alt="icon"
                    />
                    <b>Base</b>
                  </MenuItem>
                  <MenuItem value={1}>
                    <img
                      src="/assets/eth_symbol.png"
                      className=""
                      style={{ width: "25px", marginRight: "5px" }}
                      alt="icon"
                    />
                    <b>Eth</b>
                  </MenuItem>
                </Select>
              </Box>
              <Typography className="label_small"
                sx={{
                  color: "#4a4b61",
                  lineHeight: "normal",
                  p: "10px",
                  borderLeft: "2px solid #4a4b61",
                  ml: "7px",
                  mb: "0.3rem",
                }}
              >
                Estimated Rate: 1 ETH ~ 1 ETH
              </Typography>
              <Box>
                <Typography className="label">
                  Choose Blockchain
                </Typography>
                <Select
                  value={chooseBlockchain_2}
                  onChange={(e) => setChooseBlockchain_2(e.target.value)}
                  displayEmpty
                  sx={{
                    minWidth: "100%",
                    backgroundImage: `url(/assets/choose_blockchain.png)`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    width: "auto",
                    padding: 1.5,
                    color: "#fff",
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      padding: "0 !important",
                      minHeight: "unset",
                    },
                    "& fieldset": { border: "none" },
                    "& svg": { color: "#fff" },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        background: `#c4c9e1 !important`,
                        color: "#4a4b61 !important",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Optional: Adds shadow
                      },
                    },
                  }}
                >
                  <MenuItem value={0}>
                    <img
                      src="/assets/base_icon_.svg"
                      className=""
                      style={{ width: "25px", marginRight: "5px" }}
                      alt="icon"
                    />
                    <b>Base</b>
                  </MenuItem>
                  <MenuItem value={1}>
                    <img
                      src="/assets/eth_symbol.png"
                      className=""
                      style={{ width: "25px", marginRight: "5px" }}
                      alt="icon"
                    />
                    <b>Eth</b>
                  </MenuItem>
                </Select>
              </Box>
            </Box>
            <Box
              sx={{
                background: "#4a4b61",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "7px",
                my: "0.5rem",
              }}
            >
              <Box sx={{ px: "10px" }}>
                <Typography className="label_small"
                  sx={{
                    color: "#d2d8f3",
                    lineHeight: "normal",
                  }}
                >
                  You get
                </Typography>
                <Typography className="label_big"
                  sx={{
                    color: "#d2d8f3",
                    lineHeight: "normal",
                  }}
                >
                  0.00048565
                </Typography>
              </Box>
              <Select
                value={selectCurrecncy_2}
                onChange={(e) => setSelectCurrecncy_2(e.target.value)}
                displayEmpty
                sx={{
                  minWidth: 200,
                  backgroundImage: `url(/assets/chooseCurrency.png)`,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  width: "auto",
                  padding: 1.5,
                  color: "#fff",
                  "& .MuiSelect-select": {
                    display: "flex",
                    alignItems: "center",
                    padding: "0 !important",
                    minHeight: "unset",
                  },
                  "& fieldset": { border: "none" },
                  "& svg": { color: "#fff" },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      background: `#c4c9e1 !important`,
                      color: "#4a4b61 !important",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Optional: Adds shadow
                    },
                  },
                }}
              >
                <MenuItem value={0}>
                  <img
                    src="/assets/base_icon_.svg"
                    className=""
                    style={{ width: "25px", marginRight: "5px" }}
                    alt="icon"
                  />
                  <b>Base</b>
                </MenuItem>
                <MenuItem value={1}>
                  <img
                    src="/assets/eth_symbol.png"
                    className=""
                    style={{ width: "25px", marginRight: "5px" }}
                    alt="icon"
                  />
                  <b>Eth</b>
                </MenuItem>
              </Select>
            </Box>
            <Typography className="label">
              Recipient Wallet
            </Typography>
            <Box
              sx={{
                background: "#4a4b61",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "7px",
                mb: "0.5rem",
              }}
            >
              <Box sx={{ p: "10px" }}>
                <Typography className="label_small"
                  sx={{
                    color: "#d2d8f3",
                    lineHeight: "normal",
                  }}
                >
                  Enter ETH Payout Adress
                </Typography>
                <div className="search_input_box">
                  <input
                    type="text"
                    placeholder="0x00"
                    style={{
                      border: "none",
                      background: "transparent",
                      padding: "0",
                      color:"#d2d8f3",
                      fontWeight:"bold",
                    }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </Box>
            </Box>

            <Box
              sx={{
                width: "250px",
                m: "1rem auto 0.5rem",
              }}
            >
              <div className="return_menu_btn" onClick={handleStep1}>
                <Typography className="btn_p"
                  sx={{
                  
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="/assets/exchange_symbol.png"
                    className=""
                    style={{ width: "25px" }}
                    alt="symbol"
                  />
                  Exchange
                </Typography>
              </div>
            </Box>
          </Box>
        )}
        {step2 && (
          <Box sx={{ p: "15px" }}>
            <Typography className="label">
              Please send the funds you would like to exchange.
            </Typography>
            <Box
              sx={{
                background: "#4a4b6124",
                borderRadius: "10px",
                my: "1rem",
              }}
            >
              <Box sx={{ p: "10px" }}>
                <Typography className="label_small"
                  sx={{
                    color: "#4a4b61",
                   
                  }}
                >
                  Amount
                </Typography>
                <Typography className="label_big"
                  sx={{
                    color: "#4a4b61",
                   
                    lineHeight: "normal",
                    pb: "10px",
                  }}
                >
                  0.015 ETH
                </Typography>
                <Typography className="label_small"
                  sx={{
                    color: "#4a4b61",
                  }}
                >
                  To this address
                </Typography>
                <Typography className="label_big"
                  sx={{
                    color: "#4a4b61",
                  
                    lineHeight: "normal",
                  }}
                >
                  0x000000000000000000000
                </Typography>
              </Box>
            </Box>
            <Box py="0.5rem">
              <Typography className="label_small"
                sx={{
                  color: "#4a4b61",
                  opacity: "0.7",
                }}
              >
                You get
              </Typography>
              <Typography className="label_big"
                sx={{
                  color: "#4a4b61",
            
                  opacity: "0.7",
                }}
              >
                0.0015 ETH Base
              </Typography>
            </Box>
            <Box py="0.5rem">
              <Typography className="label_small"
                sx={{
                  color: "#4a4b61",
                  opacity: "0.7",
                }}
              >
                Recipient Wallet
              </Typography>
              <Typography className="label_big"
                sx={{
                  color: "#4a4b61",
              
                  opacity: "0.7",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                0x000000000000000000000{" "}
                <Tooltip title={tooltipText} arrow>
                <img
                  src="/assets/copy.png"
                  className=""
                  style={{ width: "18px", cursor: "pointer",}}
                  alt="icon"
                  onClick={()=>handleCopy("0x000000000000000000000")}
                />
                </Tooltip>
              </Typography>
            </Box>
            <Stepper
      activeStep={activeStep}
      alternativeLabel
      sx={{
        my: 3,
        "& .MuiStepLabel-label": {
          color: "#4a4b61",
          fontSize: "13px",
          letterSpacing: "1.2px",
          textAlign: "center",
        },
        "& .MuiStepLabel-label.Mui-active": {
          fontWeight: "bold",
        },
        "& .MuiStepConnector-root": {
          top: "5px",
       
        
        },
      }}
    >
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
            StepIconComponent={({ active }) => (
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: active ? "#4a4b61" : "#bbb",
                  marginBottom: "5px", // Adjust for alignment
                }}
              />
            )}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>

            <Box
              sx={{
                width: "250px",
                m: "1rem auto 0.5rem",
              }}
            >
              <div className="return_menu_btn" onClick={handleStep2}>
                <Typography className="btn_p"
                  sx={{
                
                    cursor: "pointer",
                  }}
                >
                  Continue
                </Typography>
              </div>
            </Box>
          </Box>
        )}
        {step3 && (
          <Box sx={{ p: "15px", textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: "1rem",
              }}
            >
              <img
                src="/assets/Checkmark.png"
                className=""
                style={{ width: "50px" }}
                alt="chat"
              />
            </Box>
            <Typography
              sx={{
                pb: "1rem",
                color: "#4a4b61",
                fontSize: "30px",
                textAlign: "center",
                fontWeight: "bold",
                letterSpacing: "1.5px",
              }}
            >
              Finished!
            </Typography>
            <Box
              sx={{
                background: "#c4c9e1",
                p: "5px 10px",
                borderRadius: "10px",
                width: "250px",
                m: "0 auto",
              }}
            >
              <Typography
                sx={{
                  textAlign: "start",
                  color: "#7b7c9f",
                  fontSize: "18px",

                  fontWeight: "bold",
                  letterSpacing: "1.5px",
                }}
              >
                You Sent
              </Typography>
              <Typography
                sx={{
                  textAlign: "start",
                  color: "#4a4b61",
                  fontSize: "22px",
                  lineHeight: "normal",
                  fontWeight: "bold",
                  letterSpacing: "1.5px",
                }}
              >
                0.0015 ETH Base
              </Typography>
            </Box>
            <Box
              sx={{
                background: "#c4c9e1",
                p: "5px 10px",
                borderRadius: "10px",
                width: "250px",
                m: "0.5rem auto 2.5rem",
              }}
            >
              <Typography
                sx={{
                  textAlign: "start",
                  color: "#7b7c9f",
                  fontSize: "18px",

                  fontWeight: "bold",
                  letterSpacing: "1.5px",
                }}
              >
                You Got
              </Typography>
              <Typography
                sx={{
                  textAlign: "start",
                  color: "#4a4b61",
                  fontSize: "22px",
                  lineHeight: "normal",
                  fontWeight: "bold",
                  letterSpacing: "1.5px",
                }}
              >
                0.0015 ETH Base
              </Typography>
            </Box>
            <Box
              sx={{
                width: "250px",
                m: "2rem auto 2rem",
                cursor: "pointer",
              }}
            >
              <div className="return_menu_btn" onClick={returnToMenu}>
                <Typography className="btn_p">
                  Return To Menu
                </Typography>
              </div>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
</>
  );
};

export default BankContainer;
