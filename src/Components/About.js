import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const About = () => {
    let navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token'))
            navigate('/role');
    }, [])
    return (
        <div className='container my-3'>
            <h2 style={{ display: "flex", justifyContent: "center",textDecoration:"underline" }}>About Us</h2>
            <p style={{ display: "flex", justifyContent: "center",marginTop:"2em" }}>The Steigen event of Information Science and Engineering
                Department of Acharya Institute of technology is a student forum activity incorporated by the college and
                the ISE faculty to provide students exposure to the multiple activities that bring all around development
                of the students. It provides plethora of opportunities for the students to participate among the each other
                and work in a competitive environment to develop Essential skills for IT industry. Every Thursday there are
                various activities like hackathon , webinars , seminars etc for the students to develop skill. </p>
            <p>One thing that makes the event easy is for students to participate in a forum develop skills and get
                certificates from the department of ISE which gives your profie a better opportunity for the success!</p>
        </div>
    )
}

export default About
