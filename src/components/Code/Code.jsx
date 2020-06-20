import React from "react";
import "./Code.scss";

const Code = props => {
  //name of the react component
  const namePureComponent = "Custom" + props.namePureComponent;
  //imports
  const listImports = props.imports.map(
    importElem => importElem ? `import ${importElem.name} from  '${importElem.path}';` : ''
  );
  listImports.unshift("import React from 'react';");
  //params
  let listParams = "";
  props.params.forEach(param => {
    listParams += `${param.name}=${param.value} `;
  });
  if (props.width && props.width.length > 0) {
    listParams += "style={{ width: " + props.width + " }}";
  }

  //body
  const body = [];
  body.push("const " + namePureComponent + " = props => (");
  body.push(`     <${props.namePureComponent} ` + listParams + " />");

  body.push(");");
  body.push("export default " + namePureComponent + ";");
  return (
    <div className="dynamicComponent-code" id={props.id}>
      {listImports.map((importLine, pos) => (
        <div key={"importComponentDynamic-" + pos}>{importLine}</div>
      ))}
      <br />
      {body.map((bodyLine, pos) => (
        <div key={"bodyComponentDynamic-" + pos}>
          <div>{bodyLine}</div>
          {pos === body.length - 2 ? <br /> : null}
        </div>
      ))}
    </div>
  );
};

export default Code;
