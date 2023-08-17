'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loading from './Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export default function ({ data }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const commonClasses = "w-[900px] h-[390px] bg-c-gray"

  const graphData = data.sessions.map((d, index) => {
    return (
      {
        day: index + 1,
        kilogram: d.kilogram,
        calories: d.calories
      }
    )
  })

  const minWeight = graphData.reduce((acc, value) => {
    return (acc.kilogram < value.kilogram ? acc : value)
  }).kilogram

  const maxWeight = graphData.reduce((acc, value) => {
    return (acc.kilogram > value.kilogram ? acc : value)
  }).kilogram

  const maxCalories = graphData.reduce((acc, value) => {
    return (acc.calories > value.calories ? acc : value)
  }).calories

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-[#E60000] px-4 py-2">
          <p className="label text-white">{`${payload[0].value}kg`}</p>
          <p className="label text-white">{`${payload[1].value}kCal`}</p>
        </div>
      );
    }
  }

  return isClient ?
    <div className={`${commonClasses} pl-8 pr-4`}>
      <div className='flex justify-between mt-5 mb-8 pr-4'>
        <h1>Activité Quotidienne</h1>
        <div className="flex align-middle">
          <div>
            <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#282D30", }} />
          </div>
          <p className="ml-2 mr-8">Poids (kg)</p>
          <div>
            <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#E60000", }} />
          </div>
          <p className="ml-2">Calories brûlées (kCal)</p>
        </div>
      </div>
      <div className='w-[900px] h-[310px] pr-8 pb-5' >
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={graphData}
            barSize={12}
            barGap={'10%'}
            margin={{ bottom: 0 }}
          >
            <XAxis dataKey='day' />
            <YAxis
              yAxisId={'weight'}
              type="number"
              domain={[minWeight - 1, maxWeight + 1]}
              orientation='right'
              tickCount={8}
              minTickGap={1}
            />
            <YAxis
              yAxisId={'calories'}
              type="number"
              domain={[0, maxCalories + 50]}
              hide={true}
              tickCount={maxCalories}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fillOpacity: '0.5' }}
            />
            <CartesianGrid strokeDasharray="4" vertical={false} />
            <Bar dataKey='kilogram' fill='black' yAxisId={'weight'} radius={[5, 5, 0, 0]} />
            <Bar dataKey='calories' fill='#E60000' yAxisId={'calories'} radius={[5, 5, 0, 0]} />

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div> :
    <Loading twClasses={`${commonClasses}`} />

}