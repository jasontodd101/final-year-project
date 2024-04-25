import React, { useContext, useState } from 'react'
import loginContext from './LoginContext'

const LoginState = (props) => {
    const [role, setRole] = useState('')
    let roleFunc=(r)=>{
        setRole(r)
      }
      const [id, setId] = useState('')
    let idFunc=(r)=>{
        setId(r)
      }
    return (
        <loginContext.Provider value={{roleFunc,role,idFunc,id }}>
        {props.children}
      </loginContext.Provider>
    )
}

export default LoginState
