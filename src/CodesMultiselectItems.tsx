import {TwoLetterCode} from "./data/s";
import {ItemRenderer, MultiSelect as MultiSelectComponent} from "@blueprintjs/select";
import {MenuItem} from "@blueprintjs/core";
import React from "react";
import {StsArrayItem} from "./App";

export const MultiSelect = MultiSelectComponent.ofType<StsArrayItem>();

export const itemRendererWithState = (state: TwoLetterCode[]): ItemRenderer<StsArrayItem> => (stsArrayItem, {modifiers, handleClick}) => {
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

export const tagRenderer = (stsArrayItem: StsArrayItem) => stsArrayItem.twoLetterCode;