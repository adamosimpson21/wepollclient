import React, {Component} from 'react';
import './PieSlice.css'
import * as d3 from "d3";

class PieSlice extends Component {
  state = {
      isHovered:false,
      transform:''
    }

  render() {
    const {d, innerRadius, outerRadius, cornerRadius, colors, index} = this.props
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(cornerRadius)
      .startAngle(d => d.startAngle + Math.PI * 1.5)
      .endAngle(d => d.endAngle + Math.PI * 1.5)
    return (<g className="arc" key={d.answer}>
              <path d={arc(d)} fill={colors(index)}/>
            </g>)
  }
}

export default PieSlice;