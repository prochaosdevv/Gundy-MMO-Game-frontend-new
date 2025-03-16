"use client";
import { ContractContext } from '@/contexts/ContractContext';
import { timeAgo, truncateAddress } from '@/utils/functions';
import React, { useContext } from 'react'

const PrivateChat = ({chat}) => {
  const {setActiveChatId} = useContext(ContractContext)
  return (
 
    <div className="message" onClick={() => setActiveChatId(chat.chatid)} style={{cursor:"pointer"}}>
    <img
      src="/assets/icons/vc.png"
      className="message-avatar"
      alt="User"
    />
    <div className="message-content">
      <div className="message-header">
        <span>{truncateAddress(chat?.username)}</span>
        <span>{timeAgo(chat?.latestMessageTime)}</span>
      </div>
      <div className="message-text">
        {chat.latestMessage}
      </div>
    </div>
  </div>
  )
}

export default PrivateChat