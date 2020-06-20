import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./TitleSection.scss";

const TitleSection = props => (
  <div
    className="TitleSection standardText"
    style={props.customStyle}
    id="titleSection-component"
  >
    <FontAwesomeIcon icon={props.icon} />
    <div id="titleSection-title">{props.title}</div>
  </div>
);

export default TitleSection;
