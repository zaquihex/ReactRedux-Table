import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import "./BtnStandard.scss";

const BtnStandard = props => (
  <div className="centerItem">
    <button
      id={props.id}
      style={{ margin: props.margin }}
      className={
        props.activeBtn
          ? "standardText BtnPanel BtnStandard BtnActive"
          : "standardText BtnPanel BtnStandard"
      }
      onClick={() => {
        if (props.url) {
          window.open(props.url, "_blank");
        }
        if (props.onClick) {
          props.onClick();
        }
      }}
    >
      {props.text.concat("  ")}
      <FontAwesomeIcon icon={props.icon ? props.icon : faExternalLinkAlt} />
    </button>
  </div>
);

export default BtnStandard;
