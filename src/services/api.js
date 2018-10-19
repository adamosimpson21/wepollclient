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
    console.log("ENV_TYPE is: ", process.env.ENV_TYPE)
    if(process.env.ENV_TYPE==='development'){
      return axios[method.toLowerCase()]('http://localhost:4000' + path, data)
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => {
          return reject(err.response.data.error);
        });
    } else if(process.env.ENV_TYPE==='production'){
      return axios[method.toLowerCase()]('https://wepollapi.herokuapp.com' + path, data)
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => {
          return reject(err.response.data.error);
        });
    } else {
      return axios[method.toLowerCase()](path, data)
        .then(res => {
          return resolve(res.data);
        })
        .catch(err => {
          return reject(err.response.data.error);
        });
    }
  });
}
