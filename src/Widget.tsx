import React from 'react';
import {FullStateName} from "./data/s";
import {pickColor} from "./utils"; // TODO figure out how to sue it with Chartist
import ChartistGraph from "react-chartist";

interface WidgetProps {
  fullStateName: FullStateName;
  [key: string]: any; // TODO
}

function Widget(props: WidgetProps) {
  const {fullStateName, people, jobs} = props;

  return <div style={{border: '1px solid #ccc'}}>
    <h1 style={{textAlign: 'center'}}>{fullStateName}</h1>

    <div>{
      people ?
        Object.keys(people).length ?
          <>
            <h2 style={{textAlign: 'center'}}>People</h2>
            <ChartistGraph
              type={'Bar'}
              data={{
                labels: Object.keys(people),
                series: [ Object.keys(people).map( key => people[key] ) ],
                distributeSeries: true
              }}
              options={{
                high: Math.max(...Object.keys(people).map( key => people[key] )),
                low: Math.min(...Object.keys(people).map( key => people[key] )),
              }}
            />
          </>
          : <p style={{textAlign: 'center'}}>no population data</p>
      : null
    }</div>

    <div>{
      jobs ?
        Object.keys(jobs).length ?
          <>
            <h2 style={{textAlign: 'center'}}>Jobs</h2>
            <ChartistGraph
              type={'Bar'}
              data={{
                labels: Object.keys(jobs),
                series: [ Object.keys(jobs).map( key => jobs[key] ) ],
                distributeSeries: true
              }}
              options={{
                high: Math.max(...Object.keys(jobs).map( key => jobs[key] )),
                low: Math.min(...Object.keys(jobs).map( key => jobs[key] )),
              }}
            />
          </>
          : <p style={{textAlign: 'center'}}>no jobs data</p>
      : null
    }</div>

  </div>
}

export default Widget;
