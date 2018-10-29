import React from 'react';
import Loader from "react-loader-spinner";

const MyLoader = () => {
  return(<Loader
    type="Circles"
    color="#00BFFF"
    height={200}
    width={100}
  />)
}

export default MyLoader;