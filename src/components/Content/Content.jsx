import "./Content.css";
import Item from "./Item";
import Header from "../Header/Header";

import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NewTaskForm from "./NewTaskForm";

const Content = (props) => {
  //Data variable
  const [tasks, setTasks] = useState([
    {
      id: uuidv4(),
      taskName: "Learn new things",
      isImportant: true,
      isComplete: false,
    },
    {
      id: uuidv4(),
      taskName: "Work out",
      isImportant: false,
      isComplete: false,
    },
    { id: uuidv4(), taskName: "Sleep", isImportant: false, isComplete: false },
  ]);

  //Modal state
  const [modalShow, setModalShow] = useState(false);

  //Add task handle
  const addTask = (value) => {
    const newTask = {
      id: uuidv4(),
      taskName: value,
      isImportant: false,
      isComplete: false,
    };
    setTasks([...tasks, newTask]);
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
    setTasks(updatedTasks);
  };

  //Completed click handle
  const onCheckboxChecked = (id, isComplete) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isComplete = isComplete;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  //Delete Item click handle
  const onDeleted = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="w-100">
      <Header
        showSidebar={props.showSidebar}
        toggleSidebar={props.toggleSidebar}
      />
      {/*if sidebar show change position and width of content the position: relative is in css file*/}
      <div
        className="todo"
        style={{
          left: props.showSidebar ? "304px" : "0px",
          width: props.showSidebar ? "80%" : "100%",
        }}
      >
        <div className="todo-head w-75 d-flex justify-content-between">
          <div>
            {
              //3 State of Content 0: Task, 1: Important, 2: Completed
              props.contentState === 0 ? (
                <h1>My day</h1>
              ) : props.contentState === 1 ? (
                <h1>Important</h1>
              ) : (
                <h1>Completed</h1>
              )
            }
          </div>
          <div>
            <Button className="btn btn-dark" onClick={() => setModalShow(true)}>
              Add Task
            </Button>
            <NewTaskForm
              show={modalShow}
              onHide={() => setModalShow(false)}
              style={{
                left: props.showSidebar ? "304px" : "0px",
                width: props.showSidebar ? "80%" : "100%",
              }}
              addTask={addTask}
            />
          </div>
        </div>
        <div className="todo-list w-75 d-flex flex-column align-items-center">
          {
            <>
              {
                // if No data in tasks variable then show No tasks now.
                // if content state is 0: Task then filter task that not completed.
                // if have no no satisfy data Show No task now.
                props.contentState === 0 ? (
                  tasks.filter((task) => !task.isComplete).length === 0 ? (
                    <div
                      key={null}
                      className="notask h-100 d-flex justify-content-center align-items-center"
                    >
                      <h1 className="text-secondary">No task now.</h1>
                    </div>
                  ) : (
                    tasks
                      .filter((task) => !task.isComplete)
                      .map((task) => (
                        <Item
                          key={task.id}
                          task={task}
                          onStarClick={onStarClick}
                          onCheckboxChecked={onCheckboxChecked}
                          onDelete={onDeleted}
                        />
                      ))
                  )
                ) : null
              }
              
              {
                // if No data in tasks variable then show No tasks now.
                // if content state is 1: Important then filter task that not completed and important.
                // if have no satisfy data show No important task now.
                props.contentState === 1 ? (
                  tasks.filter((task) => task.isImportant && !task.isComplete)
                    .length === 0 ? (
                    <div
                      key={null}
                      className="notask h-100 d-flex justify-content-center align-items-center"
                    >
                      <h1 className="text-secondary">No important task now.</h1>
                    </div>
                  ) : (
                    tasks
                      .filter((task) => task.isImportant && !task.isComplete)
                      .map((task) => (
                        <Item
                          key={task.id}
                          task={task}
                          onStarClick={onStarClick}
                          onCheckboxChecked={onCheckboxChecked}
                          onDelete={onDeleted}
                        />
                      ))
                  )
                ) : null
              }

              {
                // if No data in tasks variable then show No tasks now.
                // if content state is 2: Complete then filter task that completed.
                // if have no satisfy data show No important task now.
                props.contentState === 2 ? (
                  tasks.filter((task) => task.isComplete).length === 0 ? (
                    <div
                      key={null}
                      className="notask h-100 d-flex justify-content-center align-items-center"
                    >
                      <h1 className="text-secondary">No completed task now.</h1>
                    </div>
                  ) : (
                    tasks
                      .filter(
                        (task) =>
                          task.isComplete &&
                          props.contentState !== 1 &&
                          props.contentState !== 0
                      )
                      .map((task) => (
                        <Item
                          key={task.id}
                          task={task}
                          onStarClick={onStarClick}
                          onCheckboxChecked={onCheckboxChecked}
                          onDelete={onDeleted}
                        />
                      ))
                  )
                ) : null
              }
            </>
          }
        </div>
      </div>
    </div>
  );
};
Content.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  contentState: PropTypes.number.isRequired,
};
export default Content;
