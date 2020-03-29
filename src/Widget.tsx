import React from 'react';
import {FullStateName} from "./data/s";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {pickColor} from "./utils";

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
          <>
            jobs - <pre>{JSON.stringify(jobs, null, 2)}</pre>
            <ResponsiveContainer width="100%" height={200} debounce={1}>
              <BarChart
                data={Object.keys(jobs).map( key => ({ key, [key]: jobs[key]  }) ) }
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="key" />
                <YAxis />
                <Tooltip />
                <Legend />
                {
                  Object.keys(jobs).map( key => <Bar key={key} dataKey={key} fill={pickColor(key)} /> )
                }

              </BarChart>
            </ResponsiveContainer>
          </>
          : <>no jobs data</>
      : null
    }</div>
  </div>
}

export default Widget;
