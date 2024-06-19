import React, { useState } from 'react';
import {format} from 'timeago.js';
export default function SenderMessage({ message, messageHandler }) {
  const [messageId, setMessageId] = useState('');

  return (
    <div
      onClick={() => messageHandler(messageId)}
      style={{
        float: "right",
        padding: '10px',
        minWidth: '15%',
        maxWidth: '70%',
        marginRight:"10px",
        marginBottom: "5px",
        backgroundColor: "purple",
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        borderTopRightRadius: '10px',
        //alignSelf: 'flex-end',
      }}
    >
      <p
        style={{
          flexWrap: 'wrap',
          color: 'white',
        }}
      >
        {message.content}
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignSelf: 'flex-end',
        }}
      >
        {format(message.createdAt)}
      </div>
    </div>
  );
}