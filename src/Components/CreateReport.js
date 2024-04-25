import React, { useContext, useState } from 'react'
import reportContext from '../context/Report/ReportContext'

const CreateReport = (props) => {
    const context = useContext(reportContext)
    const {createReport,reportevnt}=context
    const {showAlert}=props
    const handleOnChange=(event)=>{
        setText(event.target.value)
    }

    const handleClick=(e)=>{
        e.preventDefault()
        createReport(reportevnt,text)
        showAlert("Report created Successfully","success")
    }

    const [text,setText]=useState('');
    return (
        <form className='container' style={{marginTop:"2em"}}>
           <header ><h1>Create Report</h1></header>
            <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
            <button type="submit" onClick={handleClick} className="btn btn-primary my-3">Submit</button>
        </form>
    )
}

export default CreateReport
