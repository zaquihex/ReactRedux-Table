import React, { Component } from "react";

import Dialog from "react-bootstrap-dialog";
import Field from "components/Field/Field";
import TitleSection from "components/TitleSection/TitleSection";
import BtnStandard from "components/Button/BtnStandard";

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import "react-bootstrap-buttons/dist/react-bootstrap-buttons.css";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.dialog = null;
  }

  handlerModal = (title, data, externalUrl) => {
    const { close } = this.props;

    this.dialog.show({
      title: (
        <TitleSection
          icon={faInfoCircle}
          title={title}
          customStyle={{ borderBottom: "none" }}
        />
      ),
      body: (
        <>
          {data.map((field, key) => (
            <Field
              key={"modalBootstrapTable-".concat(key)}
              label={field.label}
              value={field.value}
            />
          ))}
          {!externalUrl ? null : (
            <BtnStandard text={externalUrl.title} url={externalUrl.url} />
          )}
        </>
      ),
      bsSize: "small",
      onHide: dialog => {
        dialog.hide();
        if (close) {
          close();
        }
      }
    });
  };

  render() {
    return (
      <Dialog
        ref={dialog => {
          this.dialog = dialog;
        }}
      />
    );
  }
}

export default Modal;
