import { NavLink } from 'react-router-dom';
import Avatar from '../Avatar';
import { useAuth } from '../../context/AuthContext';

const UserList = ({ users, currentUser, collapsed }) => {
  return (
    <div className="mt-4 space-y-1">
      <h3 className="px-4 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
        Online Users
      </h3>
      <nav className="space-y-1">
        {users
          .filter(user => user._id !== currentUser._id)
          .map((user) => (
            <NavLink
              key={user._id}
              to={`/private/${user._id}`}
              className={({ isActive }) => `
                flex items-center px-4 py-2 text-sm font-medium rounded-md
                ${isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
              `}
              title={collapsed ? user.username : undefined}
            >
              {collapsed ? (
              <div className="relative">
                <Avatar name={user.username} src={user.avatar} size="sm" />
                <span className={`absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-1 ring-white ${user.status === 'online' ? 'bg-green-400' : 'bg-gray-300'}`} />
              </div>
            ) : (
              <div className="flex items-center min-w-0">
                <div className="relative">
                  <Avatar name={user.username} src={user.avatar} size="sm" />
                  <span className={`absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-1 ring-white ${user.status === 'online' ? 'bg-green-400' : 'bg-gray-300'}`} />
                </div>
                <span className="ml-3 truncate">{user.username}</span>
              </div>
            )}
            </NavLink>
          ))}
      </nav>
    </div>
  );
};

export default UserList;