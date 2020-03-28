import React from 'react';
import {Checkbox} from "@blueprintjs/core";
import {itemSelector} from "./utils";

interface DataGroupItemsProps {
  listType: '1' | 'a' | 'A' | 'i' | 'I';
  itemsList: string[];
  dataGroupName: string;
  selectedDataItems: string[];
  setSelectedDataItems: (items:  string[]) => void
}

function DataGroupItems(props: DataGroupItemsProps) {
  const {listType, itemsList, dataGroupName, selectedDataItems, setSelectedDataItems} = props;

  return <ol type={listType}>
    {itemsList.map(item =>
      <li key={`${dataGroupName}_${item}`}>
        {item}
        <Checkbox
          large={true}
          inline={true}
          checked={selectedDataItems.includes(`${dataGroupName}_${item}`)}
          onChange={() => itemSelector(`${dataGroupName}_${item}`, selectedDataItems, setSelectedDataItems)}
        />
      </li>)}
  </ol>
}

export default DataGroupItems;
