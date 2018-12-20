import React from 'react';
import './About.css'
import BackFrame from "../hocs/BackFrame";
import Button from "../hocs/Button";

const About = () => {
  return (
    <div>
      <h1>Learn more about WePoll and Democratic Innovation Studios</h1>
      <a href='https://www.dinnostudio.com/wepoll-deck' target='_blank' rel="noopener noreferrer"><Button label='DInnoS Home Page' /></a>
    </div>
  );
}

export default BackFrame(About);