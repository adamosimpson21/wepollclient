import React from 'react';
import './HorizontalLine.css'

const HorizontalLine = (props) => (
  <div className='horizontal-line' style={{'background-color': props.color || "orange"}} />
)

export default HorizontalLine;
