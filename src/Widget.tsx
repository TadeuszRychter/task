import React from 'react';
import {FullStateName} from "./data/s";
import {pickColor} from "./utils"; // TODO figure out how to sue it with Chartist
import ChartistGraph from "react-chartist";
import {style} from "typestyle";
import {commonCss} from "./common-styles";
import {Button} from "@blueprintjs/core";

interface WidgetProps {
  fullStateName: FullStateName;
  remove: () => void;
  [key: string]: any; // TODO
}

const css = {
  dataWrapper: style({
    display: 'flex',
    justifyContent: 'flex-start',
    height: '100%',
    flexWrap: 'wrap',
    flexDirection: 'column',
    border: '1px solid #ccc',
    position: 'relative'
  })
}

function Widget(props: WidgetProps) {
  const {fullStateName, people, jobs, remove} = props;

  return <div className={css.dataWrapper}>
    <Button
      className={`${commonCss.itemLeftMargin} ${commonCss.topRight}`}
      icon={'cross'}
      onClick={remove}
      minimal={true}
    />
    <h1 className={commonCss.centerText}>{fullStateName}</h1>

    <div>{
      people ?
        Object.keys(people).length ?
          <>
            <h2 className={commonCss.centerText}>People</h2>
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
          : <p className={`${commonCss.centerText} ${commonCss.noData}`}>no population data</p>
      : null
    }</div>

    <div>{
      jobs ?
        Object.keys(jobs).length ?
          <>
            <h2 className={commonCss.centerText}>Jobs</h2>
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
          : <p className={`${commonCss.centerText} ${commonCss.noData}`}>no jobs data</p>
      : null
    }</div>

  </div>
}

export default Widget;
