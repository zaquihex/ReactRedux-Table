import React, { Component } from "react";

import TableDynamicForm from "components/DynamicComponents/tableSubcomponents/TableDynamicForm";
import TableDynamicSection from "components/DynamicComponents/tableSubcomponents/TableDynamicSection";
import Code from "components/Code/Code";

import { connect } from "react-redux";
import * as actions from "store/actions";

import Modal from "components/Modal/Modal.jsx";
import "./Table.scss";

//Description of the dataTable
export const descriptionTable = [
  {
    title: "Bootstrap library: ",
    description: "Table and modal are imported from bootstrap library."
  },
  { title: "Scss: ", description: "Styles of the components." },
  {
    title: "Redux-saga: ",
    description: "Used to fill the table with the reponse of a call."
  },
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

//Main class to render the table
class Table extends Component {
  constructor(props) {
    super(props);
    this.modalRef = null;
    this.formComponentRef = null;
    this.state = {
      dataComponent: null,
      endpoint: "none",
      columnsComponent: []
    };
    this.btnDetaultDataActive = false;
    this.btnCustomEndpointActive = false;
  }

  componentDidMount() {
    const { dynamic, endpoint, dataComponent } = this.props;
    if (dynamic === false) {
      if (endpoint) {
        this.changeEndpoint(endpoint);
      }
      if (dataComponent) {
        this.changeDataComponent(dataComponent);
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    //show a modal with the error if the call to get data for the table fails
    if (!prevProps.error && error) {
      this.modalRef.handlerModal(error.title, error.data);
    }
    return true;
  }

  //if default button is active
  changeBtnActive(newValue) {
    this.btnDetaultDataActive = newValue;
    if (newValue) {
      this.btnCustomEndpointActive = false;
    }
  }

  //if button for endpoint is active
  changeEndpointBtnActive(newValue) {
    this.btnCustomEndpointActive = newValue;
    if (newValue) {
      this.btnDetaultDataActive = false;
    }
  }

  //function to call to the new endpoint
  changeEndpoint = newEndpoint => {
    const { dataComponent } = this.state;
    const { getData } = this.props;
    //true if user has changed data instead change of endpoint
    if (newEndpoint === "none") {
      this.changeDataComponent(dataComponent);
    } else {
      if (!newEndpoint) {
        const customEndpoint = this.formComponentRef.getEndpointValue();
        getData(customEndpoint);
        this.btnDetaultDataActive = false;
        this.btnCustomEndpointActive = true;
        this.setState({ endpoint: customEndpoint });
      } else {
        this.btnDetaultDataActive = false;
        this.btnCustomEndpointActive = false;
        getData(newEndpoint);
        this.setState({ endpoint: newEndpoint });
      }
    }
  };

  //When data has changed, the state variable is updated in real time.
  changeDataComponent = newData => {
    this.setState({ dataComponent: newData, endpoint: "none" });
  };

  render() {
    const { dynamic, films, loading, error } = this.props;
    const { endpoint, dataComponent } = this.state;

    let correctFormatData;
    if (this.formComponentRef) {
      correctFormatData = this.formComponentRef.checkData(
        JSON.stringify(films)
      );
    }

    let params = [{ name: "dynamic", value: "{false}" }];
    if (correctFormatData !== false && endpoint !== "none" && films) {
      params.push({ name: "endpoint", value: `'${endpoint}'` });
    } else {
      if (dataComponent) {
        params.push({
          name: "dataComponent",
          value: `'${JSON.stringify(dataComponent)}'`
        });
      }
    }
    
    return (
      <div>
        <div className="dynamic-parent">
          {dynamic === false ? null : (
            <div className="titleSubsection standardText">Table</div>
          )}
          <div className={dynamic === false ? null : "dynamic-subsection"}>
            <TableDynamicForm
              dynamic={dynamic}
              changeBtnActive={this.changeBtnActive.bind(this)}
              btnDetaultDataActive={this.btnDetaultDataActive}
              onChangeData={this.changeDataComponent}
              changeEndpoint={this.changeEndpoint}
              btnCustomEndpointActive={this.btnCustomEndpointActive}
              changeEndpointBtnActive={this.changeEndpointBtnActive.bind(this)}
              newValue={dataComponent}
              ref={componentRef => {
                this.formComponentRef = componentRef;
              }}
            />
          </div>
        </div>
        <Modal
          ref={modal => {
            this.modalRef = modal;
          }}
        />
        <TableDynamicSection
          films={films}
          loading={loading}
          error={error}
          endpoint={endpoint}
          dataComponent={dataComponent}
          modalRef={this.modalRef}
          formComponentRef={this.formComponentRef}
        />
        {dynamic === false ||
        (error && endpoint !== "none") ||
        (!dataComponent && (endpoint === "none") || correctFormatData === false) ? null : (
          <Code
            id="tableSection-code"
            namePureComponent="Table"
            imports={[
              {
                name: "Table",
                path: "components/DynamicComponents/Table"
              }
            ]}
            params={params}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  films: state.movies.films,
  loading: state.movies.loading,
  error: state.movies.error
});

const mapDispatchToProps = dispatch => ({
  getData: endpoint => {
    dispatch(actions.getDataInit(endpoint));
  },
  setError: error => {
    dispatch(actions.setDatatableError(error));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
