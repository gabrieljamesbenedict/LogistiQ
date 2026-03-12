import Link from 'next/link';
import React from 'react';

const ListItem = ({ children, isActive }: any) => {
  return (
    <li className={`cursor-pointer inline-block transition-all hover:scale-110 hover:text-accent h-full *:py-4 ${isActive ? 'text-accent font-bold' : ''}`}>
      {children}
    </li>
  );
};

export default ListItem;