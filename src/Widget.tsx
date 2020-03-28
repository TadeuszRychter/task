import React from 'react';
import {FullStateName} from "./data/s";

interface WidgetProps {
  fullStateName: FullStateName;
  [key: string]: any; // TODO
}

function Widget(props: WidgetProps) {
  const {fullStateName, people} = props;

  return <div style={{border: '1px solid green'}}>
    <p>{fullStateName}</p>
    <p>{
      people ?
        Object.keys(people).length ?
          <>population - <pre>{JSON.stringify(people, null, 2)}</pre></>
          : <>no population data</>
      : null
    }</p>
  </div>
}

export default Widget;
