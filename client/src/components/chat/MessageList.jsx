import { format } from 'date-fns';
import Avatar from '../Avatar';
import MessageReactions from './MessageReactions';
import { useAuth } from '../../context/AuthContext';

const MessageList = ({ messages, currentUser }) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div 
          key={message.id || message._id} 
          className={`flex ${message.sender?._id === currentUser._id ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender?._id === currentUser._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
            <div className="flex items-center space-x-2 mb-1">
              {message.sender?._id !== currentUser._id && (
                <Avatar name={message.sender?.username} src={message.sender?.avatar} />
              )}
              <span className="font-semibold">{message.sender?.username || 'Unknown'}</span>
              <span className="text-xs opacity-70">
                {format(new Date(message.timestamp || message.createdAt), 'HH:mm')}
              </span>
            </div>
            
            {message.content && (
              <p className="whitespace-pre-wrap">{message.content}</p>
            )}
            
            {message.attachments?.length > 0 && (
              <div className="mt-2 space-y-2">
                {message.attachments.map((file) => (
                  <div key={file.url} className="max-w-full">
                    {file.type.startsWith('image/') ? (
                      <img 
                        src={file.url} 
                        alt={file.name} 
                        className="max-h-64 rounded-md object-cover"
                      />
                    ) : (
                      <a 
                        href={file.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-500 hover:underline"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        {file.name}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {message.reactions?.length > 0 && (
              <MessageReactions 
                messageId={message._id || message.id}
                reactions={message.reactions}
                currentUser={currentUser}
              />
            )}
            
            {message.status && (
              <div className="text-right mt-1">
                <span className="text-xs opacity-70">
                  {message.status === 'sending' ? 'Sending...' : 'Delivered'}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;