import React, { useState } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Container, Button, Modal } from 'react-bootstrap';
import EditTaskForm from './EditTaskForm';

const TaskContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 10px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  min-height: 30px;

  display: flex;
`;

const Task = (props) => {
    // state for Modal Button
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRemove = (event) => {
        event.preventDefault();
        props.removeTask(props.task, props.week, props.index);
    }

    return (        
        <>
        <Draggable draggableId={props.task.taskId} index={props.index}>
            {(provided) => (
                <TaskContainer   
                    ref={provided.innerRef} 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >   
                    <div className='taskBox'>
                        <div className='taskIcons'>
                            <span className='editButton' onClick={handleShow}>
                                <i className='fa fa-edit text-white' ></i>
                            </span>
                            <span className='iconSpace'/>
                            <span className='deleteButton'>
                                <i className="fa fa-trash text-white" onClick={handleRemove}></i> 
                            </span>                            
                        </div>

                        <b><p>{props.task.taskName}</p></b>
                        <hr className='taskDivider'/>
                        <div>
                            <p>{props.task.taskDescription}</p>
                        </div>

                    </div>                                  
                </TaskContainer>
            )}            
        </Draggable>

        {show===true && 
            <EditTaskForm task={props.task} show={show} handleClose={handleClose} editTask={props.editTask}/>
        }        
        </>
    )

};

export default Task;