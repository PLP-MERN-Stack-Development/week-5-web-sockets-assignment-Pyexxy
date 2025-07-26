import { NavLink } from 'react-router-dom';

const RoomList = ({ rooms, currentRoom, onSelectRoom, collapsed }) => {
  return (
    <>
      {rooms.map((room) => (
        <NavLink
          key={room._id || room}
          to={`/room/${room._id || room}`}
          onClick={() => onSelectRoom(room._id || room)}
          className={({ isActive }) => `
            flex items-center ${collapsed ? 'justify-center p-3' : 'px-3 py-2'} rounded-md text-sm font-medium
            ${isActive || currentRoom === (room._id || room) 
              ? 'bg-gray-200 text-gray-900' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
          `}
          title={collapsed ? `# ${room.name || room}` : undefined}
        >
          {collapsed ? (
            <span className="text-lg">#</span>
          ) : (
            <span className="truncate"># {room.name || room}</span>
          )}
        </NavLink>
      ))}
    </>
  );
};

export default RoomList;