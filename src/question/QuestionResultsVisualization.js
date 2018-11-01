import React, {Component} from 'react'
import Button from "../hocs/Button";
import PieChart from "../visualization/PieChart";
import Histogram from "../visualization/Histogram";
import { handleChange } from "../helper/handleChange";
import {educationOptions, genderOptions, locationOptions, raceOptions} from "../helper/demographicsOptions";

class QuestionResultsVisualization extends Component{
  defaultState={
    vizType:'histogram',
    age:0,
    income:0,
    familySize:0,
    allGender:true,
    allRace:true,
    allLocation:true,
    allEducation:true,
    race:raceOptions,
    gender:genderOptions,
    location:locationOptions,
    education: educationOptions
  }

  state=this.defaultState

  toDataArray = object => {
    return Object.keys(object).map(key => ({answer:key, count:object[key]})  )
  }

  // filters results my current state, which indicates what the user is filtering by
  dataFilter = result => {

  }

  handleFilter = event => {
    const target = event.target;
    const value = target.value;
    const boolean = target.checked;
    if(boolean){
      console.log("[...this.state[target.name].push(value)]:" , this.state[target.name])
      this.setState({
        [target.name]: this.state[target.name].push(value)
      });
    } else {
      this.setState({
        [target.name]: this.state[target.name].filter(option => option!==value)
      });
    }
  }

  render(){
    const { results, resultsObj } = this.props
    const height = 500;
    const width = 500;
    const filteredResults = results.filter(this.dataFilter);
    const visualizationData = this.toDataArray(resultsObj)
    console.log("results are: ", results);
    return(<div>
        <div>
          <div>Filter Results</div>
          <div>Gender</div>
          <input
            type='checkbox'
            name='allGender'
            value='All'
            checked={this.state.allGender}
            onChange={handleChange.bind(this)}
          />
          <input
            type='checkbox'
            name='gender'
            value='Male'
            onChange={this.handleFilter}
          />

        </div>
      <Button label='Pie Chart' onClick={() => this.setState({vizType:'pie'})}/><Button label='Bar Chart' onClick={() => this.setState({vizType:'histogram'})}/>
        {this.state.vizType==='pie' && <PieChart data={visualizationData} height={height} width={width} outerRadius={200} innerRadius={10}  cornerRadius={12}/>}
        {this.state.vizType==='histogram' && <Histogram data={visualizationData} height={height} width={width} />}
      </div>
    )
  }
}


export default QuestionResultsVisualization;