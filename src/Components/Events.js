import moment from 'moment'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import eventContext from '../context/events/EventContext'
import resultContext from '../context/Result/ResultContext'
import AddEvent from './AddEvent'
import PastEvents from './PastEvents'
import UpcomingEvents from './UpcomingEvents'


const Events = (props) => {
    const eventcontext = useContext(eventContext)
    const { upcoming, past, getEvents, getparticipantevents, pevents,editEvent } = eventcontext
    const resultcontext = useContext(resultContext)
    const { getSpecificResult, results, getresults,setevntID } = resultcontext
    const { showAlert } = props

    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getEvents()
            getresults()
            getparticipantevents()
        }
        else
            navigate('/role');
    }, [])

    const [event, setEvent] = useState({id:"",eEName:"",eLocation:"",eDate:"",eTime:"",eDescription:""})
    const ref = useRef(null)
    const refClose = useRef(null)
    
    const updateEvent = (currentEvent) => {
        ref.current.click()
        const date=moment(currentEvent.Date).format("DD-MM-YYYY")
        setEvent({ id: currentEvent.E_ID, eEName: currentEvent.EName, eLocation: currentEvent.Location, eDate:date  , eTime:currentEvent.Time,eDescription:currentEvent.Description })
    }
    const handleClick = (e) => {
        editEvent(event.id,event.eEName,event.eDescription,event.eLocation,event.eTime,event.eDate)
        showAlert("Updated Successfully","success")
        refClose.current.click()
    }

    const onChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value })
    }

    return (

        <div className='container my-3'>
            {localStorage.getItem('role') == 'SC' ? <AddEvent showAlert={showAlert} /> : null}

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade"  id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" >
                    <div className="modal-content" >
                        <div className="modal-header" style={{marginLeft:"2em",marginRight:"2em"}}  >
                            <h5 className="modal-title" id="exampleModalLabel">Update Event</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="mb-3" style={{marginLeft:"2em",marginRight:"2em"}}>
                            <label htmlFor="eEName" className="form-label">Event Name</label>
                            <input type="text" className="form-control" id="eEName" name="eEName" value={event.eEName} onChange={onChange} minLength={5} required />
                        </div>
                        <div className="mb-3" style={{marginLeft:"2em",marginRight:"2em"}}>
                            <label htmlFor="eDescription" className="form-label">Description</label>
                            <input type="text" className="form-control" id="eDescription" name="eDescription" value={event.eDescription} onChange={onChange} minLength={5} required />
                        </div>
                        <div className="mb-3" style={{marginLeft:"2em",marginRight:"2em"}}>
                            <label htmlFor="eLocation" className="form-label">Location</label>
                            <input type="text" className="form-control" id="eLocation" name="eLocation" value={event.eLocation} onChange={onChange} required />
                        </div> <div style={{ display: "flex", marginLeft:"2em", marginRight:"2em" }}>
                            <div className="mb-3" style={{ marginRight: "5em" }}>
                                <label htmlFor="eDate" className="form-label">Date</label>
                                <input type="date" className="form-control" id="eDate" name="eDate" value={event.eDate} onChange={onChange} required />

                            </div>
                            <div className="mb-3" style={{marginLeft:"2em",marginRight:"2em"}}>
                                <label htmlFor="eTime" className="form-label">Time</label>
                                <input type="time" className="form-control" id="eTime" name="eTime" value={event.eTime} onChange={onChange} required />
                            </div></div>
                        <div className="modal-footer" style={{marginLeft:"2em",marginRight:"2em"}}>
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  onClick={handleClick} type="button" className="btn btn-primary">Update event</button>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className='my-3'>Upcoming Events</h2>
            <UpcomingEvents showAlert={showAlert} pevents={pevents} updateEvent={updateEvent} events={upcoming} />
            {/* {upcoming.length>0?upcoming.map((USEvent)=>{
                return <UpcomingEvents text="Register"   report="" key={USEvent.E_ID} USEvent={USEvent} />
            }):<p>No upcoming events</p>} */}
            <div style={{borderBottom:"2px solid black"}}></div>


            <h2 style={{marginTop:"3em"}}>Past Events</h2>
            <PastEvents results={results}  events={past} getSpecificResult={getSpecificResult} setevntID={setevntID}/>
        </div>
    )
}

export default Events
