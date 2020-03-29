import React, {useState} from 'react';
import './App.css';
import {FullStateName, sts, TwoLetterCode} from "./data/s";
import {jbs} from "./data/j";
import {ppltn} from "./data/p";
import {ItemRenderer, MultiSelect as MultiSelectComponent} from "@blueprintjs/select";
import {MenuItem, NumericInput, Switch} from "@blueprintjs/core";
import Widget from "./Widget";
import DataGroupSelector from "./DataGroupSelector";
import DataGroupItems, {OlListType} from "./DataGroupItems";
import {itemSelector} from "./utils";
import {style} from "typestyle";

interface StsArrayItem {
  twoLetterCode: TwoLetterCode;
  fullStateName: FullStateName;
}

const MultiSelect = MultiSelectComponent.ofType<StsArrayItem>();

const stsArray = Object.entries(sts).map(([twoLetterCode, fullStateName]) => ({twoLetterCode, fullStateName}));// TODO keeping both for usage in fuzzy search in multiselect

const itemRendererWithState = (state: TwoLetterCode[]):ItemRenderer<StsArrayItem> => (stsArrayItem, {modifiers, handleClick}) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      icon={state.includes(stsArrayItem.twoLetterCode) ? "tick" : "blank"}
      key={stsArrayItem.twoLetterCode}
      label={stsArrayItem.twoLetterCode}
      onClick={handleClick}
      text={stsArrayItem.fullStateName}
      shouldDismissPopover={false}
    />
  );
};

const tagRenderer = (stsArrayItem: StsArrayItem) => stsArrayItem.twoLetterCode;

const industries = Object.keys(jbs[0]).filter(key => key !== 'name');

const demographicSegments = Object.keys(ppltn[0]).filter(key => key !== 'State');

const createDataProps = (selectedTwoLetterCode: string, dataGroups: string[], dataItems: string[]) => Object.fromEntries(
  dataConfig
    .filter(config => (dataGroups.includes(config.name)))
    .map(config => dataItems.reduce((acc, item) => item.startsWith(`${config.name}_`) ? acc + 1 : acc, 0) ? [ // see if there are relevant group items selected, if not then do not create a prop (filtered out after this map)
        config.name,
        Object.fromEntries(dataItems
          .filter(item => item.startsWith(`${config.name}_`))
          .map(item => {
              const key = item.replace(`${config.name}_`, "");
              const value = (config.data as any[]).find(item => item[config.stateAlias] === selectedTwoLetterCode);
              return value ? [
                  key,
                  value[key]
                ]
                : null
            }
          )
          .filter(item => item) as [] // TODO this assertion should not be necessary
        )
      ] : null
    ).filter(item => item) as [] // TODO this assertion should not be necessary
)

const dataConfig = [
  {
    name: 'jobs',
    listType: 'A',
    itemsList: industries,
    data: jbs,
    stateAlias: 'name'
  },
  {
    name: 'people',
    listType: 'I',
    itemsList: demographicSegments,
    data: ppltn,
    stateAlias: 'State'
  }
];

const columns = (numberOfColumns: number) => ({ gridTemplateColumns: Array(numberOfColumns).fill('1fr').join(' ') });

const widgetsWrapper = (numberOfColumns: number) => style(
  columns(numberOfColumns),{
  display: 'grid',
  justifyItems: 'stretch',
  gridTemplateRows: 'auto',
  gridGap: '15px',
});

function App() {
  const [selectedStates, setSelectedStates] = useState<TwoLetterCode[]>([]);
  const [selectedDataGroups, setSelectedDataGroups] = useState<string[]>([]);
  const [selectedDataItems, setSelectedDataItems] = useState<string[]>([]); // only one level of nesting...
  const [numberOfColumns, setNumberOfColumns] = useState(2);

  const clearSelectedDataItems = (groupName: string) => {
    setSelectedDataItems(selectedDataItems.filter(dataItem => !dataItem.startsWith(`${groupName}_`)));
  }
  const selectAllDataItems = (groupName: string) => {
    setSelectedDataItems(
      dataConfig.filter(config => config.name === groupName)[0].itemsList.map(key => `${groupName}_${key}`)
    );
  }

  return (
    <>
      <div>Select states:
        <MultiSelect
          items={stsArray}
          itemRenderer={itemRendererWithState(selectedStates)}
          onItemSelect={(item) => itemSelector(item.twoLetterCode, selectedStates, setSelectedStates)}
          tagRenderer={tagRenderer}/>
      </div>

      <div>
        Select data:
        <ul>
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
                  setSelectedDataItems={setSelectedDataItems}/>
              </DataGroupSelector>
            </li>
          )}
        </ul>
      </div>

      <div>
        Select number of widgets per row:
        <NumericInput
          onValueChange={(value) => setNumberOfColumns(value)}
          large={true}
          min={1}
          max={selectedStates.length > 1 ? selectedStates.length : 2}
          stepSize={1}
          value={numberOfColumns}
        />
        <Switch checked={numberOfColumns === selectedStates.length} label="All" disabled={numberOfColumns === selectedStates.length} onChange={() => setNumberOfColumns(selectedStates.length)} />
      </div>

      <div className={widgetsWrapper(numberOfColumns)}>
      {selectedStates.length ?
        selectedStates.map(state =>
          <Widget
            key={state}
            fullStateName={sts[state]}
            {...createDataProps(state, selectedDataGroups, selectedDataItems)}
          />
        )
        : <>no states selected</>
      }
      </div>

      {/*<pre>demographicSegments - {JSON.stringify(demographicSegments, null, 2)}</pre>*/}
      {/*<pre>industries - {JSON.stringify(industries, null, 2)}</pre>*/}
      {/*<pre>selected state - {JSON.stringify(selectedStates, null, 2)}</pre>*/}
      {/*<pre>selected data groups - {JSON.stringify(selectedDataGroups, null, 2)}</pre>*/}
      {/*<pre>selected data items - {JSON.stringify(selectedDataItems, null, 2)}</pre>*/}
      {/*<pre>stsArray - {JSON.stringify(stsArray[0], null, 2)}</pre>*/}
      {/*<pre>sts - {JSON.stringify(sts[Object.keys(sts)[0]], null, 2)}</pre>*/}
      {/*<pre>jbs - {JSON.stringify(jbs, null, 2)}</pre>*/}
      {/*<pre>ppltn - {JSON.stringify(ppltn, null, 2)}</pre>*/}
    </>
  );
}

export default App;
