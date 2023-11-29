import React, { useEffect, useState } from "react";
import "./todoList.css";

import firebaseService from "../../services/firebaseServices";
import TodoItem from "../TodoItem";
import chevron from "../../assets/icons/chevron.svg";
import { ReactSVG } from "react-svg";
import list from "../../assets/icons/listIcon.svg";
import { nanosecondsToTime } from "../../utils/helperFunctions";
// import ChevronIcon from "../../assets/icons/ChevronIcon";

const TodoList = ({ tasks, setTasks }) => {
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [toggleTasks, setToggleTasks] = useState(true);
  const [toggleDetail, setToggleDetail] = useState(null);

  const handleDeleteItem = async (id) => {
    setDelLoading(true);
    try {
      const res = await firebaseService.deleteDocument("tasks", id);
      const filteredTasks = tasks.filter((task) => task.id !== id);
      setTasks(filteredTasks);
    } catch (error) {
      console.log(error);
    }
    setDelLoading(false);
  };

  const handleDetail = (id) => {
    toggleDetail == id ? setToggleDetail(null) : setToggleDetail(id);
  };

  const handleCheck = async (task) => {
    try {
      const res = await firebaseService.updateDocument("tasks", task?.id, {
        status: true,
        title: task?.title,
        createdAt: task?.createdAt,
        id: task?.id,
      });
      const filteredTasks = tasks.filter((tk) => tk.id !== task?.id);
      const updatedTasks = [...filteredTasks, { ...task, status: true }];
      updatedTasks.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
      console.log(updatedTasks);
      setTasks(updatedTasks);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await firebaseService.getDocuments("tasks");
      console.log(res);
      const sort = res.sort(
        (a, b) => b.createdAt.seconds - a.createdAt.seconds
      );
      console.log(sort);
      setTasks(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="mt-4">
      <div
        className="todos-toggle d-flex align-items-center justify-content-between"
        onClick={() => setToggleTasks(!toggleTasks)}
      >
        <div className="d-flex align-items-center gap-2">
          <ReactSVG src={list} className="list-icon" />
          <p className="m-0">Your todos</p>
        </div>
        <div>
          <ReactSVG src={chevron} className="chevron-icon" />
        </div>
      </div>
      {toggleTasks && (
        <div className="todos-list  mt-3 ">
          {loading ? (
            <div
              className="d-flex align-items-center justify-content-center w-100"
              style={{ height: "250px" }}
            >
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : !loading && !tasks?.length > 0 ? (
            <div
              className="d-flex align-items-center justify-content-center w-100"
              style={{ height: "250px" }}
            >
              No task today
            </div>
          ) : (
            <div>
              {tasks?.map((task) => {
                return (
                  <TodoItem
                    key={task?.id}
                    task={task}
                    detail={toggleDetail}
                    onDetail={handleDetail}
                    onDelete={handleDeleteItem}
                    onCheck={handleCheck}
                    delLoading={delLoading}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoList;
