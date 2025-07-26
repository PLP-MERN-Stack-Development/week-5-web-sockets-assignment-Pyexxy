import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';
import RoomList from '../components/chat/RoomList';
import UserList from '../components/chat/UserList';
import TypingIndicator from '../components/chat/TypingIndicator';

const Chat = () => {
  const { socket } = useSocket();
  const { user } = useAuth();
  const { roomId } = useParams();
  const [currentRoom, setCurrentRoom] = useState(roomId || 'general');
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [rooms, setRooms] = useState(['general', 'random']);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!socket || !user) return;

    socket.emit('join', { userId: user._id });

    socket.on('receive-message', ({ room, message, sender }) => {
      if (room === currentRoom) {
        setMessages(prev => [...prev, { ...message, sender }]);
      }
    });

    socket.on('typing', ({ userId, username, isTyping }) => {
      setTypingUsers(prev => {
        if (isTyping) {
          return [...new Set([...prev, username])];
        }
        return prev.filter(u => u !== username);
      });
    });

    socket.on('online-users', users => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off('receive-message');
      socket.off('typing');
      socket.off('online-users');
    };
  }, [socket, user, currentRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    
    const message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, { ...message, sender: user }]);
    
    socket.emit('send-message', {
      room: currentRoom,
      message,
      sender: { username: user.username, userId: user._id }
    });
  };

  const handleTyping = (isTyping) => {
    socket.emit('typing', { 
      room: currentRoom, 
      isTyping 
    });
  };

  const joinRoom = (room) => {
    socket.emit('join-room', room);
    setCurrentRoom(room);
    setMessages([]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar>
        <RoomList 
          rooms={rooms} 
          currentRoom={currentRoom} 
          onSelectRoom={joinRoom} 
        />
        <UserList 
          users={onlineUsers} 
          currentUser={user} 
        />
      </Sidebar>
      
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-semibold">#{currentRoom}</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <MessageList messages={messages} currentUser={user} />
          <div ref={messagesEndRef} />
        </div>
        
        <div className="relative p-4 border-t border-gray-200 bg-white">
          <TypingIndicator users={typingUsers} />
          <MessageInput 
            onSend={sendMessage} 
            onTyping={handleTyping} 
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;