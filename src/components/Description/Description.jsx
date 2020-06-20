import React from "react";
import Field from 'components/Field/Field';
import "./Description.scss";
const Description = props => (
  <div className="standardText lineDescription" id={props.id}>
    <div className="titleDescription">¿How it works?</div>
    {props.list.map((desc,pos) => (
      <div key={`description-${pos}`}>
      <span>{desc.title} </span>
      <div>{desc.description}</div>
    </div>
    ))}
  </div>
);
export default Description;

/* 
import React from "react";
import Field from 'components/Field/Field';
import "./Description.scss";
const Description = props => (
  <div className="standardText lineDescription" id={props.id}>
    <div className="titleDescription">¿How it works?</div>
    {props.list.map((desc,pos) => (
      <div key={`description-${pos}`}>
        <span>{desc.title} </span>
        <div>{desc.description}</div>
      </div>
    ))}
  </div>
);
export default Description;

*/
