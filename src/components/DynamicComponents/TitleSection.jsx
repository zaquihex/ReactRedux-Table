import React, { Component } from "react";

import Dropdown from "components/Dropdown/Dropdown";
import Input from "components/Input/Input";
import TitleSection from "components/TitleSection/TitleSection";
import Code from "components/Code/Code";

export const descriptionTitleSection = [
  { title: "Scss: ", description: "Styles of the components." },
  {
    title: "React-fontawesome: ",
    description: "To get the icon of the title."
  },
  {
    title: "Hooks: ",
    description:
      "Dropdown to custom a section and create it with your own values."
  }
];

const TitleSectionDynamicForm = props => (
  <div className="dynamic-parent" id="titleSection-form">
    <div className="titleSubsection standardText">Title</div>
    <div className="dynamic-subsection dynamic-parent">
      <Dropdown
        icons={true}
        defaultOption="icon"
        onChange={props.onChangeIcon}
        id="titleSection-dropdownIcon"
      />
      <Input
        className="middleElement"
        onChange={props.onChangeInput}
        value={props.value}
        width={props.width}
        placeholder="Title Section Name"
        id="titleSection-input"
      />
      <Dropdown
        widths={true}
        defaultOption="width"
        onChange={props.onChangeWidth}
        id="titleSection-dropdownWidth"
      />
    </div>
  </div>
);

const TitleSectionDynamicComponent = props => {
  return props.icon === "none" && props.value.length === 0 ? null : (
    <TitleSection
      icon={props.icon}
      title={props.value}
      customStyle={{ width: props.width }}
    />
  );
};

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "none",
      width: "100%",
      valueTitle: ""
    };
  }

  parseIconToCode = iconName => {
    if (iconName) {
      let iconParsed = "fa";
      let copyIconName = iconName.split("-");
      copyIconName.forEach(elem => {
        iconParsed += elem.charAt(0).toUpperCase() + elem.slice(1);
      });
      return iconParsed;
    }
    return null;
  };

  onChangeDropdownIcon = newIcon => {
    this.setState({ icon: newIcon });
  };

  onChangeDropdownWidth = newValue => {
    this.setState({ width: newValue });
  };

  onChangeInputTitle = event => {
    this.setState({ valueTitle: event.target.value });
  };
  render() {
    const { icon, width, valueTitle } = this.state;
    const iconNameParsed = this.parseIconToCode(icon.iconName);
    return (
      <>
        <div className="dynamic-parent">
          <TitleSectionDynamicForm
            onChangeIcon={this.onChangeDropdownIcon}
            onChangeInput={this.onChangeInputTitle}
            value={valueTitle}
            onChangeWidth={this.onChangeDropdownWidth}
          />
        </div>
        <TitleSectionDynamicComponent
          icon={icon}
          width={width}
          value={valueTitle}
        />
        {valueTitle.length > 0 || icon != "none"  ? (
          <Code
            id="titleSection-code"
            namePureComponent="TitleSection"
            imports={[
              {
                name: "TitleSection",
                path: "components/TitleSection/TitleSection"
              },
              iconNameParsed
                ? {
                    name: `{ ${iconNameParsed} }`,
                    path: "@fortawesome/free-solid-svg-icons"
                  }
                : null
            ]}
            params={[
              { name: "icon", value: `{ ${iconNameParsed} }` },
              { name: "title", value: `'${valueTitle}'` }
            ]}
            width={`'${width}'`}
          />
        ) : null}
      </>
    );
  }
}

export default Title;
