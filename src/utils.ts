import {DataConfig} from "./App";

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

export const createDataProps = (dataConfig: DataConfig[], selectedTwoLetterCode: string, dataGroups: string[], dataItems: string[]) => Object.fromEntries(
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