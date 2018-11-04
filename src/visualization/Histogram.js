import React, {Component} from 'react';
import * as d3 from 'd3';
import {visualizationColorSchema} from '../helper/chartColorSchemes'
import './Histogram.css';

class Histogram extends Component {
  isLong =( data, width) => {
    return data.reduce((acc, result) => acc+result.answer.length, 0) / data.length > width
  }

  render() {
    if (this.props.data.length > 0) {
      const margin = {top:30, bottom:75, left:50, right:30}
      const {data, width, height} = this.props
      const x = d3.scaleBand()
        .range([width- margin.left - margin.right, 0])
        .domain(data.map(d => d.answer))
        .padding(0.1)
      const y = d3.scaleLinear()
        .range([height- margin.top - margin.bottom, 0])
        .domain([0, d3.max(data, d => d.count)])
      const colors = d3.scaleOrdinal(visualizationColorSchema)

      return (<svg id="question-results-histogram" width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g
            className="axis axis--x"
            transform={`translate(0, ${height-margin.bottom-margin.top})`}
            ref={node => d3.select(node).call(d3.axisBottom(x))}
          />
          <g className="axis axis--y">
            <g ref={node => d3.select(node).call(d3.axisLeft(y).ticks(5))} />
            <text transform="rotate(-90)" y="-50" x={-height/3} dy="0.71em" textAnchor="middle">
              Count
            </text>
          </g>
          {data.map((d, index) => (
            <rect
              key={d.answer}
              fill={colors(index)}
              className="bar"
              x={x(d.answer)}
              y={y(d.count)}
              width={x.bandwidth()}
              height={height - margin.bottom - margin.top - y(d.count)}
            />
          ))}
          {data.map(d => (
            <text
              key={d.answer}
              x={x(d.answer)}
              y={height - margin.bottom - margin.top + 20}
              textLength={(width-margin.left-margin.right-20)/data.length}
              className='text-wrap'
            >
              {d.answer.slice(0,15)}
            </text>
            ))}
        </g>
      </svg>)
    } else {
      return null;
    }
  }
}

export default Histogram;