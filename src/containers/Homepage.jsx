import React, { Component } from "react";

import Dropdown from "components/Dropdown/Dropdown";
import Description from "components/Description/Description";

import TitleSectionDynamicComponent from "components/DynamicComponents/TitleSection";
import Table from "components/DynamicComponents/Table";
import { descriptionTable } from "components/DynamicComponents/Table";
import { descriptionTitleSection } from "components/DynamicComponents/TitleSection";

import "./Homepage.scss";

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      showCode: false,
      showComponent: "none"
    };
  }

  onChangeComponent = newValue => {
    this.setState({ showComponent: newValue });
  };

  parseIconName = iconName => {
    if (!iconName) {
      return "none";
    }
    const listSubStrings = iconName.split("-");
    let iconNameParsed = listSubStrings[0];
    listSubStrings.forEach((substring, pos) => {
      if (pos > 0) {
        iconNameParsed +=
          substring.charAt(0).toUpperCase() + substring.slice(1);
      }
    });
    return iconNameParsed;
  };

  updateComponent = newComponent => {
    const { dynamicComponent } = this.state;
    if (dynamicComponent !== newComponent) {
      this.setState({ dynamicComponent: newComponent });
    }
  };

  render() {
    const { showComponent } = this.state;
    let description = null;
    let descriptionId = ""
    switch (showComponent) {
      case "TitleSection":
        description = descriptionTitleSection;
        descriptionId="titleSection-description";
        break;
      default:
        description = descriptionTable;
        descriptionId="table-description";
        break;
    }
    return (
      <div style={{ height: "100%" }}>
        <div className="dynamic-subsection standardText">
          <div>
            Choose a section to know how it works and how it has been done.{" "}
          </div>
          <Dropdown
            defaultOption="Choose Section to Custom"
            onChange={this.onChangeComponent}
            options={[
              { text: "TitleSection", value: "TitleSection" },
              { text: "Table", value: "Table" }
            ]}
            id="chooseSectionDropdown"
          />
        </div>
        {showComponent !== "none" ? (
          <>
            <div className="dynamic-subsection">
              <Description list={description} id={descriptionId} />
            </div>
            <div className="dynamic-subsection">
              <div className="standardText titleDescription">
                ¿How Build the section?{" "}
              </div>
              <div className="standardText">
                Create same component with your own values if you want.{" "}
              </div>
              {showComponent === "TitleSection" ? (
                <TitleSectionDynamicComponent />
              ) : null}
              {showComponent === "Table" ? <Table /> : null}
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

export default Homepage;
