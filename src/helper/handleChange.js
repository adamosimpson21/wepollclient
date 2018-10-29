export function handleChange(event){
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  this.setState({
    [target.name]: value
  });
}