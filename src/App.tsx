import React, {useState} from 'react';
import './App.css';
import {FullStateName, sts, TwoLetterCode} from "./data/s";
import {jbs} from "./data/j";
import {ppltn} from "./data/p";
import {ItemRenderer, MultiSelect as MultiSelectComponent} from "@blueprintjs/select";
import {MenuItem} from "@blueprintjs/core";

interface StsArrayItem {
  twoLetterCode: TwoLetterCode;
  fullStateName: FullStateName;
}

const MultiSelect = MultiSelectComponent.ofType<StsArrayItem>();

const stsArray = Object.entries(sts).map(([twoLetterCode, fullStateName]) => ({twoLetterCode, fullStateName}));// TODO keeping both for usage in fuzzy search in multiselect

const tagRenderer = (stsArrayItem: StsArrayItem) => stsArrayItem.twoLetterCode;

function App() {

  const [selectedStates, setSelectedStates] = useState<TwoLetterCode[]>([]);

  const onItemSelect = (stsArrayItem: StsArrayItem) => {
    if (selectedStates.includes(stsArrayItem.twoLetterCode)) {
      setSelectedStates(selectedStates.filter( state => state !== stsArrayItem.twoLetterCode));
    } else {
      setSelectedStates([...selectedStates, stsArrayItem.twoLetterCode])
    }
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
        <MultiSelect items={stsArray} itemRenderer={itemRenderer} onItemSelect={onItemSelect} tagRenderer={tagRenderer}/>
        <p>selected state - {JSON.stringify(selectedStates, null, 2)}</p>
        <p>{Object.values(sts)[4]}</p>
        <p>{Object.keys(sts)[1]}</p>
        <p>{jbs[1].agriculture}</p>
        <pre>stsArray - {JSON.stringify(stsArray, null, 2)}</pre>
        <pre>sts - {JSON.stringify(sts[Object.keys(sts)[0]], null, 2)}</pre>
        <pre>jbs - {JSON.stringify(jbs[0], null, 2)}</pre>
        <pre>ppltn - {JSON.stringify(ppltn[0], null, 2)}</pre>
      </header>
    </div>
  );
}

export default App;
