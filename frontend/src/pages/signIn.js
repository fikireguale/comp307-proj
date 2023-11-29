import React from "react";
import { useNavigate } from "react-router-dom";


const SignIn = () =>{
    const navigate = useNavigate(); //navigate function
    const redirectToRegistration = () =>{
        navigate('/Registration');
    }
    return (
        <div className="signIn" >
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
            <div className="circle4"></div>
            <div className="circle5"></div>
            <div className="form-inside-circle">
                <h3>Please enter your username and password</h3>
            </div>
            <div className="buttons">
                <button>Sign In</button>
                {/*In case someone is not sure that they don't have the account*/}
                <button onClick={redirectToRegistration}>Sign Up</button>
            </div>
           


        </div>
    );
   


};

export default SignIn;