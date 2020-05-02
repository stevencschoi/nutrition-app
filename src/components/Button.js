import React from "react";
// import "components/Button.scss";
const classNames = require("classnames");

export default function Button(props) {
  // add class to button based on props
  const buttonClass = classNames("button", {
    "btn btn-sm follow btn-primary": props.default,
    "delete-button": props.delete,
    "delete-button-image": props.deleteImage,
    registerformButton: props.register,
  });
  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      // disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
