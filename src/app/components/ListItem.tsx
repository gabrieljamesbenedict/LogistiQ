import Link from 'next/link';
import React from 'react';

interface ListItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const ListItem = ({ href, children, isActive }: ListItemProps) => {
  return (
    <li className={`py-4 cursor-pointer inline-block transition-all hover:scale-110 hover:text-accent h-full ${isActive ? 'text-accent font-bold' : ''}`}>
      <Link href={href} className="block w-full h-full">
        {children}
      </Link>
    </li>
  );
};

export default ListItem;