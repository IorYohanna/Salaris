import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | '';
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  return (
    <div
      className={` toast
        ${message ? 'translate-x-0' : 'translate-x-100'}
        ${type === 'success'
          ? 'bg-linear-to-r from-[#6B4C35] to-[#876245]'
          : 'bg-linear-to-r from-red-600 to-red-500'
        }`}
    >
      {message}
    </div>
  );
};

export default Toast;