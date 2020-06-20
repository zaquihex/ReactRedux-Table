import React from "react";
import "./BtnPanel.scss";
const BtnPanel = props => (
  <button
    className={"BtnPanel standardText "+props.classnames}
    onClick={() => {
      if (props.clickMethod) {
        props.clickMethod(props.component);
      }
    }}
  >
    {props.text}
  </button>
);

export default BtnPanel;
