import React from 'react';
import './HorizontalLine.css'

const HorizontalLine = (props) => (
  <div className='horizontal-line' style={{'backgroundColor': props.color || "orange"}} />
)

export default HorizontalLine;
