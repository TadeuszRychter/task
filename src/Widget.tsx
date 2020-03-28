import React from 'react';
import {TwoLetterCode} from "./data/s";

interface WidgetProps {
  twoLetterCode: TwoLetterCode;
  [key: string]: any; // TODO
}

function Widget(props: WidgetProps) {
  const {twoLetterCode, people} = props;

  return <div style={{border: '1px solid green'}}>
    <p>{twoLetterCode}</p>
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
