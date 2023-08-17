'use client'

import { useState, useEffect } from 'react'
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import Loading from './Loading'

export default function ({ data }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const commonClasses = 'w-64 h-64 bg-c-gray'
  const graphData = [
    {
      score: 100 - data * 100,
      fill: 'none'
    },
    {
      // score: data * 100,
      score: data * 100,
      fill: 'red',
    },
  ]

  return isClient ?
    <div className={`relative ${commonClasses}`}>
      <h3 className="absolute top-[22px] left-[25px]">Score</h3>
      <ResponsiveContainer width='100%' height='100%'>
        <RadialBarChart
          data={graphData}
          barSize={12}
          innerRadius={70}
          startAngle={220}
          endAngle={-140}
        >
          <RadialBar
            dataKey='score'
            clockwise={true}
            innerRadius={70}
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white h-[154px] w-[154px] rounded-full"></div>
      <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
        <span className="font-bold text-lg">{`${data * 100}%`}</span>
        <br></br>
        de votre
        <br></br>
        objectif
      </p>
    </div> :
    <Loading twClasses={commonClasses} />
}