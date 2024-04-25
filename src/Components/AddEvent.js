import React, { useContext, useEffect, useState } from 'react'
import eventContext from '../context/events/EventContext'

const AddEvent = (props) => {
    const context = useContext(eventContext)
    const { addEvent } = context
    const [event, setEvent] = useState({EName:"",Location:"",Date:"",Time:"",Description:""})
    const handleClick=(e)=>{
        e.preventDefault();
        addEvent(event.EName,event.Location,event.Date,event.Time,event.Description)
        props.showAlert("Added Successfully","success")
        setEvent({EName:"",Location:"",Date:"",Time:"",Description:""})
    }

    const onChange=(e)=>{
        setEvent({...event,[e.target.name]:e.target.value})
    }
    
    return (
        
        <div>
            <form>
                <h2>Create an Event</h2>
                <div className="mb-3">
                    <label htmlFor="EName" className="form-label">Event Name</label>
                    <input type="text" className="form-control" id="EName" name="EName" value={event.EName} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="Description" name="Description" value={event.Description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Location" className="form-label">Location</label>
                    <input type="text" className="form-control" id="Location" name="Location" value={event.Location} onChange={onChange} required />
                </div> <div style={{display:"flex"}}>
                <div className="mb-3" style={{marginRight:"5em"}}>
                    <label htmlFor="Date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="Date" name="Date" value={event.Date} onChange={onChange} required />
                    
                </div>
                <div className="mb-3">
                <label htmlFor="Time" className="form-label">Time</label>
                <input type="time" className="form-control" id="Time" name="Time" value={event.Time} onChange={onChange} required />
                </div></div>
                <button disabled={event.EName.length<5 || event.Description.length<5 || event.Location.length<1 } type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddEvent
