import React, {useState} from 'react';
import './App.css';
import {FullStateName, sts, TwoLetterCode} from "./data/s";
import {jbs} from "./data/j";
import {ppltn} from "./data/p";
import {Button, NumericInput, Switch} from "@blueprintjs/core";
import Widget from "./Widget";
import DataGroupSelector from "./DataGroupSelector";
import DataGroupItems, {OlListType} from "./DataGroupItems";
import {createDataProps, itemSelector} from "./utils";
import {commonCss} from "./common-styles";
import {itemRendererWithState, MultiSelect, tagRenderer} from "./CodesMultiselectItems";
import {css} from "./App.styles";
import { filter } from 'fuzzaldrin-plus';

export interface DataConfig {
  name: string;
  listType: OlListType;
  itemsList: string[];
  data: any;
  stateAlias: string;
}
export interface StsArrayItem {
  twoLetterCode: TwoLetterCode;
  fullStateName: FullStateName;
}

export const APP_DATA_SEPARATOR = '===';

const stsArray = Object.entries(sts).map(([twoLetterCode, fullStateName]) => ({twoLetterCode, fullStateName}));// TODO keeping both for usage in fuzzy search in multiselect

const industries = Object.keys(jbs[0]).filter(key => key !== 'name');
const demographicSegments = Object.keys(ppltn[0]).filter(key => key !== 'State');

const dataConfig = [
  {
    name: 'jobs',
    listType: 'A' as OlListType,
    itemsList: industries,
    data: jbs,
    stateAlias: 'name'
  },
  {
    name: 'people',
    listType: 'I' as OlListType,
    itemsList: demographicSegments,
    data: ppltn,
    stateAlias: 'State'
  }
];

function App() {
  const [selectedStates, setSelectedStates] = useState<TwoLetterCode[]>([]);
  const [selectedDataGroups, setSelectedDataGroups] = useState<string[]>([]);
  const [selectedDataItems, setSelectedDataItems] = useState<string[]>([]); // only one level of nesting...
  const [numberOfColumns, setNumberOfColumns] = useState(2);

  const selectAllStates = () => {
    setSelectedStates(Object.keys(sts));
  }
  const clearStatesSelection = () => {
    setSelectedStates([]);
  }

  const clearSelectedDataItems = (groupName: string) => {
    setSelectedDataItems(selectedDataItems.filter(dataItem => !dataItem.startsWith(`${groupName}_`)));
  }
  const selectAllDataItems = (groupName: string) => {
    setSelectedDataItems([
        ...selectedDataItems,
        ...dataConfig.filter(config => config.name === groupName)[0].itemsList.map(key => `${groupName}_${key}`)
      ]
    );
  }

  const useFuzz = (query: string, items: string[]): string[] => {
    if (!query) {
      return items;
    }
    return filter(items, query);
  }

  return (
    <>
      <div className={css.controlsWrapper}>
        <div className={css.controlsWrapper} style={{flexDirection: 'column'}}>Select states:
            <MultiSelect
              className={commonCss.itemLeftMargin}
              items={stsArray.map( item => `${item.twoLetterCode}${APP_DATA_SEPARATOR}${item.fullStateName}`)}
              itemRenderer={itemRendererWithState(selectedStates)}
              onItemSelect={(item) => itemSelector(item.split(APP_DATA_SEPARATOR)[0], selectedStates, setSelectedStates)}
              tagRenderer={tagRenderer}
              itemListPredicate={useFuzz}
              resetOnSelect={true}
              noResults={'No results found'}
              fill={true}
            />
            <div className={css.controlsWrapper}>
              <Button
                className={commonCss.itemLeftMargin}
                disabled={selectedStates.length === Object.keys(sts).length}
                text={'Select all'}
                onClick={selectAllStates}
              />
              <Button
                className={commonCss.itemLeftMargin}
                disabled={selectedStates.length === 0}
                text={'Clear selection'}
                onClick={clearStatesSelection}
              />
            </div>
        </div>

        <div className={css.controlsWrapper}>
          Select data:
          <ul className={css.controlsWrapper}>
            {dataConfig.map(dataGroup =>
              <li key={dataGroup.name}>
                <DataGroupSelector
                  dataGroupName={dataGroup.name}
                  selectedDataGroups={selectedDataGroups}
                  setSelectedDataGroups={setSelectedDataGroups}
                  clearSelectedDataItems={clearSelectedDataItems}
                  selectAllDataItems={selectAllDataItems}
                >
                  <DataGroupItems
                    key={dataGroup.name}
                    dataGroupName={dataGroup.name}
                    listType={dataGroup.listType as OlListType}
                    itemsList={dataGroup.itemsList}
                    selectedDataItems={selectedDataItems}
                    setSelectedDataItems={setSelectedDataItems}
                  />
                </DataGroupSelector>
              </li>
            )}
          </ul>
        </div>

        <div className={css.controlsWrapper}>
          Select number of widgets per row:
          <div style={{display: 'block' /* NumericInput needs such parent */}}>
          <NumericInput
            className={commonCss.itemLeftMargin}
            onValueChange={(value) => setNumberOfColumns(value)}
            large={true}
            min={1}
            max={selectedStates.length > 1 ? selectedStates.length : 2}
            stepSize={1}
            value={numberOfColumns}
          />
          </div>
          <Switch
            className={commonCss.itemLeftMargin}
            checked={numberOfColumns === selectedStates.length}
            label="All"
            disabled={numberOfColumns === selectedStates.length}
            onChange={() => setNumberOfColumns(selectedStates.length)}
          />
        </div>
      </div>

      <div className={css.widgetsWrapper(numberOfColumns)}>
      {selectedStates.length ?
        selectedStates.map(state =>
          <Widget
            key={state}
            fullStateName={sts[state]}
            remove={() => setSelectedStates(selectedStates.filter(s => s !== state))}
            {...createDataProps(dataConfig, state, selectedDataGroups, selectedDataItems)}
          />
        )
        : <p className={`${commonCss.centerText} ${commonCss.noData}`}>no states selected</p>
      }
      </div>
    </>
  );
}

export default App;
