import React from 'react';
import './VerticalLine.css'

const VerticalLine = (props) => (
  <div className='vertical-line' style={{'background-color': props.color || "aqua"}} />
)

export default VerticalLine;