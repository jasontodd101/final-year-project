import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import eventContext from '../context/events/EventContext';

const Home = () => {
    const context = useContext(eventContext)
    const {getEvents,getparticipantevents}=context
    let navigate=useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('token'))
        navigate('/role');
        else{
            getEvents()
            getparticipantevents()
        }
    }, [])
    return (
        <>
        <img src="https://www.admissioninbangalore.in/wp-content/uploads/2019/08/ait-1200x675.jpg" style={{ height: "500px", display:"absolute", width:"100%" }} />
        <div className="container" style={{marginTop:"3rem"}}>
    
            <h1 className='my-2'>What We Organize</h1>
            <div className="card-group my-3">
                <div className="card mx-2">
                    <img src="https://media.istockphoto.com/photos/man-hand-on-table-business-coffee-split-tone-picture-id1172074163?k=20&m=1172074163&s=612x612&w=0&h=IHQ5f0J8Vuqx-R2Kcc7RLKrd5FsGoGgm2eE6RBdF548=" style={{ height: "200px" }} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Webinars</h5>
                        <p className="card-text">Webinars for the young minds , where the professors alumni and other enthusiastic person's from the industry share their experience and enrich the young minds.</p>

                    </div>
                </div>
                <div className="card mx-2">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg8onOMW-TY_T5JOh8JiRWIIpFHy10EY6I4g&usqp=CAU" style={{ height: "200px" }} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Seminars</h5>
                        <p className="card-text">Seminars has the function of bringing together small groups for recurring meetings, focusing each time on some particular subject, in which everyone present is requested to participate.</p>

                    </div>
                </div>
                <div className="card mx-2 ">
                    <img src="https://www.logic-square.com/contest-banner.jpg" style={{ height: "200px" }} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Coding Contests</h5>
                        <p className="card-text">Wanna know how good you are in coding? Well the easiest way to do this is join the coding contest in our department . Perks are you'll get certificate if you are a winner.</p>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home
