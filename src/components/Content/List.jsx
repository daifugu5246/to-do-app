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
        <div className="todo-list d-flex flex-column align-items-center">
          {
            tasks.length === 0 ? (
                <div key={null} className="notask h-100 d-flex justify-content-center align-items-center">
                    <h1 className="notask text-secondary">No Task Available.</h1>
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
          }
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