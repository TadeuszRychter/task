import {ItemRenderer, MultiSelect as MultiSelectComponent} from "@blueprintjs/select";
import {MenuItem} from "@blueprintjs/core";
import React from "react";
import {APP_DATA_SEPARATOR} from "./App";

export const MultiSelect = MultiSelectComponent.ofType<string>();

export const itemRendererWithState = (state: string[]): ItemRenderer<string> => (item, {modifiers, handleClick, query}) => {
  const [twoLetterCode, fullStateName] = item.split(APP_DATA_SEPARATOR);

  const Component = <MenuItem
    active={modifiers.active}
    icon={state.includes(twoLetterCode) ? "tick" : "blank"}
    key={twoLetterCode}
    label={twoLetterCode}
    onClick={handleClick}
    shouldDismissPopover={false}
    text={highlightText(fullStateName, query)}
  />

  if (!query || !query.length) {
    return Component
  }
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return Component;
};

function highlightText(text: string, query: string) {
  let lastIndex = 0;
  const words = query
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(escapeRegExpChars);
  if (words.length === 0) {
    return [text];
  }
  const regexp = new RegExp(words.join("|"), "gi");
  const tokens: React.ReactNode[] = [];
  while (true) {
    const match = regexp.exec(text);
    if (!match) {
      break;
    }
    const length = match[0].length;
    const before = text.slice(lastIndex, regexp.lastIndex - length);
    if (before.length > 0) {
      tokens.push(before);
    }
    lastIndex = regexp.lastIndex;
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
    tokens.push(rest);
  }
  return tokens;
}

function escapeRegExpChars(text: string) {
  // eslint-disable-next-line
  return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

export const tagRenderer = (item: string) => item.split(APP_DATA_SEPARATOR)[0];