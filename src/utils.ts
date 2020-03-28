type ItemSelector = (item: string, stateArray: string[], setStateFunction: any) => void;  // TODO /*SetStateAction<string[]>*/
export const itemSelector: ItemSelector = (item, stateArray, setStateFunction) => {
  if (stateArray.includes(item)) {
    setStateFunction(stateArray.filter(state => state !== item));
  } else {
    setStateFunction([...stateArray, item])
  }
}