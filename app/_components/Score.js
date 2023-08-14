'use client'

import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react'
import Loading from './Loading'

const data = [
  {
    name: '',
    score: 50,
    fill: 'none'
  },
  {
    name: '25-29',
    score: 10,
    fill: 'red',
  }
];

export default function Score() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ?
    <div className="relative bg-[#FBFBFB] w-64 h-64">
      <h3 className="absolute top-[22px] left-[25px]">Score</h3>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <Pie
            dataKey='score'
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            isAnimationActive={false}
            // outerRadius={100}
            startAngle={-135}
            cornerRadius={10}
          >
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white h-[141px] w-[141px] rounded-full"></div>
      <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
        <span className="font-bold text-lg">12%</span>
        <br></br>
        de votre
        <br></br>
        objectif
      </p>
    </div>
    :
    <Loading />

}