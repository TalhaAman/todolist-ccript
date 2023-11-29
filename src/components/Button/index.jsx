import React from "react";
import "./button.css";

const Button = ({ type = "button", onClick, label, disabled, classNames }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${classNames}`}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
