import React, {useState} from 'react';
import './About.css'
import BackFrame from "../hocs/BackFrame";

function About(){
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Something here</h1>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Count Up To The Moon</button>
    </div>
  );
}

export default About

// () => window.location = 'https://www.dinnostudio.com/wepoll-deck'