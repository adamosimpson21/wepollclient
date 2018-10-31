import React, {Component} from 'react';
import * as d3 from 'd3';
import {visualizationColorSchema} from '../helper/chartColorSchemes'
import './Histogram.css';

class Histogram extends Component {
  render() {
    if (this.props.data.length > 0) {
      const margin = {top:0, bottom:75, left:30, right:30}
      const {data, width, height} = this.props

      const x = d3.scaleBand()
        .range([width- margin.left - margin.right, 0])
        .domain(data.map(d => d.answer))
        .padding(0.1)
      const y = d3.scaleLinear()
        .range([height- margin.top - margin.bottom, 0])
        .domain([0, d3.max(data, d => d.count)])

      return (<svg id="question-results-histogram" width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g
            className="axis axis--x"
            transform={`translate(0, ${height-margin.bottom-margin.top})`}
            ref={node => d3.select(node).call(d3.axisBottom(x))}
          />
          <g className="axis axis--y">
            <g ref={node => d3.select(node).call(d3.axisLeft(y).ticks(10))} />
            <text transform="rotate(-90)" y="6" dy="0.71em" textAnchor="end">
              Count
            </text>
          </g>
          {data.map(d => (
            <rect
              key={d.id}
              className="bar"
              x={x(d.answer)}
              y={y(d.count)}
              width={x.bandwidth()}
              height={height - margin.bottom - margin.top - y(d.count)}
            />
          ))}
        </g>
      </svg>)
    } else {
      return null;
    }
  }
}

export default Histogram;