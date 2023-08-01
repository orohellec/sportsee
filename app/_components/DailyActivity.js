'use client'

import * as d3 from "d3";
import { useEffect } from 'react';

const getData = (userId) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/user/${userId}/activity`)
      .then(res => {
        resolve(res.json())
      })
      .catch(err => reject(err))
  })
}

const drawChart = () => {
  getData(12)
    .then(({ data }) => {
      // define chart dimensions
      const width = 835
      const height = 320
      const margin = {
        left: 40,
        top: 110,
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

      const xDomain = graphData.map(session => {
        return session.day
      })

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

      svg.append('g')
        .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
        .call(d3.axisBottom(x))

      svg.append('g')
        .attr('transform', `translate(${width - margin.right}, ${margin.top})`)
        .call(d3.axisRight(yKilograms).ticks(maxKilogram - minKilogram))

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

      const quarterBandwith = x.bandwidth() / 4

      svg.append('g')
        .selectAll('barsKilograms')
        .data(graphData)
        .join('rect')
        .attr('x', d => x(d.day))
        .attr('y', d => yKilograms(d.kilogram))
        .attr('width', '8px')
        .attr('height', d => yKilograms(minKilogram - 1) - yKilograms(d.kilogram))
        .attr('transform', `translate(${margin.left + quarterBandwith - 4}, ${margin.top})`)
        .attr('rx', '3')

      svg.append('g')
        .selectAll('barsCalories')
        .data(graphData)
        .join('rect')
        .attr('x', d => x(d.day))
        .attr('y', d => yCalories(d.calories))
        .attr('width', '8px')
        .attr('height', d => yCalories(0) - yCalories(d.calories))
        .attr('transform', `translate(${margin.left + 3 * quarterBandwith - 4}, ${margin.top})`)
        .attr('fill', 'red')
        .attr('rx', '3')
    })
    .catch(err => console.log(err))
}


const DailyActivity = () => {

  useEffect(() => {
    drawChart()
  })

  return (
    <div id="activity" style={{ backgroundColor: '#FBFBFB' }}>

    </div>
  )
}

export default DailyActivity