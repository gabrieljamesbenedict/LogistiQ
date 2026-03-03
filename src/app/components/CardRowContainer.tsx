import React from 'react'

const CardRowContainer = ({children}: any) => {
  return (
    <div className="flex justify-between gap-4 *:flex-auto">
        {children}
    </div>
  )
}

export default CardRowContainer