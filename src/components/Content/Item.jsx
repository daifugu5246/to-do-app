import { useState } from 'react';
import './Item.css';
import PropTypes from 'prop-types';
import {IoStar, IoTrashOutline} from 'react-icons/io5';

const Item = (props) => {
    const [importantTasks, setImportantTasks] = useState(props.task.isImportant);
    const [completeTasks, setCompleteTasks] = useState(props.task.isComplete);
    const starOnClick = () => {
        setImportantTasks(!importantTasks);
        props.onStarClick(props.task.id, !importantTasks);
    }
    const checkboxOnChecked = () => {
        setCompleteTasks(!completeTasks);
        props.onCheckboxChecked(props.task.id, !completeTasks)
    }
    const trashOnClick = () => {
        props.onDeleted(props.task.id);
    }
    return (
        <div className='task row bg-white mt-2 mb-2 p-3' style={{ zIndex: 0 }}>
            <div className='col-1'>
                <input type="checkbox" className='check col-1 form-check-input' checked={completeTasks} onChange={checkboxOnChecked}></input>
            </div>
            <div className='col-8 col-sm-9'>
                <label className='label form-check-label' style={{textDecorationLine: completeTasks ? 'line-through' : null}}>{props.task.taskName}</label>
            </div>
            <div className='col-1'>
                <IoStar className='star' size={20} onClick={starOnClick} style={{color: importantTasks ? 'orange' : '#cccccc'}}/>
            </div>
            <div className='col-1'>
                <IoTrashOutline className='gabage' size={20} onClick={trashOnClick} style={{color: 'red'}}></IoTrashOutline>
            </div>
        </div>
    )
}
Item.propTypes = {
   task: PropTypes.object.isRequired,
   onStarClick: PropTypes.func,
   onCheckboxChecked: PropTypes.func,
   onDeleted: PropTypes.func,
};

export default Item;