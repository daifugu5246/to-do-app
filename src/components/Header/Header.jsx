/* eslint-disable react/no-unescaped-entities */
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { IoReorderThreeSharp } from 'react-icons/io5';
import './Header.css'
import { useEffect, useState } from 'react';

const Header = (props) => {
    const initDate = new Date();
    const [time, setTime] = useState(initDate.toLocaleTimeString());
    
    // update time every second
    useEffect(()=>{
        setInterval(()=>{
            const d = new Date();
            let textTime = d.toLocaleTimeString();
            setTime(textTime);
        },100)
    },[time, setTime]);
    
    return (
        <div className='header position-fixed bg-light' style={{width:'100%', right: '0px'}}>
            <div className='d-flex justify-content-around align-items-center'>
                <div className='textTime-continer position-absolute start-0'>
                    <h3 className='textTime m-0 h3'>{ time }</h3>
                </div>
                <div>
                    <Button variant="light" 
                            className='sidebar-toggle' 
                            onClick={props.toggleSidebar} 
                            style={{opacity: props.showSidebar ? '0' : '1'}} 
                            disabled={props.showSidebar ? true : false}>
                        <IoReorderThreeSharp size={28}/>
                    </Button>              
                </div>
                <div className='myday-container position-absolute end-0'>
                    <h3 className='myday m-0 h3'>TO DO</h3>
                </div>
            </div>
        </div>
    )
}

Header.propTypes = {
    showSidebar: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
};

export default Header