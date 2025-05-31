import "./Content.css";
import List from "./List";
import Header from "../Header/Header";

import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import NewTaskForm from "./NewTaskForm";

const Content = (props) => {
  //Data variable
  const [tasks, setTasks] = useState(props.tasks);
  const [taskShow, setTaskShow] = useState(tasks.filter((task) => !task.isComplete));

  //Modal state
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (props.contentState === 0) {
      setTaskShow(tasks.filter((task) => !task.isComplete));
    } else if (props.contentState === 1) {
      setTaskShow(tasks.filter((task) => task.isImportant && !task.isComplete));
    } else if (props.contentState === 2) {
      setTaskShow(tasks.filter((task) => task.isComplete && props.contentState !== 1 && props.contentState !== 0));
    }
  }, [props.contentState, tasks]);

  //Add task handle
  const addTask = (value) => {
    const newTask = {
      id: uuidv4(),
      taskName: value,
      isImportant: false,
      isComplete: false,
    };
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    setTasks(JSON.parse(localStorage.getItem('tasks')));
    console.log(tasks.filter((task) => !task.isComplete));
  };

  //Important click handle
  const onStarClick = (id, isImportant) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isImportant = isImportant;
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(JSON.parse(localStorage.getItem('tasks')));
  };

  //Completed click handle
  const onCheckboxChecked = (id, isComplete) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isComplete = isComplete;
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(JSON.parse(localStorage.getItem('tasks')));
  };

  //Delete Item click handle
  const onDeleted = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(JSON.parse(localStorage.getItem('tasks')));
  };

  return (
    <div className="w-100">
      <Header
        showSidebar={props.showSidebar}
        toggleSidebar={props.toggleSidebar}
      />
      {/*if sidebar show change position and width of content the position: relative is in css file*/}
      <div className="todo" style={{ top: props.showSidebar ? "100px" : "0px", width: "100%", padding: "0px 20px"}}>
        <div className="todo-head d-flex justify-content-between">
          <h1>
              {props.contentState === 0 ? "My Day" : props.contentState === 1 ? "Important" : "Completed"}
          </h1>
          <div>
            <Button className="btn btn-dark" onClick={() => setModalShow(true)}>
              Add Task
            </Button>
            <NewTaskForm show={modalShow} onHide={() => setModalShow(false)}
              style={{
                left: props.showSidebar ? "304px" : "0px",
                width: props.showSidebar ? "80%" : "100%",
              }}
              addtask={addTask}
            />
          </div>
        </div>
        <div>
          <List tasks= {taskShow} onStarClick={onStarClick} onCheckboxChecked={onCheckboxChecked} onDeleted={onDeleted}/>
        </div>
      </div>
    </div>
  );
};
Content.propTypes = {
  tasks: PropTypes.array,
  showSidebar: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  contentState: PropTypes.number.isRequired,
};
export default Content;
