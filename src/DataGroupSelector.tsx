import React, {PropsWithChildren} from 'react';
import {Checkbox} from "@blueprintjs/core";
import {itemSelector} from "./utils";

interface DataGroupSelectorProps {
  dataGroupName: string;
  selectedDataGroups: string[];
  setSelectedDataGroups: (items: string[]) => void;
  clearSelectedDataItems: (dataGroupName: string) => void;
}

function DataGroupSelector(props: PropsWithChildren<DataGroupSelectorProps>) {
  const {children, dataGroupName, selectedDataGroups, setSelectedDataGroups, clearSelectedDataItems} = props;

  return <>
    {dataGroupName}
    <Checkbox
      checked={selectedDataGroups.includes(dataGroupName)}
      large={true}
      inline={true}
      onChange={() => {
        itemSelector(dataGroupName, selectedDataGroups, setSelectedDataGroups);
        if (selectedDataGroups.includes(dataGroupName)) {
          clearSelectedDataItems(dataGroupName);
        }
      }}
    />
    {selectedDataGroups.includes(dataGroupName) ?
      children
      : null }
  </>
}

export default DataGroupSelector;
