import React, {Component} from 'react'
import Button from "../hocs/Button";
import PieChart from "../visualization/PieChart";
import Histogram from "../visualization/Histogram";
import './QuestionResultsVisualization.css'
import {educationOptions, genderOptions, locationOptions, raceOptions, ageRange, incomeRange, familySizeRange} from "../helper/demographicsOptions";
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

class QuestionResultsVisualization extends Component{
  defaultState={
    vizType:'pie',
    age:ageRange,
    income:incomeRange,
    familySize:familySizeRange,
    race: raceOptions,
    gender: genderOptions,
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

  isBetween = (value, range) => {
    return range[0] <= value && value <=range[1]
  }

  // filters results my current state, which indicates what the user is filtering by
  dataFilter = result => {
    let includesDemographics = true;
    this.demographicTypes.forEach(demoType => this.state[demoType].includes(result.user[demoType]) ? null : includesDemographics=false);
    this.demographicRanges.forEach(demoRange => this.isBetween(result.user[demoRange], this.state[demoRange]) ? null : includesDemographics=false);
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

  handleSlider = (target, event) => {
    this.setState({[target]:event})
  }

  createTickMarks = (range, step) => {
    // TODO: refactor using reduce?
    let tickObj = {}
    for(let i = range[0]; i<=range[1]; i+=step){
      tickObj[i] = i.toString().length>3 ? i.toString().slice(0,3).concat('K') : i;
    }
    return tickObj
  }

  createFilterComponent = (demographicArray, demographicName) => {
    return demographicArray.map(demographic => (
      <label key={demographic}>{demographic}
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
    const width = 800;
    const resultsObj = this.countResults(answers, results.filter(this.dataFilter))
    const visualizationData = this.toDataArray(resultsObj)
    const filterMenu = this.demographicTypes.map(demographicType => (
      <div key={demographicType} className='filter-type-wrapper'>{demographicType.toUpperCase()}:
        {this.createFilterComponent(this.demographicTypeToOption(demographicType), demographicType)}
      </div>
    ))
    return(<div className='question-results-visualization'>
      <Button label='Pie Chart' onClick={() => this.setState({vizType:'pie'})}/><Button label='Bar Chart' onClick={() => this.setState({vizType:'histogram'})}/>
        {this.state.vizType==='pie' && <PieChart data={visualizationData} height={height} width={width} outerRadius={200} innerRadius={10}  cornerRadius={12}/>}
        {this.state.vizType==='histogram' && <Histogram data={visualizationData} height={height} width={width} />}
        <div>
          <div className='filter-title'>Filter Results</div>
          <div>Use the sliders and check boxes to filter results based on the user's demographics. <br /> 0 values are users who have not provided that demographic</div>
          <div className='filter-range-wrapper'>
            <label>Age:
              <Range min={ageRange[0]}
                     max={ageRange[1]}
                     defaultValue={ageRange}
                     marks={this.createTickMarks(ageRange, 5)}
                     name={'age'}
                     onChange={this.handleSlider.bind(null, 'age')}
              />
            </label>
          </div>
          <div className='filter-range-wrapper'>
            <label>Income:
              <Range min={incomeRange[0]}
                     max={incomeRange[1]}
                     defaultValue={incomeRange}
                     marks={this.createTickMarks(incomeRange, 50000)}
                     name={'income'}
                     onChange={this.handleSlider.bind(null, 'income')} />
            </label>
          </div>
          <div className='filter-range-wrapper'>
            <label>Family Size:
              <Range min={familySizeRange[0]}
                     max={familySizeRange[1]}
                     defaultValue={familySizeRange}
                     marks={this.createTickMarks(familySizeRange, 1)}
                     name={'familySize'}
                     onChange={this.handleSlider.bind(null, 'familySize')} />
            </label>
          </div>
          {filterMenu}
        </div>
      </div>
    )
  }
}


export default QuestionResultsVisualization;