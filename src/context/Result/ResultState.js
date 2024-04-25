import React, { useState } from 'react'

import resultContext from './ResultContext'


const ResultState = (props) => {
    const host="http://localhost:5000"
    const [results, setResults] = useState([])
    const [evntID, setevntID ] = useState()

    const getresults=async()=>{
        const response = await fetch(`${host}/api/result/getresult`, {
            method: 'GET', 
             headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem("token")
            },
          });
          const json= await response.json();
          setResults(json)
    }

    const getSpecificResult=async(id)=>{

        const response = await fetch(`${host}/api/result/getspecificresult/${id}`, {
            method: 'GET', 
             headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem("token")
            },
          });
          const json= await response.json();
          setResults(json)
       
    }

    const createResult=async (USN,E_ID,Marks) =>  {
        const response = await fetch(`${host}/api/result/createresult`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem("token")
          },
          body: JSON.stringify({USN,E_ID,Marks})
        });
        const json= await response.json();
        console.log(json)
      }

    return (
        <resultContext.Provider value={{results,getSpecificResult,getresults,createResult,setevntID,evntID}}>
            {props.children}
        </resultContext.Provider>

    )
}

export default ResultState
