import axios from "axios";

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    if(process.env.REACT_APP_ENV_TYPE==='development'){
      return axios[method.toLowerCase()]('http://localhost:4000' + path, data)
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => {
          return reject(err.response.data.error);
        });
    } else if(process.env.REACT_APP_ENV_TYPE==='production'){
      return axios[method.toLowerCase()]('https://wepollapi.herokuapp.com' + path, data)
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => {
          if(err.response){
            return reject(err.response.data.error);
          } else {
            console.log("API asleep error: ", err)
            err.message = "API is asleep, refresh this page in about 10-15 seconds";
            return reject(err);
          }
        });
    } else {
      return axios[method.toLowerCase()](path, data)
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => {
          if(err.response){
            return reject(err.response.data.error);
          } else {
            console.log("API asleep error: ", err)
            err.message = "API is asleep, refresh this page in about 10-15 seconds";
            return reject(err);
          }
        });
    }
  });
}
