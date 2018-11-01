import React, {Component} from 'react';
import * as d3 from 'd3';
import './PieChart.css';
import PieSlice from "./PieSlice";
import {visualizationColorSchema} from '../helper/chartColorSchemes'

class PieChart extends Component{
  render(){
    if (this.props.data) {
      const {data, width, height} = this.props
      const colors = d3.scaleOrdinal(visualizationColorSchema)
      const pie = d3.pie().padAngle(.05)
      const arcs = pie(data.map(d => d.count))
      arcs.forEach((arc, index) => arc.answer = data[index].answer);
      return (<svg id="question-results-pie" width={width} height={height}>
        <g transform={`translate(${width/ 3}, ${height / 2})`}>
          {arcs.map(d => (
            <PieSlice {...this.props} d={d} colors={colors} key={d.index}/>
          ))}
        </g>
        <foreignObject transform={`translate(${width*(3/4)}, ${height*(1/4)})`}>
          {arcs.map(d => (
          <div key={d.index}>
            <div style={{width:'24px', height:'24px', backgroundColor:colors(d.index)}}> </div>
            {d.answer}:{d.value}
          </div>
        ))}
        </foreignObject>
      </svg>)
    } else {
      return null;
    }
  }
}

export default PieChart;