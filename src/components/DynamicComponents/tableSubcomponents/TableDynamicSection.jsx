//react import
import React, { Component } from "react";

//bootstrap import
import BootstrapTable from "react-bootstrap-table-next";

//component imports
import Spinner from "components/Spinner/Spinner.jsx";

//Class to render the formulary to custom the table
class TableDynamicSection extends Component {
  //Calculate the new columns of the current data
  calculateColumns = data => {
    if (data && data[0]) {
      const keys = Object.keys(data[0]);
      const listColumns = keys.map((column) => ({
        dataField: column,
        text: column
      }));
      return listColumns;
    }
    return null;
  };

  render() {
    const {
      films,
      loading,
      error,
      endpoint,
      dataComponent,
      formComponentRef
    } = this.props;

    //by default, correctFormatData is false
    let correctFormatData = false;

    //formComponentRef is null the first time render
    if (formComponentRef) {
      if (endpoint !== "none" && films) {
        correctFormatData = formComponentRef.checkData(JSON.stringify(films));
      } else {
        correctFormatData = formComponentRef.checkData(
          JSON.stringify(dataComponent)
        );
      }
    }

    //if the format of the data is correct, add the column id for the bootstrap component
    let localData = [];
    if (correctFormatData !== false) {
      if (endpoint !== "none" && films) {
        films.forEach((film, pos) => {
          localData.push(film);
          //bootstrap needs the id or it will throw a warning
          if (!localData[pos].id) {
            localData[pos].id = pos.toString();
          }
        });
      } else {
        if (dataComponent) {
          dataComponent.forEach((data, pos) => {
            localData.push(data);
            //bootstrap needs the id or it will throw a warning
            if (!localData[pos].id) {
              localData[pos].id = pos.toString();
            }
          });
        }
      }
    }

    //get the columns of the table
    const columnsTable = this.calculateColumns(localData);

    //selectRow, bootstrap property used when user click on a row
    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      hideSelectColumn: true,
      bgColor: "ghostwhite",
      onSelect: row => {
        const { modalRef } = this.props;
        const listKeys = Object.keys(row);
        let listData = listKeys.map(key => ({
          label: key,
          value: row[key]
        }));
        modalRef.handlerModal("INFO", listData);
      }
    };

    return (
      <div id="table-bootstrapTable">
        {/*show spinner if loading is not null. Show an error if there is some problem with the response of a call or with the format of the response */}
        {loading ? <Spinner /> : null}
        {(endpoint !== "none" && error !== null) ||
        (!correctFormatData && formComponentRef && !loading) ? (
          <div id="table-bootstrapTable-error">
            Sorry, there has been an error getting data. Please, be sure the
            response of the call is with the right format.
          </div>
        ) : loading || localData.length === 0 ? null : (
          <BootstrapTable
            classes="bootstrapTable"
            keyField="id"
            data={localData}
            columns={columnsTable}
            selectRow={selectRow}
          />
        )}
      </div>
    );
  }
}

export default TableDynamicSection;
