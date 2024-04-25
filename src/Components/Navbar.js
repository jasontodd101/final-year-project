import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loginContext from '../context/Login/LoginContext';

const Navbar = () => {
  const context = useContext(loginContext)
  const {role}=context
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("id")
    navigate('/role')
  }
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Cult Dsi Event</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Events">Events</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="Results">Results</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/About">About</Link>
              </li>

            </ul>

            {!localStorage.getItem("token")?<form className='d-flex'>
              <Link className="btn btn-outline-primary mx-1" to="/role" role="button">Login</Link>
              {localStorage.getItem('role')==='P'?<Link className="btn btn-outline-primary mx-1" to="/signup" role="button">Signup</Link>:null}
            </form>:<button onClick={handleLogout} className='btn btn-outline-primary'>Logout</button>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
