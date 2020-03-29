import React from 'react';
import {FullStateName} from "./data/s";

interface WidgetProps {
  fullStateName: FullStateName;
  [key: string]: any; // TODO
}

function Widget(props: WidgetProps) {
  const {fullStateName, people, jobs} = props;

  return <div style={{border: '1px solid green'}}>
    <p>{fullStateName}</p>
    <div>{
      people ?
        Object.keys(people).length ?
          <>population - <pre>{JSON.stringify(people, null, 2)}</pre></>
          : <>no population data</>
      : null
    }</div>
    <div>{
      jobs ?
        Object.keys(jobs).length ?
          <>jobs - <pre>{JSON.stringify(jobs, null, 2)}</pre></>
          : <>no jobs data</>
      : null
    }</div>
  </div>
}

export default Widget;
