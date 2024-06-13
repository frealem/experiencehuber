import React from 'react';

const ReceiverMessage = ({ message }) => {
  const date = new Date(message.dateSent);
  const hours = date.getHours();
  const min = date.getMinutes();

  return (
    <div
      style={{
        padding: '12px 20px',
        margin: '8px 6px',
        marginLeft: '40px',
        maxWidth: '60%',
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '20px',
        alignSelf: 'flex-start',
      }}
    >
      <p
        style={{
          flexWrap: 'wrap',
          fontSize: '18px',
        }}
      >
        {message.content}
      </p>
      <p
        style={{
          fontSize: '10px',
          color: '#808080',
        }}
      >
        {hours}:{min}
      </p>
    </div>
  );
};

export default ReceiverMessage;