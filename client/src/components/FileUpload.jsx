// client/src/components/FileUpload.jsx
import { useState } from 'react';

const FileUpload = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const file = files[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert('Only images (JPEG, PNG, GIF) and PDFs are allowed');
      return;
    }

    // Upload file
    const reader = new FileReader();
    reader.onload = (e) => {
      onUpload({
        name: file.name,
        type: file.type,
        size: file.size,
        data: e.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div 
      className={`relative border-2 border-dashed rounded-lg p-4 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        id="file-upload" 
        className="hidden" 
        onChange={handleFileInput}
      />
      <div className="text-center">
        <p className="mb-2">Drag & drop files here or</p>
        <label 
          htmlFor="file-upload" 
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Browse Files
        </label>
        <p className="mt-2 text-sm text-gray-500">Max file size: 5MB</p>
      </div>
    </div>
  );
};

export default FileUpload;