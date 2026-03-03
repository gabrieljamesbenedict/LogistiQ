import React from 'react'
import NavigationBar from './NavigationBar'

const MainContent = ({children}: any) => {
  return (
    <>
        <NavigationBar/>
        <div className="flex pt-22 pl-[12vw]">
            <div className="flex-auto bg-background p-4">
                {children}
            </div>
        </div>
    </>
  )
}

export default MainContent