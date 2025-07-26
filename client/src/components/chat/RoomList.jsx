import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';

const RoomList = ({ rooms, currentRoom, onSelectRoom, collapsed }) => {
  const { socket } = useSocket();
  const { user } = useAuth();

  const handleJoinRoom = (room) => {
    if (socket && user) {
      socket.emit('join-room', room);
      onSelectRoom(room);
    }
  };

  return (
    <div className="space-y-1">
      <h3 className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
        Channels
      </h3>
      <nav className="space-y-1">
        {rooms.map((room) => (
          <NavLink
            key={room._id || room}
            to={`/room/${room._id || room}`}
            onClick={() => handleJoinRoom(room._id || room)}
            className={({ isActive }) => `
              flex items-center px-4 py-2 text-sm font-medium rounded-md
              ${isActive || currentRoom === (room._id || room) 
                ? 'bg-gray-200 text-gray-900' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
            `}
            title={collapsed ? `# ${room.name || room}` : undefined}
          >
            {collapsed ? ( <span className='text-lg'>#</span> ) : (
            <span className="truncate"># {room.name || room}</span> )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default RoomList;