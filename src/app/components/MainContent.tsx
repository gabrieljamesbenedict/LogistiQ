import React from 'react'

const MainContent = ({children}: any) => {
  return (
    <>
        <div className="flex pt-20 pl-[12vw]">
            <div className="flex-auto bg-background p-4">
                {children}  
            </div>
        </div>
    </>
  )
}

export default MainContent