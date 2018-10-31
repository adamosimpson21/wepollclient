import React, {Component} from 'react';
import './PieSlice.css'
import * as d3 from "d3";

class PieSlice extends Component {
  constructor(props){
    super(props)
    this.state = {
      isHovered:false,
      transform:''
    }
  }
  mouseOver(){
    this.setState({isHovered:true})
  }

  mouseOut(){
    this.setState({isHovered:false})
  }

  render() {
    const {d, data, innerRadius, outerRadius, cornerRadius, colors} = this.props
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(cornerRadius)
      .startAngle(d => d.startAngle + Math.PI * 1.5)
      .endAngle(d => d.endAngle + Math.PI * 1.5)
    return (
      <g className="arc" key={`a${data}`}
         onMouseOut={() => this.mouseOut()}
         onMouseOver={() => this.mouseOver()}>
        <path d={arc(d)} fill={colors(d.index)}/>
        <foreignObject transform={`translate(${arc.centroid(d)})`} dy=".35em" className="hallOfFamePieLabel">
          { this.state.isHovered &&
          <div className="tooltip">
            {data[d.index].answer}: {data[d.index].count}
          </div> }
        </foreignObject>
      </g>)
  }
}

export default PieSlice;