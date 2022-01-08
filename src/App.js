import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import { Row, Col, Container } from 'react-bootstrap';
import { defaultTasksData, defaultWeekData } from './initialData';
import AddTaskForm from './AddTaskForm';
import Notepad from './Notepad';
import Daily from './Daily';
import styled from 'styled-components';
import './App.css'
import Today from './Today';

const Week = styled.div`
    width = 100vw;
    display: fixed;
    flex-direction: row;
`;

const Days = styled.div`
    border-radius: 30px 30px 5px 5px; 
    border: 4px solid #E0EFD1;
    min-height: 500px;
    width: 300px;

    display: flex;
    flex-direction: column;
`;

const TaskList = styled.div`
    padding: 10px;
    opacity: 0.76;
    background-color: #E0EFD1;
    flex-grow: 1;
`;

const App = () => {   
    // set initial tasksData and weekData       
    const [columns, setColumns] = useState([]);
    const [tasks, setTasks] = useState(null);
    const [currentTasks, setCurrentTasks] = useState([]);

    const getTasksData = () => {
        if (!localStorage.getItem('tasksData')) {
            localStorage.setItem('tasksData', JSON.stringify(defaultTasksData))
        }
        var tasksData = JSON.parse(localStorage.getItem('tasksData'));
        return tasksData;        
    }

    const getWeekData = () => {
        if (!localStorage.getItem('weekData')) {
            localStorage.setItem('weekData', JSON.stringify(defaultWeekData))
        }
        var weekData = JSON.parse(localStorage.getItem('weekData'));
        return weekData;
    }
    useEffect(() => {    
        setTasks(getTasksData());        
        setColumns(getWeekData());
        populateCurrentTasks();
    }, [])

    // get taskId as prop
    const getTask = (taskId) => {
        var tasksData = getTasksData();
        return tasksData[taskId];
    }

    // updating weekData and tasksData local storage
    const updateWeekData = (updateWeek) => {
        localStorage.setItem('weekData', JSON.stringify(updateWeek));
        setColumns(updateWeek)
    }

    const updateTasksData = (updateTasks) => {
        localStorage.setItem('tasksData', JSON.stringify(updateTasks));   
        setTasks(updateTasks);

        
    }

    const addTask = (task, dueDate) => {
        // newTask data
        const taskNum = Object.keys(tasks).length+1;
        var newId = 'task-' + taskNum.toString(); 

        var newTask = {
            taskId: newId,
            taskName: task.taskName, 
            taskDescription: task.taskDescription
        };
        var tasksData = getTasksData();

        // update tasksData
        tasksData[newTask.taskId] = newTask;    

        updateTasksData(tasksData)

        // update columns, putting newTask in correct column
        var newColumns = columns.slice();
        var idx = 0;
        switch(dueDate) {
            case 'Sunday' : idx = 0; break;
            case 'Monday' : idx = 1; break;
            case 'Tueday' : idx = 2; break;
            case 'Wednesday' : idx = 3; break;
            case 'Thursday' : idx = 4; break;
            case 'Friday' : idx = 5; break;
            case 'Saturday' : idx = 6; break;
        }
        var item = newColumns[idx];
        item.taskIds.push(newTask.taskId);

        updateWeekData(newColumns);

        populateCurrentTasks();
           
    };

    const editTask = (task) => {
        // update editedTask in tasksData
        var tasksData = getTasksData();
        delete tasksData[task.taskId];        
        tasksData[task.taskId] = task;

        updateTasksData(tasksData)

        // update editedTask in weekData
        var newColumns = columns.slice(); 

        updateWeekData(newColumns);

        populateCurrentTasks();
    }

    const removeTask = (task, weekId, index) => {      
        // remove task in tasksData  
        var tasksData = getTasksData();        
        delete tasksData[task.taskId];
        updateTasksData(tasksData)         

        // remove task in weekData  
        var newColumns = columns.slice();
        var column = newColumns[weekId];
        column.taskIds.splice(index, 1);

        updateWeekData(newColumns);

        populateCurrentTasks();
                   
    }

    const populateCurrentTasks = () => {
        var dateObj = new Date();
        var weekDateNum = dateObj.getDay();

        var newTasks = [];   
        var tasksData = getTasksData();    
        var weekData = getWeekData();
        if(weekData.length >0) {   
            var taskIds = weekData[weekDateNum].taskIds;
            taskIds.forEach((taskId, idx) => {
                newTasks.push(tasksData[taskId]);
            })        
        } 
        setCurrentTasks(newTasks);
    }

    // for beautiful dnd
    const onDragEnd = result => {
        const {destination, source, draggableId}  = result;
        
        // no movement
        if (!destination) {
          return;
        }
        
        if (
          destination.droppableId === source.droppableId && 
          destination.index === source.index
        ) {
          return;
        }

        const start = columns[source.droppableId];
        const finish = columns[destination.droppableId];

        // movement within the same colomn
        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);

            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);                      
            
            var newColumns = [];
            for(var i=0; i<columns.length; i++){
                if (i.toString() === source.droppableId){
                    const newColumn = {
                        ...start,
                        taskIds: newTaskIds,
                    } 
                    newColumns.push(newColumn);        
                }
                else {
                    newColumns.push(columns[i]);
                }
            }

            updateWeekData(newColumns);
        
        // movement within the different colomn
        }else{
            const startTaskIds = Array.from(start.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStart = {
                ...start,
                taskIds : startTaskIds,
            }            
            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId)
            const newFinish = {
                ...finish,
                taskIds: finishTaskIds,
            }            
            var newColumns = [];
            for(let i=0; i<columns.length; i++){
                if(i.toString() === source.droppableId) {
                    newColumns.push(newStart);
                }
                else if(i.toString() === destination.droppableId){
                    newColumns.push(newFinish);
                }
                else{
                    newColumns.push(columns[i]);
                }
            }
            updateWeekData(newColumns);          
        }
        populateCurrentTasks();
      };

    return (                
        <Week>            
            <Container className='weekRow'> 
                <div className='titleBox'>
                    <Today/>
                    <h1> Weekly To-Do</h1> 
                </div>


                <div className='weekTodo'>     
                <DragDropContext onDragEnd={onDragEnd}>        
                    {columns?.map((day) =>
                    <Days key={day.weekId}>                       
                        <span className='dayTitle'>
                            <h4>{day.weekTitle}</h4>
                        </span>
                            <Droppable droppableId={day.weekId.toString()}>
                                {(provided) => (
                                <TaskList
                                    ref={provided.innerRef} 
                                    {...provided.droppableProps}
                                >
                                    {day.taskIds.slice()
                                    .map((taskId, index) =>                                 
                                    <Task 
                                        key={taskId} 
                                        task={getTask(taskId)} 
                                        index={index} 
                                        week={day.weekId}

                                        removeTask={removeTask}
                                        editTask={editTask}/>                                
                                    )
                                    }
                                    {provided.placeholder}
                                </TaskList>)}
                            </Droppable>          
                    </Days>)}        
                </DragDropContext>   
                </div> 
                
                <Row className='sample'>
                  <Col>
                    <AddTaskForm addTask={addTask} /> 
                  </Col>

                  <Col>
                    <div className='aboutMe' >
                      <b><p>Made by Christine Bao</p></b>

                      <div className='aboutLinks' >
                        <a className='aboutIcon' href='https://github.com/clbao/Weekly-Todo' target="_blank">
                          <i class="fa fa-2x fa-github"></i> 
                        </a>

                        <a className='aboutIcon' href='https://www.linkedin.com/in/clbao/' target="_blank">
                          <i class="fa fa-2x fa-linkedin-square"></i>
                        </a>       
                          
                      </div>
                      
                    </div>

                  </Col>
                  

                  
                </Row>

            </Container>  

            <Container className='agenda'>
                <Notepad/>
                <Daily currentTasks={currentTasks}/>
            </Container>         

        </Week>
    )
};

export default App;