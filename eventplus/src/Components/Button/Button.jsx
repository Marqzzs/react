import React from "react";
import "./Button.css";

const Button = ({ textButton, type }) => {
  return <button type={type}>{textButton}</button>;
};

export default Button;
