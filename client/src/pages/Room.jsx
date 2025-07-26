import { useParams } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import MessageList from '../components/chat/MessageList';
import MessageInput from '../components/chat/MessageInput';

const Room = () => {
  const { roomId } = useParams();
  const { socket } = useSocket();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socket || !roomId) return;

    const handleMessage = (message) => {
      setMessages(prev => [...prev, message]);
    };

    socket.emit('join-room', roomId);
    socket.on('room-message', handleMessage);

    return () => {
      socket.off('room-message', handleMessage);
      socket.emit('leave-room', roomId);
    };
  }, [socket, roomId]);

  const sendMessage = (content) => {
    if (!content.trim()) return;
    socket.emit('send-message', {
      room: roomId,
      content,
      sender: user._id
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Room: {roomId}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} currentUser={user} />
      </div>
      <div className="p-4 border-t border-gray-200">
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default Room;