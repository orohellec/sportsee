'use client'

import { useState, useEffect } from 'react'
import Loading from './Loading'
import {
  LineChart,
  Line,
  XAxis,
  Legend,
  Tooltip,
  ResponsiveContainer
} from 'recharts';


export default function ({ data }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // bg-[#FF0000]
  const commonClasses = "w-64 h-64 bg-[#FF0000] text-white"

  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  const graphData = data.sessions.map((s, index) => {
    return ({
      name: weekDays[index],
      duration: s.sessionLength
    })
  })

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-white px-4 py-2">
          <p className="label text-black">{`${payload[0].value} min`}</p>
        </div>
      );
    }

    return null;
  };

  return isClient ?
    <div className={`relative ${commonClasses}`}>
      <div className='absolute h-64 w-[75px] bg-black bg-opacity-10 top-0 right-0'></div>
      <ResponsiveContainer
        width='100%'
        height='100%'
      >
        <LineChart
          data={graphData}
          margin={{
            left: 20,
            right: 20,
            top: 100,
            bottom: 25
          }}
        >
          <XAxis
            dataKey="name"
            stroke='rgb(255, 255, 255, 0.5)'
            axisLine={false}
            tickLine={false}
          />
          <Line
            type="monotone"
            dataKey="duration"
            stroke="rgb(255, 255, 255, 0.5)"
            dot={false}
            onMouseEnter={() => {
              console.log('enter')
            }}
          />
          <Tooltip
            cursor={false}
            content={<CustomTooltip />}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className='absolute top-[20px] left-[20px] text-white text-opacity-50'>
        Durée moyenne des
        <br></br>
        sessions
      </p>
    </div> :
    <Loading twClasses={commonClasses} />

}