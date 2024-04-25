import React, { useContext, useState } from 'react'
import resultContext from '../context/Result/ResultContext'


const CreateResult = (props) => {
    const context = useContext(resultContext)
    const {createResult,evntID}=context
    const [result, setResult] = useState({USN:"",Marks:""})
    const handleClick=(e)=>{
        e.preventDefault();
        createResult(result.USN,evntID,result.Marks)
        props.showAlert("Result Created Successfully","success")
        setResult({USN:"",Marks:""})
    }

    const onChange=(e)=>{
        setResult({...result,[e.target.name]:e.target.value})
    }
    return (
        <form className='container my-3' style={{width:"20em"}}>
            <div className="form-group">
                <label  htmlFor="USN">USN</label>
                <input type="text" onChange={onChange} value={result.USN} name='USN' className="form-control" id="USN" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label htmlFor="Marks">Marks</label>
                <input type="text" onChange={onChange} value={result.Marks} name='Marks' className="form-control" id="Marks" />
            </div>
           
            <button type="submit" onClick={handleClick} className="btn btn-primary my-2">Submit</button>
        </form>
    )
}

export default CreateResult
