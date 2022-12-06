import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatBody.css';

const ChatBody = ({ messages, lastMessageRef, typingStatus }) => {
  const navigate = useNavigate();
  const handleLeaveChat = () => {
    navigate(-1);
  };

  return (
    <>
      <header className="chat__mainHeader">
        <div>Hangout with Members</div>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
        {/* Auto-scroll feature */}
      </div>
    </>
  );
};

export default ChatBody;
