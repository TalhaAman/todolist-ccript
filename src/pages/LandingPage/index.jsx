import React, { useState } from "react";
import "./landingpage.css";

import Button from "../../components/Button";
import Plus from "../../assets/icons/plus.svg";
import TodoList from "../../components/TodoList";
import Profile from "../../assets/images/profile.jpg";
import firebaseService from "../../services/firebaseServices";
import { convertDateToFirestoreTimestamp } from "../../utils/helperFunctions";

import { ReactSVG } from "react-svg";

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState("");
  const [tasks, setTasks] = useState([]);

  //Function for adding a new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const date = new Date();

      const res = await firebaseService.addDocument("tasks", {
        title: todo,
        status: false,
        createdAt: convertDateToFirestoreTimestamp(date),
      });

      setTasks((tasks) => [res, ...tasks]);
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
