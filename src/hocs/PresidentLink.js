import React from 'react';
import './PresidentLink.css'
import {presidentNameArray} from "../helper/constants";

const presNameToWiki = presName => ('https://en.wikipedia.org/wiki/' + presName.replace(' ','_'))

const PresidentLink = props => (
  <a href={presNameToWiki(presidentNameArray[props.level-1])} target='_blank' className='president-link'>{presidentNameArray[props.level-1]}</a>
)

export default PresidentLink;