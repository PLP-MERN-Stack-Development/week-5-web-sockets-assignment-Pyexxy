// client/src/components/MessageReactions.jsx
import { useState } from 'react';
import { useSocket } from '../context/SocketContext';

const reactions = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

const MessageReactions = ({ messageId, room, currentReactions = {} }) => {
  const { socket } = useSocket();
  const [showPicker, setShowPicker] = useState(false);

  const handleReaction = (emoji) => {
    socket.emit('react-to-message', {
      messageId,
      room,
      emoji
    });
    setShowPicker(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowPicker(!showPicker)}
        className="text-gray-400 hover:text-gray-600 text-sm"
      >
        React
      </button>
      
      {showPicker && (
        <div className="absolute bottom-full left-0 bg-white shadow-lg rounded-lg p-2 z-10 flex space-x-1">
          {reactions.map(emoji => (
            <button
              key={emoji}
              onClick={() => handleReaction(emoji)}
              className="text-xl hover:scale-125 transform transition"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
      
      {Object.entries(currentReactions).length > 0 && (
        <div className="flex space-x-1 mt-1">
          {Object.entries(currentReactions).map(([emoji, users]) => (
            <span 
              key={emoji} 
              className="bg-gray-100 rounded-full px-2 py-1 text-xs"
              title={users.join(', ')}
            >
              {emoji} {users.length}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageReactions;