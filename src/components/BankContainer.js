"use client";
import { Box, Typography } from '@mui/material';
import React from 'react'

const BankContainer = () => {
  return (
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
       <Box sx={{p:"15px",textAlign:"center"}}>
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
        m:"2rem auto 2rem"
     }}>
     <div className="return_menu_btn">
          
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

    </Box>
  )
}

export default BankContainer