import { useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import { useParams } from 'react-router-dom';

const reactions = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

const MessageReactions = ({ messageId, reactions, currentUser }) => {
  const [showPicker, setShowPicker] = useState(false);
  const { socket } = useSocket();
  const { roomId } = useParams();

  const handleReaction = (emoji) => {
    if (socket) {
      socket.emit('react-to-message', {
        messageId,
        room: roomId,
        emoji
      });
    }
    setShowPicker(false);
  };

  return (
    <div className="flex items-center mt-2 space-x-1">
      {reactions.map((reaction) => (
        <button
          key={reaction.emoji}
          onClick={() => handleReaction(reaction.emoji)}
          className={`text-sm px-2 py-1 rounded-full ${reaction.users.includes(currentUser._id) ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
          title={reaction.users.join(', ')}
        >
          {reaction.emoji} {reaction.users.length}
        </button>
      ))}
      
      <div className="relative">
        <button 
          onClick={() => setShowPicker(!showPicker)}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          +
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
      </div>
    </div>
  );
};

export default MessageReactions;