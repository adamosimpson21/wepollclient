import React, {Component} from 'react'
import Button from "../hocs/Button";
import PieChart from "../visualization/PieChart";
import Histogram from "../visualization/Histogram";
import './QuestionResultsVisualization.css'
import {educationOptions, genderOptions, locationOptions, raceOptions, ageRange, incomeRange, familySizeRange} from "../helper/demographicsOptions";
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import HorizontalLine from "../hocs/HorizontalLine";

class QuestionResultsVisualization extends Component{
  defaultState={
    vizType:'pie',
    filterMenu:false,
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

  isBetween = (value, range) => {
    return range[0] <= value && value <=range[1]
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

  handleFilterReset = () => {
    this.setState(this.defaultState);
    setTimeout(() => this.setState({filterMenu:true}), 0)
  }

  createTickMarks = (range, step) => {
    // TODO: refactor using reduce? Can you use reduce without iterating over every option in range?
    let tickObj = {}
    for(let i = range[0]; i<=range[1]; i+=step){
      let iString = i.toString()
      tickObj[i] = iString.length>3 ? iString.substring(0, iString.length - 3).concat('K') : i;
    }
    return tickObj
  }

  createFilterComponent = (demographicArray, demographicName) => {
    return demographicArray.map(demographic => (
      <span className='filter-option-wrapper' key={demographic} >{demographic}
        <label className='filter-option-label'>
          <input
            className='filter-option-demographic-checkbox'
            type='checkbox'
            name={demographicName}
            key={demographic}
            value={demographic}
            defaultChecked={true}
            onChange={this.handleFilter}
          />
          <span className="filter-option-slider"></span>
        </label>
      </span>
    ))
  }

  countResults = (answers, results) => {
    // This is to prevent answers that don't appear in the question from appearing (old data most likely)
    let resultsObj = {};
    answers.forEach(answer => resultsObj[answer] = 0);
    results.forEach(result => Number.isInteger(resultsObj[result.answer]) ? ++resultsObj[result.answer] : null );
    return Object.keys(resultsObj).map(key => ({answer:key, count:resultsObj[key]}))
  }

  // filters results by current state
  dataFilter = result => {
    // TODO: Can this be refactored for better readability? Should this use && conditionals or filter function?
    let includesDemographics = true;
    this.demographicTypes.forEach(demoType => this.state[demoType].includes(result.user[demoType]) ? null : includesDemographics=false);
    this.demographicRanges.forEach(demoRange => this.isBetween(result.user[demoRange], this.state[demoRange]) ? null : includesDemographics=false);
    return includesDemographics ? result : null
  }


  render(){
    const { results, answers } = this.props
    const resultsLoaded = !!this.props.results[0].user
    const isMobile = window.innerWidth<=700
    // Dimensions of Visualizations
    const height = isMobile ? 300 : 500;
    const width = isMobile ? window.innerWidth*.8 : 400;
    // Pie chart styles
    const outerRadius = isMobile ? 100 : 200;
    const innerRadius = isMobile ? 6 : 12;
    const cornerRadius = isMobile ? 12 : 24;
    const visualizationData = this.countResults(answers, results.filter(resultsLoaded ? this.dataFilter : () => true))
    const filterMenu = this.demographicTypes.map(demographicType => (
      <div key={demographicType} className='filter-type-wrapper'>
        <span className='filter-option-title' >
          {demographicType.toUpperCase()}:
        </span>
        {this.createFilterComponent(this.demographicTypeToOption(demographicType), demographicType)}
      </div>
    ))
    return(<div className='question-results-visualization'>
        <div className='results-button-wrapper'>
          <Button label='Pie Chart' onClick={() => this.setState({vizType:'pie'})} />
          <Button label='Bar Chart' onClick={() => this.setState({vizType:'histogram'})} />
        </div>
        {this.state.vizType==='pie' && <PieChart data={visualizationData} height={height} width={width} outerRadius={outerRadius} innerRadius={innerRadius}  cornerRadius={cornerRadius}/>}
        {this.state.vizType==='histogram' && <Histogram data={visualizationData} height={height} width={width} />}
        <div className='filter-options-wrapper'>
          {!this.state.filterMenu ? <Button label='Open Filter Options' onClick={() => this.setState({filterMenu:true})}/> : <span>
          <div className='filter-title'>Filter Options</div>
            <HorizontalLine/>
          <div>Use the sliders and check boxes to filter results based on the user's demographics.
            <br /><br />
            0 = Not Specified <Button label='Reset Filters' onClick={this.handleFilterReset}/>
          </div>
          <div className='filter-range-wrapper'>
            <label>Age (years):
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
            <label>Income (annual, USD):
              <Range min={incomeRange[0]}
                     max={incomeRange[1]}
                     defaultValue={incomeRange}
                     marks={this.createTickMarks(incomeRange, 50000)}
                     name={'income'}
                     onChange={this.handleSlider.bind(null, 'income')} />
            </label>
          </div>
          <div className='filter-range-wrapper'>
            <label>Family Size (humans):
              <Range min={familySizeRange[0]}
                     max={familySizeRange[1]}
                     defaultValue={familySizeRange}
                     marks={this.createTickMarks(familySizeRange, 1)}
                     name={'familySize'}
                     onChange={this.handleSlider.bind(null, 'familySize')} />
            </label>
          </div>
          {filterMenu}
          </span>}
        </div>
      </div>
    )
  }
}


export default QuestionResultsVisualization;