import Link from 'next/link';
import React from 'react';

interface ListItemProps {
  href: string;
  children: React.ReactNode;
}

const ListItem = ({ href, children }: ListItemProps) => {
  return (
    <li className="py-4 cursor-pointer inline-block transition-all hover:scale-110 hover:text-accent">
      <Link href={href} className="block w-full h-full">
        {children}
      </Link>
    </li>
  );
};

export default ListItem;