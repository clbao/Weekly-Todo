import React from 'react';
import { Container } from 'react-bootstrap'; 

const Daily = ({currentTasks}) => {  
    return (
    <Container className='dailyBox'>    
        <h2>Daily Tasks</h2>
            <div className='dailyTasksBox '>
                {currentTasks?.map(task => 
                    <div className='dailyTask' key={task.taskId}>
                        <label className='dailyCheck'>
                            <input type='checkbox' id='taskDone'/>
                        </label>
                        <span className='dailyTaskText'>
                            <b><h5>{task.taskName}</h5></b>                             
                        </span>
                    </div>

                    
                )}
            </div>

    </Container>
    )
}

export default Daily;
