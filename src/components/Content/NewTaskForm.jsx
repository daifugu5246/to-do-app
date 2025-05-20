import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

function NewTaskForm(props) {
  const onTrigger = (event) => {
    props.addtask(event.target.inputTask.value);
    event.preventDefault();
    props.onHide();
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter your task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form action='' id='taskform' onSubmit={onTrigger}>
          <Form.Control id='inputTask' name='inputTask' required></Form.Control>
        </Form>  
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn btn-dark' type='submit' form='taskform'>Comfirm</Button>
        <Button className='btn btn-dark' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

NewTaskForm.propTypes = {
    onHide: PropTypes.func.isRequired,
    addtask: PropTypes.func.isRequired,
}
export default NewTaskForm