import React from 'react';

const Card = ({children}: any) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4"
    >
      {children}
    </div>
  );
};

export default Card;