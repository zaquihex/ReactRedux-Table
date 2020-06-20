import React from "react";

import TitleSection from "components/TitleSection/TitleSection";
import "./FullSection.scss";
const FullSection = props => (
  <>
    <TitleSection icon={props.iconTitle} title={props.title} />
    <div className="Fullsection-section">{props.sectionComponent}</div>
  </>
);

export default FullSection;
