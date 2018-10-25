import React, {Component} from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed';

class WePollTwitterFeed extends Component{
  render(){
    return(<TwitterTimelineEmbed
      sourceType="profile"
      screenName="WePoll_TheGame"
      options={{height: 400, width:400}}
    />)
  }
}

export default WePollTwitterFeed;