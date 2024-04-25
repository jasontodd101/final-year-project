import React, { useContext, useEffect, useState } from 'react'
import eventContext from '../context/events/EventContext'
import { useNavigate } from 'react-router-dom'
import Moment from 'moment'


const UEvent = (props) => {
    let navigate = useNavigate();
    const eventcontext = useContext(eventContext)
    const { deleteEvent, confirmEvent, register } = eventcontext

    const { USEvent, text, disabled, updateEvent, showAlert } = props
    const [disable, setDisable] = useState(disabled)
    const [textAlter, setTextAlter] = useState(text)
    const [confirmed, setConfirmed] = useState(false)

    const handleClick = (e) => {
        // e.preventDefault();
        showAlert("Registered Successfully", "success")
        setTextAlter("Registered")
        setDisable(true)
        register(USEvent.E_ID)
    }
    const handleConfirmClick = (e) => {
        // e.preventDefault();
        // console.log(USEvent.E_ID)
        showAlert("Event Approved", "success")
        setConfirmed(true)
        confirmEvent(USEvent.E_ID)
    }


    return (
        <div >
            <div className="card border_event" style={{ width: "80vw", marginBottom: "3em" }}>
                <div className="card-body my-2">
                    <div className="d-flex align-items-baseline">
                        <h5 className="card-title mx-2"><i className="bi bi-globe2"></i> {USEvent.EName}</h5>
                        {localStorage.getItem('role') === 'SC' ? <i className="fas fa-edit mx-2" onClick={() => { updateEvent(USEvent) }}
                            style={{ position: "absolute", right: "5em", cursor: "pointer" }}></i> : null}
                        {localStorage.getItem('role') !== 'P' ? <i className="fas fa-trash-alt mx-2" onClick={() => { deleteEvent(USEvent.E_ID); showAlert("Deleted Successfully", "danger") }} style={{ position: "absolute", right: "2em", cursor: "pointer" }}></i> : null}
                    </div>

                    <p className="card-text mx-2">{USEvent.Description} </p>

                    <p className="card-text mx-2"><i className="bi bi-geo-alt-fill"></i> {USEvent.Location} &emsp; <i className="bi bi-calendar"></i> {Moment(USEvent.Date).format('YYYY-MM-DD')} &emsp; <i className="bi bi-clock-fill"></i> {USEvent.Time}
                        {localStorage.getItem("role") === 'P' ? <button type="button" style={{ position: "absolute", right: "2em" }} disabled={disable} onClick={() => { handleClick(); }} className="btn btn-outline-success">{textAlter}</button> :
                            localStorage.getItem('role') === 'F' && USEvent.Status === 0 ? <button type="button" style={{ position: "absolute", right: "2em" }} disabled={confirmed} onClick={() => { handleConfirmClick(); }} className="btn btn-outline-success">Confirm</button> : null}
                    </p>
                </div>
            </div>
        </div>
    )
}



const UpcomingEvents = (props) => {
    const { pevents, events, updateEvent, showAlert } = props


    let Eventarr = []

    for (let index = 0; index < events.length; index++) {
        const upcomingEvt = events[index];
        let count = true
        for (let pevent = 0; pevent < pevents.length; pevent++) {
            const element = pevents[pevent];
            if (upcomingEvt.E_ID === element.E_ID) {
                Eventarr.push(<UEvent disabled={true} showAlert={showAlert} updateEvent={updateEvent} USEvent={upcomingEvt} key={upcomingEvt.E_ID} text="Registered" />)
                count = false;
                break;
            }
        }
        if (count)
            Eventarr.push(<UEvent disabled={false} showAlert={showAlert} updateEvent={updateEvent} USEvent={upcomingEvt} key={upcomingEvt.E_ID} text="Register" />)
    }

    return (
        Eventarr.length > 0 ? Eventarr : <p>No upcoming Events</p>
    )

}


export default UpcomingEvents
