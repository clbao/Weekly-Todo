import React, { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap';

const Notepad = () => {
    const [currentNotes, setCurrentNotes] = useState('');

    const getNotes = () => {
        var notes = localStorage.getItem('notepad');  
        if(notes){
            notes = JSON.parse(notes);
        };
        return notes;        
    }

    const setNotes = (newNotes) => {
        localStorage.setItem('notepad', JSON.stringify(newNotes))
        setCurrentNotes(newNotes)
    }

    useEffect(() => {        
        setCurrentNotes(getNotes());
    }, [])

    const handleSubmit = (event) => {   
        event.preventDefault();           
        if (currentNotes === getNotes()) { 
            return
        };
        setNotes(currentNotes);
    }

    const handleInputChange = (event) => {        
        const {value} = event.target;        
        setCurrentNotes(value);         
    }


    return (
        <div className='noteBox'>            
            <Form onSubmit={handleSubmit}> 
                <Form.Group controlId='noteInput'>
                    <Form.Label className='notesTitleBox'>
                        <h2> Notes </h2>                         
                    </Form.Label>
                        <span className='saveButton' onClick={handleSubmit}>
                                <i className="fa fa-2x fa-regular fa-save text-white"/>
                        </span>

                        <div className='testtest'>                            
                            <span className="justified">
                                <textarea
                                    className = 'notePad'
                                    type='text'
                                    name='currentNotes'
                                    value={currentNotes || ''}
                                    onChange={handleInputChange}
                                />
                            </span>

                        </div>


                </Form.Group>
            </Form>
        </div>
    )
}

export default Notepad;