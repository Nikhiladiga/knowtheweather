import React from 'react';
import './form.style.css';

const Form = (props)=> {
    return (
        <div className="container mb-3">
            <div>{props.error?error():null}</div>
            <form onSubmit={props.loadweather}>
                    <input type="text" className="form-control" name="city" autoComplete="off" placeholder="Enter a City Name"/>
                    <button className="btn btn-outline-success btn-block" onClick={props.showSection}>Submit</button>
            </form>
        </div>
    )
}

const error = ()=>{
    return(
        <div className="alert alert-danger mx-5" role="alert">Please enter a city</div>
    )
}

export default Form;