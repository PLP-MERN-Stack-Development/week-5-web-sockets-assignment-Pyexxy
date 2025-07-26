import { motion, AnimatePresence } from 'framer-motion';

const TypingIndicator = ({ users }) => {
  if (!users.length) return null;

  const getTypingText = () => {
    if (users.length === 1) return `${users[0]} is typing...`;
    if (users.length === 2) return `${users[0]} and ${users[1]} are typing...`;
    return `${users[0]}, ${users[1]} and others are typing...`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute bottom-16 left-4 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1 text-sm text-gray-600 dark:text-gray-300"
      >
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span>{getTypingText()}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TypingIndicator;