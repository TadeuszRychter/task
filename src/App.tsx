import React, {useState} from 'react';
import './App.css';
import {FullStateName, sts, TwoLetterCode} from "./data/s";
import {jbs} from "./data/j";
import {ppltn} from "./data/p";
import {ItemRenderer, MultiSelect as MultiSelectComponent} from "@blueprintjs/select";
import {MenuItem} from "@blueprintjs/core";
import Widget from "./Widget";
import DataGroupSelector from "./DataGroupSelector";
import DataGroupItems, {OlListType} from "./DataGroupItems";
import {itemSelector} from "./utils";

interface StsArrayItem {
  twoLetterCode: TwoLetterCode;
  fullStateName: FullStateName;
}

const MultiSelect = MultiSelectComponent.ofType<StsArrayItem>();

const stsArray = Object.entries(sts).map(([twoLetterCode, fullStateName]) => ({twoLetterCode, fullStateName}));// TODO keeping both for usage in fuzzy search in multiselect

const tagRenderer = (stsArrayItem: StsArrayItem) => stsArrayItem.twoLetterCode;

const industries = Object.keys(jbs[0]).filter(key => key !== 'name');

const demographicSegments = Object.keys(ppltn[0]).filter(key => key !== 'State');

const appConfig = [
  {
    name: 'industry',
    listType: 'A',
    itemsList: industries
  },
  {
    name: 'demography',
    listType: 'I',
    itemsList: demographicSegments
  }
];

function App() {

  const [selectedStates, setSelectedStates] = useState<TwoLetterCode[]>([]);
  const [selectedDataGroups, setSelectedDataGroups] = useState<string[]>([]);
  const [selectedDataItems, setSelectedDataItems] = useState<string[]>([]); // only one level of nesting...

  const clearSelectedDataItems = (groupName: string) => {
    setSelectedDataItems(selectedDataItems.filter(dataItem => !dataItem.startsWith(`${groupName}_`)));
  }

  const itemRenderer: ItemRenderer<StsArrayItem> = (stsArrayItem, {modifiers, handleClick}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        icon={selectedStates.includes(stsArrayItem.twoLetterCode) ? "tick" : "blank"}
        key={stsArrayItem.twoLetterCode}
        label={stsArrayItem.twoLetterCode}
        onClick={handleClick}
        text={stsArrayItem.fullStateName}
        shouldDismissPopover={false}
      />
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>Select states: <MultiSelect items={stsArray} itemRenderer={itemRenderer} onItemSelect={(item) => itemSelector(item.twoLetterCode, selectedStates, setSelectedStates)} tagRenderer={tagRenderer}/></div>

        <div>
          Select data:
          <ul>
            {appConfig.map(dataGroup => <li key={dataGroup.name}>
                <DataGroupSelector
                  dataGroupName={dataGroup.name}
                  selectedDataGroups={selectedDataGroups}
                  setSelectedDataGroups={setSelectedDataGroups}
                  clearSelectedDataItems={clearSelectedDataItems}>
                  <DataGroupItems
                    key={dataGroup.name}
                    dataGroupName={dataGroup.name}
                    listType={dataGroup.listType as OlListType}
                    itemsList={dataGroup.itemsList}
                    selectedDataItems={selectedDataItems}
                    setSelectedDataItems={setSelectedDataItems} />
                </DataGroupSelector>
            </li>
            )}
          </ul>
        </div>
        {selectedStates.map(state => <Widget
          twoLetterCode={state}
          { ...( selectedDataGroups.includes('demography') && {
            people: selectedDataItems
                      .filter(item => item.startsWith('demography_'))
                      .map(item => item.replace("demography_", ""))
                      .reduce((acc, key) => ({
                        ...acc,
                        ...( ppltn.find(item => item.State === state) && { [key]: (ppltn.find(item => item.State === state) as any)[key] } )
                      }), {})
          } ) }
        />)}

        <p>demographicSegments - {JSON.stringify(demographicSegments, null, 2)}</p>
        <p>industries - {JSON.stringify(industries, null, 2)}</p>
        <p>selected state - {JSON.stringify(selectedStates, null, 2)}</p>
        <p>selected data groups - {JSON.stringify(selectedDataGroups, null, 2)}</p>
        <p>selected data items - {JSON.stringify(selectedDataItems, null, 2)}</p>
        <pre>stsArray - {JSON.stringify(stsArray[0], null, 2)}</pre>
        <pre>sts - {JSON.stringify(sts[Object.keys(sts)[0]], null, 2)}</pre>
        <pre>jbs - {JSON.stringify(jbs[0], null, 2)}</pre>
        <pre>ppltn - {JSON.stringify(ppltn[0], null, 2)}</pre>
      </header>
    </div>
  );
}

export default App;
