import React from 'react'
import Card from '../Card'
import Image from 'next/image'

const SingleNumberStatisticCard = ({title, data, iconSrc}: any) => {
  return (
    <Card>
       <h2>{title}</h2>
       <span className="flex gap-2">
        <Image src={iconSrc} alt={title} width={30} height={30}/>
        <h1 className="text-3xl font-bold">{data}</h1>
      </span>
    </Card>
  )
}

export default SingleNumberStatisticCard