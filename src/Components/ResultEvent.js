import React from 'react'
import ResultItem from './ResultItem'

const ResultEvent = (props) => {
    const {result}=props
    let keys=0;
    return (
        <div className='container my-3'>
     
        <table className="table" style={{marginTop:"3em"}} >
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Event Name</th>
            <th scope="col">USN</th>
            <th scope="col">Name</th>
            <th scope="col">Branch</th>
            <th scope="col">Sem</th>
            <th scope="col">Marks</th>
          </tr>
        </thead>
        <tbody>
        {result.map((resultitem)=>{
           return <ResultItem rank={keys} key={keys++} resultitem={resultitem}/>})}
        </tbody>
        </table>
     
     </div>
    )
}

export default ResultEvent
