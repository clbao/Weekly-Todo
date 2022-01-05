import React from 'react'

const Today = () => {
    const monthName = 
        ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const current = new Date();

    const month = monthName[current.getMonth()]; 
    const date = current.getDate();
    const year = current.getFullYear();

    return (
        <div>
            <h3>Today is {month} {date}, {year}</h3> 
        </div>
       
    )
}

export default Today;