import React, { useState } from "react";
import "./LandingPage.css";

import Profile from "../../assets/images/profile.jpg";
import Plus from "../../assets/icons/plus.svg";
import TodoList from "../../components/TodoList";
import Button from "../../components/Button";
import { ReactSVG } from "react-svg";
import firebaseService from "../../services/firebaseServices";
import { dateToNanoseconds } from "../../utils/helperFunctions";

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const date = new Date();
      const res = await firebaseService.addDocument("tasks", {
        title: todo,
        status: false,
        createdAt: date,
      });
      console.log(res);
      setTasks((tasks) => [
        { ...res, createdAt: dateToNanoseconds(res.createdAt) },
        ...tasks,
      ]);
      setTodo("");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="landing-page d-flex  justify-content-center">
      <div className="d-flex flex-column align-items-center">
        <div className="profile-img">
          <img src={Profile} alt="profile" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="add-todo d-flex align-items-center justify-content-between mt-5"
        >
          <input
            placeholder="Add new task"
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <Button
            type="submit"
            label={
              !loading ? (
                <ReactSVG src={Plus} />
              ) : (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )
            }
            classNames="plus-btn"
            disabled={loading || !todo.length > 0}
          />
        </form>
        <TodoList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default LandingPage;
