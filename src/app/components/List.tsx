import React from 'react'

const List = ({children}: any) => {
  return (
    <ul className="flex flex-col gap-8 text-xl">
        {children}
    </ul>
  )
}

export default List