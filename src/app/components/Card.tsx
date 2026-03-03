  import React from 'react';

  interface CardProps {
    title: string;
    children: React.ReactNode;
    height: number;
    width: number;
  }

  const Card = ({ title, children, height, width }: CardProps) => {
    return (
      <div 
        className="bg-white rounded-lg shadow-md p-4"
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        <h4>{title}</h4>
        {children}
      </div>
    );
  };

  export default Card;