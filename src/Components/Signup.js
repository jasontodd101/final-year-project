import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:"",Phone:"",USN:"",Sex:"",Branch:"",Sem:""})
    let navigate =useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({PName:credentials.name,USN:credentials.USN,Phone:credentials.Phone,Sex:credentials.Sex,Branch:credentials.Branch,Sem:credentials.Sem ,Email:credentials.email,Password:credentials.password})
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
            //redirect
            localStorage.setItem('token',json.authToken)
            props.showAlert("Account created successfully!!","success")
            navigate('/')
        }
        else{
            props.showAlert("User Already exist","danger")
        }
    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div className='form_sign'>
            <div className="my-3" className='border_sign' style={{padding:"2em"}}>
                <h1>Sign Up</h1>
            
            <form onSubmit={handleSubmit} style={{width:"40em"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <div className="mb-3" style={{width:"45%"}}>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3" style={{width:"45%"}}>
                    <label htmlFor="USN" className="form-label">USN</label>
                    <input type="text" className="form-control" id="USN" name='USN' onChange={onChange} aria-describedby="emailHelp"/>
                </div></div>
                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div><div style={{display:"flex",justifyContent:"space-between"}}>
                <div className="mb-3" style={{width:"45%"}}>
                    <label htmlFor="Phone" className="form-label">Phone No</label>
                    <input type="text" className="form-control" id="Phone" name='Phone' onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3" style={{width:"45%"}}>
                    <label htmlFor="Sex" className="form-label">Sex</label>
                    <input type="text" className="form-control" id="Sex" name='Sex' onChange={onChange} aria-describedby="emailHelp"/>
                </div></div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                <div className="mb-3"  style={{width:"45%"}} >
                    <label htmlFor="Branch" className="form-label">Branch</label>
                    <input type="text" className="form-control" id="Branch" name='Branch' onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3" style={{width:"45%"}}>
                    <label htmlFor="Sem" className="form-label">Sem</label>
                    <input type="text" className="form-control" id="Sem" name='Sem' onChange={onChange} aria-describedby="emailHelp"/>
                </div></div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={6} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={6} required/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        </div>

    )
}

export default Signup
