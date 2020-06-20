import React, { Component } from "react";

import "./Input.scss";

class Input extends Component {
  constructor(props) {
    super(props);
    this.inputRef = null;
  }

  componentDidUpdate() {
    //force new value to the input
    const { newValue } = this.props;
    if (newValue) {
      this.inputRef.value = typeof(newValue) !== "string" ? JSON.stringify(newValue) : newValue;
    }
  }

  render() {
    const {
      id,
      tooltip,
      placeholder,
      onChange,
      defaultValue,
      width,
      margin,
      className,
      infoParams
    } = this.props;
    return (
      <input
        style={{ width, margin }}
        ref={inputElm => {
          this.inputRef = inputElm;
        }}
        title={tooltip}
        className={className ? "InputComponent " + className: "InputComponent"}
        placeholder={placeholder}
        onChange={!infoParams ? onChange : (event,infoparams) => onChange(event, infoParams)}
        defaultValue={defaultValue}
        id={id}
      />
    );
  }
}

export default Input;
