import React, {Component} from 'react'
import './EducationEmbed.css';
import {formatUrlToEmbed, isLink} from "../helper/regexes";
import Button from "./Button";


class EducationEmbed extends Component{
  state={
    isRevealed:false
  }



  render(){
    const {education} = this.props
    const educationEmbed = (<div>{this.state.isRevealed ? [<Button label='Close Education' onClick={()=> this.setState({isRevealed:false})} key='close-education'/>,
                              <embed className='education-embed' src={formatUrlToEmbed(education)} key='education-embed'/>] :
                              <Button label='Learn more about this poll' onClick={()=> this.setState({isRevealed:true})}/>}
                            </div>)
    const educationJSX = isLink(education) ? educationEmbed : (<span>{education}</span>)
    return(<div className='question-education'>{educationJSX}</div>)
  }
}

export default EducationEmbed;

