// client/src/pages/PrivateChat.jsx
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';

const PrivateChat = () => {
  const { userId } = useParams();
  const { socket } = useSocket();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [recipient, setRecipient] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!socket || !user) return;

    // Fetch recipient info (in a real app, this would be an API call)
    // For demo, we'll just use the userId from the URL
    setRecipient({ id: userId, username: `User-${userId}` });

    // Set up private message listener
    const handlePrivateMessage = ({ from, message }) => {
      if (from.userId === userId) {
        setMessages(prev => [...prev, { ...message, sender: from }]);
      }
    };

    socket.on('private-message', handlePrivateMessage);

    return () => {
      socket.off('private-message', handlePrivateMessage);
    };
  }, [socket, user, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim() || !recipient) return;
    
    const message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      status: 'sending'
    };

    // Optimistic update
    setMessages(prev => [...prev, { ...message, sender: user }]);
    
    // Emit to server
    socket.emit('private-message', {
      to: recipient.id,
      message
    });
  };

  if (!recipient) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-xl font-semibold">Private chat with {recipient.username}</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} currentUser={user} />
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-white">
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default PrivateChat;