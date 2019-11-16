import React from "react";
import TODO from './TODO';

import { useList } from './jexia/useList';

const App = () => {
  const [ data, loading ] = useList("todos");
  
  return (
    <React.Fragment>
      {
        loading ?
          <div>
            <h1>Loading TODOs from Jexia</h1>
          </div>
          : 
          (<TODO todos={ data }/>) 
      }
    </React.Fragment>
  );
};

export default App;

