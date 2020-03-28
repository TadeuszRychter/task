import React from 'react';
import {TwoLetterCode} from "./data/s";

interface WidgetProps {
  twoLetterCode: TwoLetterCode;
}

function Widget(props: WidgetProps) {
  const {twoLetterCode} = props;

  return <p style={{border: '1px solid green'}}>{twoLetterCode}</p>
}

export default Widget;
