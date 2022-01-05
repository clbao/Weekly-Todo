import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const EditTaskForm = (props) => {
    const [editTask, setEditTask] = useState(props.task);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setEditTask({...editTask, [name]:value})
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!editTask.taskName ||
            (editTask.taskName === props.task.taskName && editTask.taskDescription === props.task.taskDescription)
            ) {
                return;        
            }
        props.editTask(editTask);
        props.handleClose();
    };
  
    return (
        <>         
        <Modal show={props.show} size='sm' centered>
            <div className='formBackground'>
            <Modal.Header>
                <Modal.Title className='test'><h4>Edit Task</h4></Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form 
                    // onSubmit={handleSubmit}
                >
                    <Form.Group controlId='nameInput' className='formGroup'>
                        <Form.Label> <h6>Task Name</h6> </Form.Label>
                        <Form.Control 
                            type='text' 
                            name='taskName' 
                            value = {editTask.taskName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId='descriptionInput' className='formGroup'>
                        <Form.Label> <h6>Description</h6> </Form.Label>
                        <Form.Control 
                            type='text' 
                            name='taskDescription'
                            value = {editTask.taskDescription}
                            onChange={handleInputChange}
                        />
                    </Form.Group>                    
                </Form>
            </Modal.Body>
            
            <Modal.Footer>
                <Button variant='secondary' onClick={props.handleClose}>
                Close
                </Button>
                <Button variant='success' onClick={handleSubmit}>
                Save Changes
                </Button>
            </Modal.Footer>
            </div>
        </Modal>
        
      </>
    );
}

export default EditTaskForm;