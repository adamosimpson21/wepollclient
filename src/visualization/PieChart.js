import React, {Component} from 'react';
import * as d3 from 'd3';
import './PieChart.css';
import PieSlice from "./PieSlice";
import {visualizationColorSchema} from '../helper/chartColorSchemes'
import VizLegend from "./VizLegend";

class PieChart extends Component{
  render(){
    if (this.props.data) {
      const {data, width, height} = this.props
      const colors = d3.scaleOrdinal(visualizationColorSchema)
      const pie = d3.pie().padAngle(.05)
      const arcs = pie(data.map(d => d.count))
      arcs.forEach((arc, index) => arc.answer = data[index].answer);
      return (<div className='pie-chart-wrapper'>
        <svg id="question-results-pie" width={width} height={height}>
          <g transform={`translate(${width/ 2}, ${height / 2})`}>
            {arcs.map((d, index) => (
              <PieSlice {...this.props} d={d} colors={colors} key={index} index={index}/>
            ))}
          </g>
        </svg>
        <VizLegend data={data} colors={colors} />
      </div>)
    } else {
      return null;
    }
  }
}

export default PieChart;