import React from 'react';
import './VerticalLine.css'

const VerticalLine = (props) => (
  <div className='vertical-line' style={{'backgroundColor': props.color || "aqua"}} />
)

export default VerticalLine;