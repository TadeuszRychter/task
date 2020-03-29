import {style} from "typestyle";
import {commonCss} from "./common-styles";

const columns = (numberOfColumns: number) => ({gridTemplateColumns: Array(numberOfColumns).fill('1fr').join(' ')});

export const css = {
  widgetsWrapper: (numberOfColumns: number) => style(
    columns(numberOfColumns), {
      display: 'grid',
      justifyItems: 'stretch',
      gridTemplateRows: 'auto',
      gridGap: '15px',
    }),
  controlsWrapper: `${style({
    display: 'flex',
    flexWrap: 'wrap',
  })} ${commonCss.padding}`
}