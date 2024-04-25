import React from 'react'
import { useNavigate } from 'react-router-dom'


const LoginType = () => {
    const navigate = useNavigate();
    const handleFaculty = () => {
        localStorage.setItem('role', 'F')
        localStorage.setItem('id', 'SSN')
        navigate("/signin")
    }
    const handleParticipants = () => {
        localStorage.setItem('role', 'P')
        localStorage.setItem('id', 'USN')
        console.log(localStorage.getItem('role'))
        navigate("/signin")
    }
    const handleSC = () => {
        localStorage.setItem('role', 'SC')
        localStorage.setItem('id', 'USN')
        navigate("/signin")
    }
    return (
        <div className='container' style={{ marginTop: "3em", width: "50vw"}}>
            <h1 style={{display:"flex", justifyContent:"center"}}>I am a...</h1>
            <div style={{ display: "flex", justifyContent: "space-between",height:"18em" }}>
                <button onClick={handleFaculty} style={{ width: "33%",height:"100%" }} type="button" className="btn btn-light"><img style={{ width: "100%",height:"80%" }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSlzile_cq7nePEYV6WXg9fVTdEw9-xCZ7rn9AsYyc8j7XMK3xUaS15gfbFMYXbnQl0sg&usqp=CAU' /><br />Faculty</button>
                <button onClick={handleParticipants} style={{ width: "33%",height:"100%" }} type="button" className="btn btn-light"><img style={{ width: "100%",height:"80%" }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBv3rw1j2p-pE8fKZerdiQK8z0WKFII9W0iA&usqp=CAU' /><br />Participant</button>
                <button onClick={handleSC} type="button" style={{ width: "33%",height:"100%" }} className="btn btn-light"><img style={{ width: "100%",height:"80%" }} src='https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/16/2021/05/event-risk-assessment.png' /> Student Coordinator</button>
            </div>
        </div>
    )
}

export default LoginType
