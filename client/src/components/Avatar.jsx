const Avatar = ({ name, src, size = 'md' }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const initials = name
    ?.split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();

  return (
    <div className={`${sizes[size]} rounded-full bg-gray-300 flex items-center justify-center overflow-hidden`}>
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span className="text-gray-600 font-medium">{initials}</span>
      )}
    </div>
  );
};

export default Avatar;