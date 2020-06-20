import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";

import "./Dropdown.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import all icons
import {
  faTable,
  faStream,
  faInfoCircle,
  faAlignJustify,
  faExternalLinkAlt,
  faAirFreshener,
  faBalanceScale,
  faBullseye,
  faCalendar,
  faCircle,
  faClone,
  faClipboard,
  faCrosshairs,
  faHamburger,
  faHome,
  faCubes
} from "@fortawesome/free-solid-svg-icons";

const getIcons = () => {
  const icons = [
    { icon: faTable, text: "Table" },
    { icon: faStream, text: "Stream" },
    { icon: faInfoCircle, text: "Info" },
    { icon: faAlignJustify, text: "Align" },
    { icon: faExternalLinkAlt, text: "External Link" },
    { icon: faAirFreshener, text: "Air freshener" },
    { icon: faBullseye, text: "Bulls eye" },
    { icon: faBalanceScale, text: "Balance" },
    { icon: faCalendar, text: "Calendar" },
    { icon: faCircle, text: "Circle" },
    { icon: faClone, text: "Clone" },
    { icon: faClipboard, text: "Clipboard" },
    { icon: faCrosshairs, text: "Clipboard" },
    { icon: faHamburger, text: "Hamburguer" },
    { icon: faHome, text: "Home" },
    { icon: faCubes, text: "Cubes" }
  ];
  return icons.map(icon => ({
    icon: icon.icon,
    text: icon.text,
    value: icon.icon
  }));
};

const getWidths = () => {
  const listWidths = [];
  for (let width = 10; width <= 100; width += 10) {
    listWidths.push({ text: `${width}%`, value: `${width}%` });
  }
  return listWidths;
};

const Dropdown = props => {
  const BootstrapInput = withStyles(theme => ({
    root: {
      "label + &": {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
      }
    }
  }))(InputBase);
  const [valueDropdown, setValueDropdown] = React.useState("none");

  const handleChange = event => {
    setValueDropdown(event.target.value);
    props.onChange(event.target.value);
  };
  return (
    <Select
      className="dropdown-select"
      labelId="demo-customized-select-label"
      id="demo-customized-select"
      value={valueDropdown}
      onChange={handleChange}
      input={<BootstrapInput />}
      id={props.id}
    >
      <MenuItem
        value="none"
        className="dropdown-optionMenuItem"
        id={props.id + "-none"}
      >
        <em style={{ color: "grey" }}>
          {props.defaultOption ? props.defaultOption : "none"}
        </em>
      </MenuItem>

      {props.icons
        ? getIcons().map((icon, pos) => (
            <MenuItem
              key={"dropdown-" + pos}
              value={icon.value}
              className="dropdown-optionMenuItem"
              id={props.id + `-${pos}`}
            >
              <FontAwesomeIcon icon={icon.icon} />
              <span>{icon.text}</span>
            </MenuItem>
          ))
        : null}
      {props.widths
        ? getWidths().map((width, pos) => (
            <MenuItem
              key={"dropdown-" + pos}
              value={width.value}
              className="dropdown-optionMenuItem"
              id={props.id + `-${pos}`}
            >
              <span>{width.text}</span>
            </MenuItem>
          ))
        : null}
      {props.options
        ? props.options.map((option, pos) => (
            <MenuItem
              key={"dropdown-" + pos}
              value={option.value}
              className="dropdown-optionMenuItem"
              id={props.id + `-${pos}`}
            >
              <span>{option.text}</span>
            </MenuItem>
          ))
        : null}
    </Select>
  );
};

export default Dropdown;
