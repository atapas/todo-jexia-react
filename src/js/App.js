import React from "react";
import TODO from './TODO';

import { useList } from './jexia/useList';

const App = () => {
  const [ data, loading ] = useList("todos");
  
  return (
    <React.Fragment>
      {
        loading ?
          (<h1>Loading Todos from Jexia...</h1>) 
          : (<TODO todos={ data }/>) 
      }
    </React.Fragment>
  );
};

export default App;

