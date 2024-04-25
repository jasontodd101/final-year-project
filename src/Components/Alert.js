import React from 'react'
import { useLocation } from 'react-router-dom';

function Alert(props) {
    let location = useLocation();
    const capitalize = (word)=>{
        if(word==="danger"){
            word="Error"
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={location.pathname!=="/"?{height: '2.5em',marginTop:"3em"}:{height:"0px",marginTop:"3.5em"}}>
        {props.alert && <div className={`alert  alert-${props.alert.type} alert-dismissible fade show`} role="alert">
           <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg} 
        </div>}
        </div>
    )
}

export default Alert