import React, { useContext, useEffect, useState } from 'react'
import Moment from 'moment';
import { useNavigate } from 'react-router-dom';
import reportContext from '../context/Report/ReportContext';

const Event = (props) => {
    const { PEvent, text, report, disabled, getSpecificResult,setevntID } = props;
    let navigate = useNavigate();
    const reportcontext = useContext(reportContext);
    const { getReport, getReportEvent } = reportcontext


    const handleClick = () => {
        if(localStorage.getItem('role') === 'F'&& PEvent.Result==0){
            setevntID(PEvent.E_ID)
            navigate('/createresult')
        }
        else{
        getSpecificResult(PEvent.E_ID)
        navigate("/Results")}

    }



    const handleReportClick = () => {
        if (localStorage.getItem('role') === 'SC' && PEvent.Report === 0) {
            getReportEvent(PEvent.E_ID)
            navigate('/createreport')
        } else {
            getReport(PEvent.E_ID)
            navigate("/Report")
        }
    }

    return (
        <div>
            <div className="card border_event" style={{ width: "80vw",marginBottom:"3em" }}>
                <div className="card-body my-2">
                    <div className="d-flex align-items-baseline">
                        <h5 className="card-title mx-2"><i className="bi bi-globe2"></i> {PEvent.EName}</h5>
                    </div>

                    <p className="card-text mx-2">{PEvent.Description} </p>
                    

                    <p className="card-text mx-2"><i className="bi bi-geo-alt-fill"></i>  {PEvent.Location} &emsp; <i className="bi bi-calendar"></i> {Moment(PEvent.Date).format('YYYY-MM-DD')} &emsp;
                    <i className="bi bi-clock-fill"></i> {PEvent.Time}  {localStorage.getItem('role') === 'F' && disabled ?
                            <button type="button" style={{ position: "absolute", right: "2em" }} onClick={() => { handleClick(); }} className="btn btn-outline-secondary" >Create Result</button> :
                            <button type='button' style={{ position: "absolute", right: "2em" }} onClick={() => { handleClick(); }} className="btn btn-outline-primary" disabled={disabled} >{text}</button>}
                            
                        {localStorage.getItem('role') === 'SC' && PEvent.Report === 0 ? <button type="button" style={{ position: "absolute", right: "11.5em" }} onClick={handleReportClick}
                            className="btn btn-outline-secondary">Create Report</button> : <button type="button" disabled={PEvent.Report === 0} style={{ position: "absolute", right: "11.5em" }} onClick={handleReportClick}
                                className="btn btn-primary">{report}</button>}</p>
                </div>
            </div>
        </div>
    )
}

const PastEvents = (props) => {

    const { results, events, getSpecificResult,setevntID } = props;

    let EventsArr = [];

    for (let pastEvt = 0; pastEvt < events.length; ++pastEvt) {
        let check = false;
        for (let result = 0; result < results.length; ++result) {
            if (events[pastEvt].E_ID === results[result].E_ID) {
                EventsArr.push(<Event setevntID={setevntID} text="View Result" report="View Report" key={events[pastEvt].E_ID} PEvent={events[pastEvt]} disabled={false} getSpecificResult={getSpecificResult} />);
                check = true;
                break;
            }
        }
        if (!check) EventsArr.push(<Event setevntID={setevntID} text="View Result" report="View Report" key={events[pastEvt].E_ID} PEvent={events[pastEvt]} disabled={true} getSpecificResult={getSpecificResult} />);
    }

    return (
        EventsArr.length > 0 ? EventsArr : <p>No past events</p>
    );
}

export default PastEvents
