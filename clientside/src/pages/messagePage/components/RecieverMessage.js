import React from 'react';
import {format} from 'timeago.js';

const ReceiverMessage = ({ message }) => {
  const date = new Date(message.dateSent);
  const hours = date.getHours();
  const min = date.getMinutes();

  return (
    <div
      style={{
        float: "left",
        padding: '10px',
        minWidth: '15%',
        maxWidth: '70%',
        marginRight:"10px",
        marginBottom: "5px",
        backgroundColor: "white",
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        borderTopRightRadius: '10px',
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
        {format(message.createdAt)}
      </p>
    </div>
  );
};

export default ReceiverMessage;