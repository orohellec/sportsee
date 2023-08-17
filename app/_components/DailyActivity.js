'use client'

import * as d3 from "d3";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import Loading from "./Loading";

const drawChart = data => {
  // define chart dimensions
  const width = 835
  const height = 320 - 110
  const margin = {
    left: 40,
    top: 20,
    right: 90,
    bottom: 60
  }

  const svg = d3.select('#activity').append('svg')
    .attr('width', width)
    .attr('height', height)

  /* Here we assume that sessions are well sorted from the first one
  to the last one */
  const graphData = data.sessions.map((session, index) => {
    session.day = index + 1
    return session
  })

  const xDomain = graphData.map(session => session.day)

  const x = d3.scaleBand()
    .domain(xDomain)
    .range([0, width - margin.left - margin.right])

  const minKilogram = graphData.reduce((acc, value) => {
    if (acc < value.kilogram) {
      return acc
    }
    return value.kilogram
  })

  const maxKilogram = graphData.reduce((acc, value) => {
    if (acc > value.kilogram) {
      return acc
    }
    return value.kilogram
  })

  const yKilograms = d3.scaleLinear()
    .domain([maxKilogram + 1, minKilogram - 1])
    .range([0, height - margin.top - margin.bottom])

  const xAxis = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSize(0).tickPadding(20))

  xAxis.select(".domain")
    .attr('stroke', '#DEDEDE')
    .attr('stroke-width', '1px')

  xAxis.selectAll(".tick")
    .attr('stroke', "#9B9EAC")

  const yKgAxis = svg.append('g')
    .attr('transform', `translate(${width - margin.right}, ${margin.top})`)
    .call(d3.axisRight(yKilograms)
      .ticks(maxKilogram - minKilogram)
      .tickSize(0)
      .tickPadding(20)
    )

  yKgAxis.select(".domain").remove()

  yKgAxis.selectAll(".tick > text")
    .attr('stroke', "#9B9EAC")

  // draw horizontal dotted lines
  const nLines = maxKilogram - minKilogram + 2

  let yLine = margin.top
  let lineGap = (height - margin.top - margin.bottom) / nLines

  for (let i = 0; i < nLines; i++) {
    svg.append('line')
      .style('stroke', '#DEDEDE')
      .style('stroke-dasharray', 4)
      .style('stroke-width', 1)
      .attr('x1', margin.left)
      .attr('y1', yLine)
      .attr('x2', width - margin.right)
      .attr('y2', yLine)

    yLine += lineGap
  }

  const maxCalories = graphData.reduce((acc, value) => {
    if (acc > value.calories) {
      return acc
    }
    return value.calories
  })

  const yCalories = d3.scaleLinear()
    .domain([maxCalories + 50, 0])
    .range([0, height - margin.top - margin.bottom])

  const twelfthBandwith = x.bandwidth() / 12

  svg.append('g')
    .selectAll('barsKilograms')
    .data(graphData)
    .join('rect')
    .attr('x', d => x(d.day))
    .attr('y', d => yKilograms(d.kilogram))
    .attr('width', '8px')
    .attr('height', d => yKilograms(minKilogram - 1) - yKilograms(d.kilogram))
    .attr('transform', `translate(${margin.left + 5 * twelfthBandwith - 4}, ${margin.top})`)
    .attr('fill', '#282D30')
    .attr('rx', '3')

  svg.append('g')
    .selectAll('barsCalories')
    .data(graphData)
    .join('rect')
    .attr('x', d => x(d.day))
    .attr('y', d => yCalories(d.calories))
    .attr('width', '8px')
    .attr('height', d => yCalories(0) - yCalories(d.calories))
    .attr('transform', `translate(${margin.left + 7 * twelfthBandwith - 4}, ${margin.top})`)
    .attr('fill', '#E60000')
    .attr('rx', '3')
}

const DailyActivity = ({ data }) => {

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [isClient])

  if (isClient) {
    drawChart(data)
    return (
      <div style={{
        backgroundColor: '#FBFBFB',
        width: 835,
        height: 322
      }}>
        <div
          className="flex justify-between"
          style={{
            marginLeft: 40,
            marginRight: 80,
            paddingTop: 24,
            marginBottom: 64
          }}
        >
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

        <div id="activity"></div>
      </div>
    )
  }
  return <Loading twClasses='bg-c-gray h-[322px] w-[835px]' />
}

export default DailyActivity