import React, {Component} from 'react';
import * as d3 from 'd3';
import {visualizationColorSchema} from '../helper/chartColorSchemes'
import './Histogram.css';

class Histogram extends Component {
   render() {
    if (this.props.data.length > 0) {
      const margin = {top:45, bottom:15, left:30, right:30}
      const {data, width, height} = this.props
      const innerWidth = width-margin.right-margin.left;
      const numResults = data.reduce((acc, num) => acc+=num.count, 0)
      const x = d3.scaleBand()
        .range([(innerWidth*3/4), 0])
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
            <text transform="rotate(-90)" y="-50" x={-height/3} dy="0.71em">
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

          {/* Display results as % on top of bars */}
          {data.map(d => (
            <text
              key={d.answer}
              x={x(d.answer)+x.bandwidth()/2}
              y={y(d.count)-2}
            >{(d.count*100/numResults).toFixed(0)}%</text>
          ))}
          {/* Histogram Legend */}
          <foreignObject transform={`translate(${innerWidth*(3/4)}, ${height*(1/5)})`}>
            {data.map((d, index) => (
              <div key={index} className='results-pie-chart-legend' style={{width:(innerWidth/4), backgroundColor:colors(index)}}> {d.answer}:{d.count} </div>
            ))}
          </foreignObject>
        </g>
      </svg>)
    } else {
      return null;
    }
  }
}

export default Histogram;