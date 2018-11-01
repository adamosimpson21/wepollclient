import React, {Component} from 'react'
import Button from "../hocs/Button";
import PieChart from "../visualization/PieChart";
import Histogram from "../visualization/Histogram";
import {educationOptions, genderOptions, locationOptions, raceOptions} from "../helper/demographicsOptions";

class QuestionResultsVisualization extends Component{
  defaultState={
    vizType:'histogram',
    age:{min:0, max:150},
    income:{min:0, max:1000000000},
    familySize:{min:0, max:20},
    race:raceOptions,
    gender:genderOptions,
    location:locationOptions,
    education: educationOptions
  }

  state=this.defaultState
  demographicTypes = ['race', 'gender', 'education', 'location']
  demographicRanges = ['age', 'income', 'familySize']

  demographicTypeToOption = demographicType => {
    switch(demographicType){
      case 'race':
        return raceOptions;
      case 'gender':
        return genderOptions;
      case 'education':
        return educationOptions;
      case 'location':
        return locationOptions;
      default:
        return null;
    }
  }

  countResults = (answers, results) => {
    // This is to prevent answers that don't appear in the question from appearing (old data most likely)
    let resultsObj = {};
    answers.forEach(answer => resultsObj[answer] = 0);
    results.forEach(result => Number.isInteger(resultsObj[result.answer]) ? ++resultsObj[result.answer] : null );
    return resultsObj;
  }

  toDataArray = object => {
    return Object.keys(object).map(key => ({answer:key, count:object[key]})  )
  }

  // filters results my current state, which indicates what the user is filtering by
  dataFilter = result => {
    let includesDemographics = true;
    this.demographicTypes.forEach(demoType => this.state[demoType].includes(result.user[demoType]) ? null : includesDemographics=false);
    return includesDemographics ? result : null
  }

  handleFilter = event => {
    const target = event.target;
    const value = target.value;
    if(target.checked){
      this.setState({
        [target.name]: this.state[target.name].concat(value)
      });
    } else {
      this.setState({
        [target.name]: this.state[target.name].filter(option => option!==value)
      });
    }
  }

  createFilterComponent = (demographicArray, demographicName) => {
    return demographicArray.map(demographic => (
      <label>{demographic}
        <input
          type='checkbox'
          name={demographicName}
          key={demographic}
          value={demographic}
          defaultChecked={true}
          onChange={this.handleFilter}
        />
      </label>
    ))
  }

  render(){
    const { results, answers } = this.props
    const height = 500;
    const width = 500;
    const resultsObj = this.countResults(answers, results.filter(this.dataFilter))
    const visualizationData = this.toDataArray(resultsObj)
    const filterMenu = this.demographicTypes.map(demographicType => (
      <div key={demographicType}>{demographicType}:
        {this.createFilterComponent(this.demographicTypeToOption(demographicType), demographicType)}
      </div>
    ))
    return(<div>

      <Button label='Pie Chart' onClick={() => this.setState({vizType:'pie'})}/><Button label='Bar Chart' onClick={() => this.setState({vizType:'histogram'})}/>
        {this.state.vizType==='pie' && <PieChart data={visualizationData} height={height} width={width} outerRadius={200} innerRadius={10}  cornerRadius={12}/>}
        {this.state.vizType==='histogram' && <Histogram data={visualizationData} height={height} width={width} />}
        <div>
          <div>Filter Results</div>
          {filterMenu}
        </div>
      </div>
    )
  }
}


export default QuestionResultsVisualization;