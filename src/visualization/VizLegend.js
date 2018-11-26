import React, {Component} from 'react';
import './VizLegend.css';

class VizLegend extends Component{
  render(){
    const { data, colors} = this.props
    return(<div className='visualization-legend'> {data.map((d, index) => (
      <div key={index} className='visualization-legend-element' style={{ backgroundColor:colors(index)}}> {d.answer}: {d.count} </div>
    ))}</div>)
  }
}

export default VizLegend;