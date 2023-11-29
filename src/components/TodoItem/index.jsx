import React from "react";
import "./todoItem.css";
import { nanosecondsToTime } from "../../utils/helperFunctions";
import { ReactSVG } from "react-svg";
import check from "../../assets/icons/check.svg";
import dots from "../../assets/icons/dots.svg";
import Button from "../Button";

const TodoItem = ({
  task,
  detail,
  onDetail,
  onDelete,
  onCheck,
  delLoading,
}) => {
  const time = nanosecondsToTime(
    task?.createdAt?.nanoseconds,
    task?.createdAt?.seconds
  );
  return (
    <>
      <div className="todo-item d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <ReactSVG
            src={check}
            className={`${task?.status && "checked no-pointer"} check-icon`}
            onClick={() => !task?.status && onCheck(task)}
          />
          <p
            className="m-0 text-capitalize text-truncate"
            style={{ maxWidth: "300px" }}
          >
            {task?.title}
          </p>
        </div>
        <ReactSVG
          src={dots}
          className="circle-icon"
          onClick={() => onDetail(task?.id)}
        />
      </div>
      <hr className="m-0" />
      {detail == task?.id && (
        <div className="bg-white px-3 pt-3 pb-2">
          <p className="mb-1">
            <b>Completed</b>: {task?.status ? "Completed" : "Not Completed"}
          </p>
          <p className="mb-0">
            <b>Created At</b>: {time}
          </p>
          <div>
            <Button
              classNames="delete-btn"
              disabled={delLoading}
              onClick={() => onDelete(task.id)}
              label={
                delLoading ? (
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Delete"
                )
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TodoItem;
