import React from "react";
import TODO from './TODO';

import { useFetch } from './jexia/useFetch';

const App = () => {
  const [ data, loading ] = useFetch("todos");
  
  return (
    <React.Fragment>
      {
        loading ?
          (<h1>loading from Jexia...</h1>) 
          : (<TODO todos={ data }/>) 
      }
    </React.Fragment>
  );
};

export default App;

