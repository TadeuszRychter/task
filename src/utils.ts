type ItemSelector = (item: string, stateArray: string[], setStateFunction: any) => void;  // TODO /*SetStateAction<string[]>*/
export const itemSelector: ItemSelector = (item, stateArray, setStateFunction) => {
  if (stateArray.includes(item)) {
    setStateFunction(stateArray.filter(state => state !== item));
  } else {
    setStateFunction([...stateArray, item])
  }
}

export function hashCode(str: string) { // from https://stackoverflow.com/a/49562686
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 3) - hash);
  }
  return hash;
}

export function pickColor(str: string) { // from https://stackoverflow.com/a/49562686
  return `hsl(${hashCode(str) % 360}, 80%, 40%)`;
}