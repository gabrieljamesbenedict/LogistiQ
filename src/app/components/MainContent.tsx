import React from 'react'
import NavigationBar from './NavigationBar'

const MainContent = ({children}: any) => {
  return (
    <div className="flex h-screen">
        <NavigationBar/>
        <div className="flex-auto bg-background p-4">
            {children}
        </div>
    </div>
  )
}

export default MainContent