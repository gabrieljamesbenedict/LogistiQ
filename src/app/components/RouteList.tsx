import React from 'react'
import Card from './Card';
import Image from 'next/image'

export interface Route {
  id: number
  stops: Stops[];
  driver: string;
}

interface Stops{
  place: string;
  placeDesc: string;
  time: Date;
  price: number;
}

