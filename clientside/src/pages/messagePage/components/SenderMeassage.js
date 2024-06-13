import React, { useState } from 'react';

export default function SenderMessage({ message, messageHandler }) {
  const [messageId, setMessageId] = useState('');

  return (
    <div
      onClick={() => messageHandler(messageId)}
      style={{
        padding: '12px 20px',
        margin: '8px 6px',
        marginLeft: '56px',
        maxWidth: '70%',
        backgroundColor: '#00a7e1',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        borderTopRightRadius: '10px',
        alignSelf: 'flex-end',
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
        {message.createAt}
      </div>
    </div>
  );
}