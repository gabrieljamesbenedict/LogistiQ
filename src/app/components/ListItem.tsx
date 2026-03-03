import React from 'react'

const ListItem = ({children}: any) => {
  return (
    <li className="py-4 cursor-pointer inline-block transition-all hover:scale-110 hover:text-accent">
      {children}
    </li>
  )
}

export default ListItem