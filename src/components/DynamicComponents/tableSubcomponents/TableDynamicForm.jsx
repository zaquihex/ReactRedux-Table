import React, { Component } from "react";

import { faDatabase, faLink } from "@fortawesome/free-solid-svg-icons";

import Dropdown from "components/Dropdown/Dropdown";
import Button from "components/Button/BtnStandard";
import Input from "components/Input/Input";

//Default data to fill the table
const defaultData = [
  { "column 1": "rabbit", "column 2": "horse", "column 3": "cow" },
  { "column 1": "bat", "column 2": "mouse", "column 3": "cat" },
  { "column 1": "bird", "column 2": "crocodile", "column 3": "whale" }
];

//Form to custom the table
class TableDynamicForm extends Component {
  constructor() {
    super();
    this.state = {
      endpointValue: ""
    };
  }

  getEndpointValue = () => {
    const { endpointValue } = this.state;
    return endpointValue;
  };

  //Check if the data of the user has the correct format to render a table
  checkData = data => {
    let dataChecked = null;
    try {
      dataChecked = JSON.parse(data);
    } catch (error) {
      return false;
    }
    if (Array.isArray(dataChecked) && dataChecked.length > 0) {
      let result = true;
      dataChecked.forEach(elem => {
        if (
          typeof elem !== "object" ||
          elem === null ||
          Object.keys(elem).length === 0
        ) {
          result = false;
        }
      });

      if (!result) {
        return false;
      }

      return dataChecked;
    }
    return false;
  };

  //render the new table according with the data of the user (if it has the correct format)
  onChangeInput = event => {
    const { onChangeData } = this.props;
    let data = this.checkData(event.target.value);
    if (data) {
      onChangeData(data);
    }
  };

  onChangeEndpointInput = event => {
    this.setState({ endpointValue: event.target.value });
  };

  //Fields to custom the data of the table
  render = () => {
    const {
      dynamic,
      newValue,
      btnDetaultDataActive,
      btnCustomEndpointActive,
      changeEndpointBtnActive,
      changeBtnActive,
      onChangeData,
      changeEndpoint
    } = this.props;
    const { endpointValue } = this.state;
    return dynamic === false ? null : (
      <div id="table-formComponent">
        <div className="dynamic-parent">
          <Input
            id="table-formComponent-datacomponent-data"
            margin="0px 15px"
            width="50%"
            onChange={this.onChangeInput}
            placeholder="specify data (hover to check format) - id not editable"
            tooltip='data format: [{"column1": "value","column2": "value2"},{"column1": "value3","column2": "value4"}]'
            newValue={newValue}
          />
          <Button
            id="table-formComponent-datacomponent-btn"
            margin="0px 15px"
            activeBtn={btnDetaultDataActive}
            text="default data"
            icon={faDatabase}
            onClick={() => {
              changeBtnActive(true);
              onChangeData(defaultData);
            }}
          />
        </div>
        <div className="dynamic-parent">
          <Input
            id="table-formComponent-endpoint-input"
            onChange={this.onChangeEndpointInput}
            margin="0px 15px"
            width="50%"
            placeholder="specify an endpoint"
            tooltip="be sure that data is on the list/results of the response"
            defaultValue={endpointValue}
            ref={endpointRef => {
              this.inputEndpointRef = endpointRef;
            }}
          />
          <Button
            id="table-formComponent-endpoint-btn"
            margin="0px 15px"
            activeBtn={btnCustomEndpointActive}
            text="get Data"
            icon={faLink}
            onClick={() => {
              changeEndpointBtnActive(true);
              changeEndpoint();
            }}
          />
          <Dropdown
            id="table-formComponent-endpoint-dropdown"
            defaultOption="Specify an endpoint"
            onChange={changeEndpoint}
            options={[
              { text: "theMovieDB", value: "theMovieDB" },
              {
                text: "dailyMotion",
                value: "https://api.dailymotion.com/videos"
              },
              {
                text: "opentdb",
                value: "https://opentdb.com/api.php?amount=10"
              }
            ]}
          />
        </div>
      </div>
    );
  };
}

export default TableDynamicForm;
