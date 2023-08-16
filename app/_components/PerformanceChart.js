'use client'

import { useState, useEffect } from 'react'
import Loading from './Loading'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer
} from "recharts";

export default function ({ data }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const commmonClass = "w-64 h-64 bg-c-black text-white"

  const kind = data.kind
  const graphData = data.data.map(d => {
    const subject = kind[d.kind]
    d.subject = subject.charAt(0).toUpperCase() + subject.slice(1)
    return d
  })

  return isClient ?
    <div className={`${commmonClass}`}>
      <ResponsiveContainer
        width='100%'
        height='100%'
      >
        <RadarChart
          data={graphData}
          outerRadius='55%'
        >
          <PolarGrid />
          <PolarAngleAxis
            tickLine={false}
            stroke='white'
            dataKey="subject"
            fontSize="12px"
          />
          <Radar
            dataKey="value"
            fill="rgba(255, 1, 1, 0.70)"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>

    </div> :
    <Loading twClasses={commmonClass} />
}

