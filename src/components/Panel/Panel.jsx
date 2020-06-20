import React from "react";

import { faStream } from "@fortawesome/free-solid-svg-icons";

import BtnPanel from "components/Button/BtnPanel";
import TitleSection from "components/TitleSection/TitleSection";
import "./Panel.scss";

const Panel = props => (
  <div className="panel">
    <TitleSection icon={faStream} title="Panel" />
    <div className="sectionInfo">
      {props.list.map((section, pos) => (
        <BtnPanel classnames={props.page === section.value ? "BtnPanelUnderline" : null} key={"Panel-section-".concat(pos+1)} text={section.label} component={section.value} clickMethod={props.changeSection}/>
      ))}
    </div>
  </div>
);

export default Panel;
