import './Sidebar.css'
import PropTypes from 'prop-types';
import { Nav, Button } from 'react-bootstrap';
import { IoReorderThreeSharp } from 'react-icons/io5';

const Sidebar = (props) => {
  const handleClickTasks = () => {
    props.changeContentState(0);
  };

  const handleClickImportant = () => {
    props.changeContentState(1);
  };

  const handleClickCompleted = () => {
    props.changeContentState(2);
  };
  return (
    <div className={`sidebar ${props.showSidebar ? 'd-block' : 'd-none'} bg-dark`}>
      <div className="sidebar-header w-100 d-flex justify-content-center">
        <div className="sidebar-header-content">
          <Button variant="dark" className="sidebar-toggle" onClick={props.toggleSidebar}>
            <IoReorderThreeSharp size={28}/>
          </Button>
        </div>
      </div>
      <div className="sidebar-nav text-light d-flex justify-content-center">
        <Nav className="nav-pills w-100 flex-column">
          <Nav.Item className='tab w-100 text-center' onClick={handleClickTasks}><Nav.Link>Tasks</Nav.Link></Nav.Item>
          <Nav.Item className='tab w-100 text-center' onClick={handleClickImportant}><Nav.Link>Important</Nav.Link></Nav.Item>
          <Nav.Item className='tab w-100 text-center' onClick={handleClickCompleted}><Nav.Link>Complete</Nav.Link></Nav.Item>
        </Nav>
      </div>
    </div>
  );
};
Sidebar.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  changeContentState: PropTypes.func.isRequired,
};
export default Sidebar;