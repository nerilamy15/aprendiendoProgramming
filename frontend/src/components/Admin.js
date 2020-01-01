import React,{useState,useEffect} from "react"
import {Redirect} from "react-router-dom";
import axios from "axios";

const Admin = (props) => {

 //////////////////////////////////////////////
const [temp1 , setTemp1] = useState("0");
const [temp2 , setTemp2] = useState("0");
const [errors, setErrors] = useState("");
const [success, setSuccess] = useState("");
/////////////////////////////////////////////////
///////////////////////////////////////////////////
const onSubmit = async (e) => {
    e.preventDefault();
    try{
        const data = await axios.post('http://localhost:5001/admin', {
        temperature: temp2
        },{
        headers : {"auth-token" : token}
    });
        console.log(data);
        setSuccess(data.data)
        setTemp1("");
        setTemp2("");
        setErrors("");
    }catch(err){
        console.log(err.response)
        setErrors(err.response.data)
    }
}
//////////////////////////////////////////////////////////////////
    const converter = () => {
       let tempConverted = temp1 * 9/5 +32;
       console.log(tempConverted);
       setTemp2(tempConverted)
    };
////////////////////////////////////////////////////////////////
    useEffect(() => {
        converter()
    },[temp1])
//////////////////////////////////////////////////////////////////
    const role = window.localStorage.getItem("role");
    const token = window.localStorage.getItem("token");
///////////////////////////////////////////////////////////////////
    const errorMessage = <div class="alert alert-danger" role="alert">
                            {errors}
                        </div>
    const successMessage = <div class="alert alert-success" role="alert">
                                {success}
                            </div>

//////////////////////////////////////////////////////////////////////// 
const test = () => {
    if(errors) {
       return errorMessage
    }
    else if(success){
        return successMessage
    }else {
        return null
    }
}

////////////////////////////////////////////////////////////////////////
    return(
        role !== "admin" ? <Redirect to ="/user"/> : 
        <>
            <h1 className="text-center">Admin Page</h1>
            <h2 className="text-center mb-5">Temperature</h2>
            <div className="container d-flex justify-content-center flex-column">
                <form onSubmit={onSubmit}>
                    <div className="form-group">  
                        <label>Celsius</label>
                        <input onChange={e => setTemp1(e.target.value)} className="form-control" type="number" name="celcius" value={temp1}></input>
                    </div>
                
                    <div className="form-group"> 
                        <label>Fahrenheit</label>
                        <input onChange={e => setTemp2(e.target.value)} className="form-control" type="number" name="celcius" value={temp2}></input>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-lg" type="submit">Submit</button>
                    </div>
                </form>
                   {test()}
            </div>

        </>
    )
}


export default Admin