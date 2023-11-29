import React from "react";
import "./addTodo.css";
import Button from "../Button";

const AddTodo = () => {
  return (
    <div className="add-todo d-flex align-items-center justify-content-between mt-5">
      <input placeholder="Add new task" />
      <Button />
    </div>
  );
};

export default AddTodo;
