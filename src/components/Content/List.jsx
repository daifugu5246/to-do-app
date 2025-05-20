import './List.css';
import Item from './Item';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const List = (props) => {
    const [tasks, setTasks] = useState(props.tasks);
    
    useEffect(() => {
        setTasks(props.tasks);
    }, [props.tasks]);
    
    return (
        <div className="todo-list w-75 d-flex flex-column align-items-center">
          {
            tasks.length === 0 ? (
                <div key={null} className="notask h-100 d-flex justify-content-center align-items-center">
                    <h1 className="text-secondary">No Task Available.</h1>
                </div>
            ) : (
                tasks.map((task) => (
                    <Item
                        key={task.id}
                        task={task}
                        onStarClick={props.onStarClick}
                        onCheckboxChecked={props.onCheckboxChecked}
                        onDeleted={props.onDeleted}
                    />
                ))
            )
            /* <>
              {
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
            </> */}
        </div>
    )
}

List.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.string.isRequired,
        taskName: PropTypes.string.isRequired,
        isImportant: PropTypes.bool.isRequired,
        isComplete: PropTypes.bool.isRequired,
        })
    ).isRequired,
    onStarClick: PropTypes.func.isRequired,
    onCheckboxChecked: PropTypes.func.isRequired,
    onDeleted: PropTypes.func.isRequired,
}

export default List;