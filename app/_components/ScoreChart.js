'use client'

import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react'
import Loading from './Loading'

export default function Score({ score }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const data = [
    {
      score: 100 - score * 100,
      fill: 'none'
    },
    {
      score: score * 100,
      fill: 'red',
    }
  ]

  const commonClasses = 'w-64 h-64 bg-c-gray'

  return isClient ?
    <div className={`relative ${commonClasses}`}>
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
    <Loading twClasses={commonClasses} />

}