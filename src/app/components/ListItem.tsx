import Link from 'next/link';
import React from 'react';

const ListItem = ({ children, isActive }: any) => {
  return (
    <li className={`py-4 cursor-pointer inline-block transition-all hover:scale-110 hover:text-accent h-full ${isActive ? 'text-accent font-bold' : ''}`}>
      {children}
    </li>
  );
};

export default ListItem;