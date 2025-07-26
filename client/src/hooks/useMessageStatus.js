// client/src/hooks/useMessageStatus.js
import { useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

const useMessageStatus = (messageId, room, setMessages) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handleMessageRead = ({ messageId: receivedId, readerId }) => {
      if (receivedId === messageId) {
        setMessages(prev => prev.map(msg => {
          if (msg.id === messageId) {
            return {
              ...msg,
              readBy: [...(msg.readBy || []), readerId]
            };
          }
          return msg;
        }));
      }
    };

    socket.on('message-read', handleMessageRead);

    return () => {
      socket.off('message-read', handleMessageRead);
    };
  }, [socket, messageId, setMessages]);

  const markAsRead = () => {
    socket.emit('mark-message-read', { messageId, room });
  };

  return { markAsRead };
};

export default useMessageStatus;