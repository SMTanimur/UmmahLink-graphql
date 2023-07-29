import React from "react";

export const SmartLoader: React.FC<{ mode?: string; size?: string }> = ({ mode, size }) => {
  return (
    <div className="flex items-center space-x-2">
      <div
        className={`animate-loader ${mode === 'light' ? 'animate-loader-light' : 'animate-loader-dark'}`}
        style={{
          width: `${size === 'md' ? '20px' : '10px'}`,
          height: `${size === 'md' ? '20px' : '10px'}`
        }}
      />
      <div
        className={`animate-loader ${mode === 'light' ? 'animate-loader-light' : 'animate-loader-dark'}`}
        style={{
          width: `${size === 'md' ? '20px' : '10px'}`,
          height: `${size === 'md' ? '20px' : '10px'}`
        }}
      />
      <div
        className={`animate-loader ${mode === 'light' ? 'animate-loader-light' : 'animate-loader-dark'}`}
        style={{
          width: `${size === 'md' ? '20px' : '10px'}`,
          height: `${size === 'md' ? '20px' : '10px'}`
        }}
      />
    </div>
  );
};

SmartLoader.defaultProps = {
  mode: 'dark',
  size: 'sm'
}


