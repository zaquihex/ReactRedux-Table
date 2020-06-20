import React from "react";

import Label from 'components/Label/Label';
import './Field.scss';

const Field = props => (
  <div className="fieldCustom">
    <Label label={props.label}/>
    <div className="fieldCustomValue standardText">{props.value}</div>
  </div>
);

export default Field;
