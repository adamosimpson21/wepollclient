import React, {Component} from 'react'
import './EducationEmbed.css';
import {formatUrlToEmbed} from "../helper/regexes";
import Button from "./Button";


class EducationEmbed extends Component{
  state={
    isRevealed:false
  }

  render(){
    return(<div>{this.state.isRevealed ? [<embed className='education-embed' src={formatUrlToEmbed(this.props.education)} />,
      <Button label='Close Education' onClick={()=> this.setState({isRevealed:false})}/>] :
      <Button label='Learn more about this poll' onClick={()=> this.setState({isRevealed:true})}/>}
        </div>)
  }
}

export default EducationEmbed;