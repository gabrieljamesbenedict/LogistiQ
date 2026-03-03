import React from 'react'
import LogistiQ from "@/app/images/LogistiQ.png"
import Image from 'next/image'

const Header = () => {
  return (
    <div className="flex justify-between bg-card border-b-2 border-card-border px-8 py-6 sticky top-0 z-10">
        <Image
            className="h-10 w-auto translate-y-1"
            src={LogistiQ}
            alt="LogistiQ"
        />
        <div className="flex gap-3 items-center">
            <h1 className="text-2xl">Jose Rizal</h1>
            <div className="bg-gray-300 rounded-4xl size-10"></div>
        </div>
    </div>
  )
}

export default Header