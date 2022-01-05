import React, { useState } from 'react';
import { Modal, Form, Button, Container } from 'react-bootstrap';

const AddTaskForm = (props) => {
    // state for Modal Button
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // state for Adding New Task
    const initFormState = {id: '0', taskName: '', taskDescription: '' };
    const [dueDate, setDueDate] = useState('Sunday');
    const [task, setTask] = useState(initFormState);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setTask({...task, [name]: value}, dueDate)
    };

    const handleDueDateChange = (event) => {
        const {value} = event.target;
        setDueDate(value);
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!task.taskName) return;
        var newTask = {
            taskName: task.taskName,
            taskDescription: task.taskDescription
        }
        props.addTask(newTask, dueDate);
        handleClose();
        setDueDate('Sunday');
        setTask(initFormState);
    };
  
    return (
      <div>
        <Container className='addButtonBorder'>
            <Button variant='success' size='lg' onClick={handleShow}>
                <h3>Add Task</h3> 
            </Button>  
        </Container>

        <Modal show={show} onHide={handleClose} size='sm' centered>
            <div className='formBackground'>
            <Modal.Header >
                <Modal.Title className='test'><h4>New Task</h4></Modal.Title>
            </Modal.Header>

            <Modal.Body >
                <Form 
                    onSubmit={handleSubmit}
                >
                    <Form.Group controlId='nameInput' className='formGroup'>
                        <Form.Label> <h6>Task Name</h6> </Form.Label>
                        <Form.Control 
                            type='text' 
                            name='taskName' 
                            value={task.taskName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId='descriptionInput' className='formGroup'>
                        <Form.Label> <h6>Description</h6>  </Form.Label>
                        <Form.Control 
                            row={3}
                            type='text' 
                            name='taskDescription' 
                            value={task.taskDescription}
                            onChange={handleInputChange}
                        />

                    </Form.Group>

                    <Form.Group controlId='dayInput' className='formGroup'>
                        <Form.Label> <h6>DueDate </h6></Form.Label>
                        <Form.Control as='select' value={dueDate} name='dueDate' onChange={handleDueDateChange}>
                        <option> Sunday </option>
                        <option> Monday </option>
                        <option> Tueday </option>
                        <option> Wednesday </option>
                        <option> Thursday </option>
                        <option> Friday </option>
                        <option> Saturday </option>
                        </Form.Control>
                    </Form.Group>
                    
                </Form>

            </Modal.Body>
            
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                Close
                </Button>
                <Button variant='success' onClick={handleSubmit}>
                Save Changes
                </Button>
            </Modal.Footer>
            </div>
        </Modal>
      </div>
    );
}

export default AddTaskForm;