import React, { useState } from 'react'
import resultContext from './ReportContext'

const ReportState = (props) => {

  const [reportevnt, setReportevnt] = useState()

  const getReportEvent=(id)=>{
    setReportevnt(id)
  }

    const reportInitial=[
        {
            E_ID: null, Report: '', USN: ''
        }
    ]
    const [reports, setReport] = useState(reportInitial)
    const host="http://localhost:5000"
    const getReport= async(id)=>{

        const response = await fetch(`${host}/api/report/getreport/${id}`, {
            method: 'GET', 
             headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem("token")
            },
          });
          const json= await response.json();
          setReport(json)
    }

    const createReport=async (E_ID,Report) =>  {
      console.log(E_ID+" "+Report)
      const response = await fetch(`${host}/api/report/createreport`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({E_ID,Report})
      });
      const json= await response.json();
      console.log(json)
    }

    
    return (
       <resultContext.Provider value={{reports,getReport,createReport,getReportEvent,reportevnt}}>
        {props.children}
      </resultContext.Provider>
    
    )
}

export default ReportState
