import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    let navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('role'))
            navigate("/role")
    }, [])
    const [credentials, setCredentials] = useState({ id: "", Password: "" })


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ [localStorage.getItem('id')]: credentials.id, Password: credentials.Password, UserType: localStorage.getItem('role') })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            //redirect
            localStorage.setItem("token", json.authToken)
            props.showAlert("Welcome Back!!", "success")
            navigate('/')
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='form_sign'>
            <div className='border_sign' style={{ padding: "2em" }}>
                <h1 >Log In to continue</h1>


                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">{localStorage.getItem('id')}</label>
                        <input type="id" className="form-control" id="id" onChange={onChange} value={credentials.id} name="id" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input type="Password" className="form-control" id="Password" onChange={onChange} value={credentials.Password} name='Password' />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: "100%" }} >Submit</button>
                </form></div>
        </div>)
}

export default Login
