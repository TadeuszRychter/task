import React, {useState} from 'react';
import './App.css';
import {FullStateName, sts, TwoLetterCode} from "./data/s";
import {jbs} from "./data/j";
import {ppltn} from "./data/p";
import {NumericInput, Switch} from "@blueprintjs/core";
import Widget from "./Widget";
import DataGroupSelector from "./DataGroupSelector";
import DataGroupItems, {OlListType} from "./DataGroupItems";
import {createDataProps, itemSelector} from "./utils";
import {commonCss} from "./common-styles";
import {itemRendererWithState, MultiSelect, tagRenderer} from "./CodesMultiselectItems";
import {css} from "./App.styles";

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

  return (
    <>
      <div className={css.controlsWrapper}>
        <div className={css.controlsWrapper}>Select states:
          <MultiSelect
            className={commonCss.itemLeftMargin}
            items={stsArray}
            itemRenderer={itemRendererWithState(selectedStates)}
            onItemSelect={(item) => itemSelector(item.twoLetterCode, selectedStates, setSelectedStates)}
            tagRenderer={tagRenderer}/>
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
