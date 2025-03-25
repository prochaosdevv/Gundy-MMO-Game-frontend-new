"use client";
import {
    Box,
    MenuItem,
    Select,
    Typography,
    Step, StepLabel, Stepper,
  } from "@mui/material";
  
import React, { useState } from 'react'

const steps = ["Awaiting Deposit", "Confirming", "Exchanging", "Sending to you"];

const BankContainer = () => {
    const [selectCurrecncy_1,setSelectCurrecncy_1]=useState(1)
    const [address,setAddress]=useState("0x000000")
    const [step1,setStep1]=useState(true)
    const [step2,setStep2]=useState(false)
    const [step3,setStep3]=useState(false)
    const [selectCurrecncy_2,setSelectCurrecncy_2]=useState(1)
    const [chooseBlockchain,setChooseBlockchain]=useState(1)
    const [chooseBlockchain_2,setChooseBlockchain_2]=useState(1)
    const [activeStep, setActiveStep] = useState(1);

    const handleNext = () => {
      setActiveStep((prevStep) => prevStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevStep) => prevStep - 1);
    };
    
    

    const handleStep1=()=>{
      setStep1(false)
      setStep2(true)
    }
    const handleStep2=()=>{
      setStep1(false)
      setStep2(false)
      setStep3(true)
    }
    const returnToMenu=()=>{
      setStep1(true)
      setStep2(false)
      setStep3(false)
    }

  return (
   <>
     <Box>
       <Typography sx={{
        background:"#8588a0",
        p:"0.6rem",
        color:"#d2d8f3",
        fontSize:"20px",
        textAlign:"center",
        borderRadius:"15px 15px 0 0",
        fontWeight:"bold"
       }}>
       <em>Network Bridge</em>
       </Typography>
       {/* 1st step  */}
    {step1&&   <Box sx={{p:"15px",}}>
   
     <Box>
     <Typography sx={{
     
     color:"#4a4b61",
     fontSize:"15px",
     fontWeight:"bold",
     letterSpacing:"1.2px"
    }}>
Choose Blockchain
    </Typography>
    
    <Select
               value={chooseBlockchain}
               onChange={(e)=>setChooseBlockchain(e.target.value)}
               displayEmpty
            
               sx={{
                 minWidth: "100%",
                 backgroundImage: `url(/assets/choose_blockchain.png)`,
                 backgroundSize: '100% 100%',
                 backgroundRepeat:"no-repeat",
                 width: "auto",
                 padding: 1.5,
                 color:"#fff",
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
               color:"#4a4b61 !important",
                     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Optional: Adds shadow
                  
                   },
                 },
               }}
             >
          
                 <MenuItem value={0}>
                 <img src="/assets/eth_symbol.png" className="" style={{width:"25px",marginRight:"5px"}} alt="icon" />
                   <b>Base</b>
                 </MenuItem>
                 <MenuItem value={1}>
                 <img src="/assets/eth_symbol.png" className="" style={{width:"25px",marginRight:"5px"}} alt="icon" />
                   <b>Eth</b>
                 </MenuItem>
            
             </Select>
             <Box sx={{
              background:"#4a4b61",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              borderRadius:"7px",
              my:"0.5rem"
             }}>

<Box sx={{px:"10px"}}>
<Typography sx={{
     
     color:"#d2d8f3",
     fontSize:"13px",
     fontWeight:"bold",
     letterSpacing:"1.2px",
     lineHeight:"normal"
    }}>
You send
    </Typography>
<Typography sx={{
     
     color:"#d2d8f3",
     fontSize:"20px",
     fontWeight:"bold",
     letterSpacing:"1.2px",
     lineHeight:"normal"
    }}>
0.00048565
    </Typography>
</Box>
    <Select
               value={selectCurrecncy_1}
               onChange={(e)=>setSelectCurrecncy_1(e.target.value)}
               displayEmpty
            
               sx={{
                 minWidth: 200,
                 backgroundImage: `url(/assets/chooseCurrency.png)`,
                 backgroundSize: '100% 100%',
                 backgroundRepeat:"no-repeat",
                 width: "auto",
                 padding: 1.5,
                 color:"#fff",
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
               color:"#4a4b61 !important",
                     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Optional: Adds shadow
                  
                   },
                 },
               }}
             >
          
                 <MenuItem value={0}>
                 <img src="/assets/eth_symbol.png" className="" style={{width:"25px",marginRight:"5px"}} alt="icon" />
                   <b>Base</b>
                 </MenuItem>
                 <MenuItem value={1}>
                 <img src="/assets/eth_symbol.png" className="" style={{width:"25px",marginRight:"5px"}} alt="icon" />
                   <b>Eth</b>
                 </MenuItem>
            
             </Select>
             </Box>
             <Typography sx={{
               color:"#4a4b61",
     fontSize:"13px",
     fontWeight:"bold",
     letterSpacing:"1.2px",
     lineHeight:"normal",
     p:"10px",
     borderLeft:"2px solid #4a4b61",
     ml:"7px",
     mb:"0.3rem",
             }}>
             Estimated Rate: 1 ETH ~ 1 ETH
             </Typography>
             <Box>
  <Typography sx={{
        color:"#4a4b61",
        fontSize:"15px",
        fontWeight:"bold",
        letterSpacing:"1.2px"
       }}>
Choose Blockchain
       </Typography>
       <Select
                  value={chooseBlockchain_2}
                  onChange={(e)=>setChooseBlockchain_2(e.target.value)}
                  displayEmpty
               
                  sx={{
                    minWidth: "100%",
                    backgroundImage: `url(/assets/choose_blockchain.png)`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat:"no-repeat",
                    width: "auto",
                    padding: 1.5,
                    color:"#fff",
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
                  color:"#4a4b61 !important",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Optional: Adds shadow
                     
                      },
                    },
                  }}
                >
             
                    <MenuItem value={0}>
                    <img src="/assets/eth_symbol.png" className="" style={{width:"25px",marginRight:"5px"}} alt="icon" />
                      <b>Base</b>
                    </MenuItem>
                    <MenuItem value={1}>
                    <img src="/assets/eth_symbol.png" className="" style={{width:"25px",marginRight:"5px"}} alt="icon" />
                      <b>Eth</b>
                    </MenuItem>
               
                </Select>
  </Box>
           
     </Box>
     <Box sx={{
              background:"#4a4b61",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              borderRadius:"7px",
              my:"0.5rem"
             }}>

<Box sx={{px:"10px"}}>
<Typography sx={{
     
     color:"#d2d8f3",
     fontSize:"13px",
     fontWeight:"bold",
     letterSpacing:"1.2px",
     lineHeight:"normal"
    }}>
You get
    </Typography>
<Typography sx={{
     
     color:"#d2d8f3",
     fontSize:"20px",
     fontWeight:"bold",
     letterSpacing:"1.2px",
     lineHeight:"normal"
    }}>
0.00048565
    </Typography>
</Box>
    <Select
               value={selectCurrecncy_2}
               onChange={(e)=>setSelectCurrecncy_2(e.target.value)}
               displayEmpty
            
               sx={{
                 minWidth: 200,
                 backgroundImage: `url(/assets/chooseCurrency.png)`,
                 backgroundSize: '100% 100%',
                 backgroundRepeat:"no-repeat",
                 width: "auto",
                 padding: 1.5,
                 color:"#fff",
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
               color:"#4a4b61 !important",
                     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Optional: Adds shadow
                  
                   },
                 },
               }}
             >
          
                 <MenuItem value={0}>
                 <img src="/assets/eth_symbol.png" className="" style={{width:"25px",marginRight:"5px"}} alt="icon" />
                   <b>Base</b>
                 </MenuItem>
                 <MenuItem value={1}>
                 <img src="/assets/eth_symbol.png" className="" style={{width:"25px",marginRight:"5px"}} alt="icon" />
                   <b>Eth</b>
                 </MenuItem>
            
             </Select>
             </Box>
             <Typography sx={{
     
     color:"#4a4b61",
     fontSize:"15px",
     fontWeight:"bold",
     letterSpacing:"1.2px"
    }}>
Recipient Wallet
    </Typography>
     <Box sx={{
              background:"#4a4b61",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center",
              borderRadius:"7px",
              mb:"0.5rem"
             }}>

<Box sx={{p:"10px"}}>
<Typography sx={{
     
     color:"#d2d8f3",
     fontSize:"13px",
     fontWeight:"bold",
     letterSpacing:"1.2px",
     lineHeight:"normal"
    }}>
Enter ETH Payout Adress
    </Typography>
    <div className="search_input_box">
    <input type="text" placeholder="0x00" style={{
      border:"none",
      background:"transparent",
      padding:"0",
    }}  value={address}
                    onChange={(e) => setAddress(e.target.value)} />
                    </div>
</Box>
   
             </Box>

       <Box sx={{
         width:"250px",
        m:"1rem auto 0.5rem"
     }}>
       <div className="return_menu_btn" onClick={handleStep1}>
          
          <Typography sx={{
  textAlign:"center",
   color:"#fff",
   fontSize:"24px",
lineHeight:"normal",
   fontWeight:"bold",
   letterSpacing:"1.3px",
   display:"flex",
   justifyContent:"center",
   alignItems:"center",
   gap:"10px",
   cursor:"pointer"
  }}>
  <img src="/assets/exchange_symbol.png" className="" style={{width:"25px"}} alt="symbol" />Exchange
  </Typography>
      </div>
      </Box>
      
   
       </Box>}
    {step2&&   <Box sx={{p:"15px",}}>
   
   
    <Typography sx={{
     color:"#4a4b61",
     fontSize:"15px",
     fontWeight:"bold",
     letterSpacing:"1.2px"
    }}>
Please send the funds you would like to exchange.
    </Typography>
    <Box sx={{
              background:"#4a4b6124",
              borderRadius:"10px",
              my:"1rem"
             }}>

<Box sx={{p:"10px"}}>
<Typography sx={{
     color:"#4a4b61",
     fontSize:"13px",
     fontWeight:"bold",
     letterSpacing:"1.2px",
    //  lineHeight:"normal"
    }}>
Amount
    </Typography>
<Typography sx={{
     
     color:"#4a4b61",
     fontSize:"20px",
     fontWeight:"bold",
     letterSpacing:"1.2px",
     lineHeight:"normal",
     pb:"10px"
    }}>
0.015 ETH
    </Typography>
<Typography sx={{
     
     color:"#4a4b61",
     fontSize:"13px",
     fontWeight:"bold",
     letterSpacing:"1.2px",
    //  lineHeight:"normal"
    }}>
To this address
    </Typography>
<Typography sx={{
     
     color:"#4a4b61",
     fontSize:"20px",
     fontWeight:"bold",
     letterSpacing:"1.2px",
     lineHeight:"normal"
    }}>
0x000000000000000000000
    </Typography>
</Box>
   
             </Box>
<Box py="0.5rem">
<Typography sx={{
     
     color:"#4a4b61",
     fontSize:"13px",
     fontWeight:"bold",
     letterSpacing:"1.2px",
     opacity:"0.7"

    }}>
You get
    </Typography>
<Typography sx={{
     
     color:"#4a4b61",
     fontSize:"20px",
     fontWeight:"bold",
     letterSpacing:"1.2px",
     opacity:"0.7"

    }}>
0.0015 ETH Base
    </Typography>
</Box>
<Box py="0.5rem">
<Typography sx={{
     
     color:"#4a4b61",
     fontSize:"13px",
     fontWeight:"bold",
     letterSpacing:"1.2px",
     opacity:"0.7"

    }}>
Recipient Wallet
    </Typography>
<Typography sx={{
     
     color:"#4a4b61",
     fontSize:"20px",
     fontWeight:"bold",
     letterSpacing:"1.2px",
     opacity:"0.7",
     display:"flex",
     gap:"5px",
     alignItems:"center"

    }}>
0x000000000000000000000  <img src="/assets/copy.png" className="" style={{width:"20px",}} alt="icon" />
    </Typography>
</Box>
 <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 3 ,"& .MuiStepLabel-label":{
  color:"#4a4b61",
     fontSize:"13px",
     fontWeight:"bold",
     letterSpacing:"1.2px",
 }}}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel component="p" sx={{
              display:"flex",
              alignItems:"center",
            }}
              StepIconComponent={({ active }) => (
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: active ? "#4a4b61" : "#bbb",
                  }}
                />
              )}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{
         width:"250px",
        m:"1rem auto 0.5rem"
     }}>
       <div className="return_menu_btn" onClick={handleStep2}>
          
          <Typography sx={{
  textAlign:"center",
   color:"#fff",
   fontSize:"24px",
lineHeight:"normal",
   fontWeight:"bold",
   cursor:"pointer"
  }}>
  Continue
  </Typography>
      </div>
      </Box>
       </Box>}
      {step3&& <Box sx={{p:"15px",textAlign:"center"}}>
       <Box sx={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        py:"1rem"
       }}>
       <img src="/assets/Checkmark.png" className="" style={{width:"50px"}} alt="chat" />
       </Box>
       <Typography sx={{
     
        pb:"1rem",
        color:"#4a4b61",
        fontSize:"30px",
        textAlign:"center",
        fontWeight:"bold",
        letterSpacing:"1.5px"
       }}>
       Finished!
       </Typography>
       <Box sx={{
        background:"#c4c9e1",
        p:"5px 10px",
        borderRadius:"10px",
        width:"250px",
        m:"0 auto"
       }}>
 <Typography sx={{
  textAlign:"start",
     color:"#7b7c9f",
     fontSize:"18px",

     fontWeight:"bold",
     letterSpacing:"1.5px"
    }}>
    You Sent
    </Typography>
 <Typography sx={{
    textAlign:"start",
     color:"#4a4b61",
     fontSize:"22px",
  lineHeight:"normal",
     fontWeight:"bold",
     letterSpacing:"1.5px"
    }}>
    0.0015 ETH Base
    </Typography>
       </Box>
       <Box sx={{
        background:"#c4c9e1",
        p:"5px 10px",
        borderRadius:"10px",
        width:"250px",
        m:"0.5rem auto 2.5rem"
       }}>
 <Typography sx={{
  textAlign:"start",
     color:"#7b7c9f",
     fontSize:"18px",

     fontWeight:"bold",
     letterSpacing:"1.5px"
    }}>
    You Got
    </Typography>
 <Typography sx={{
    textAlign:"start",
     color:"#4a4b61",
     fontSize:"22px",
  lineHeight:"normal",
     fontWeight:"bold",
     letterSpacing:"1.5px"
    }}>
    0.0015 ETH Base
    </Typography>
       </Box>
     <Box sx={{
         width:"250px",
        m:"2rem auto 2rem",
        cursor:"pointer"
     }}>
     <div className="return_menu_btn" onClick={returnToMenu}>
            <Typography sx={{
    textAlign:"center",
     color:"#fff",
     fontSize:"24px",
  lineHeight:"normal",
     fontWeight:"bold",
     letterSpacing:"1.3px"
    }}>
    Return To Menu
    </Typography>
        </div>
     </Box>
       </Box>
}
    </Box>
   </>
  )
}

export default BankContainer