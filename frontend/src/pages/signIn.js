import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Helmet} from "react-helmet";

const SignIn = () =>{
    const navigate = useNavigate(); //navigate function

    const redirectToRegistration = () =>{
        navigate('/Registration');
    }

    const [data, setData] = useState({
        username: '',
        password: '',
   });

   const [errors, setErrors] = useState({});

   const handleChange = (e) =>{
    const{name, value} = e.target;
    setData((prevData) => ({
        ...prevData,
        [name]:value 

    }));
    //clear errors for the field when the user starts typing
    if(errors[name]){
        setErrors((prevErrors)=>({
            ...prevErrors,
            [name]: ''

        }));

    }

   };

   const handleSubmit = async(event) => {
    event.preventDefault();
    //Array list to store the error messages 
    let errorMessages = [];
    //Check for empty fields, if there is one, add it to the errorMessages list
    Object.keys(data).forEach((key)=>{
        if(!data[key].trim()){
            const field = key.charAt(0).toUpperCase()+ key.slice(1).replace(/([A-Z])/g, ' $1').trim();
            errorMessages.push(`${field} is required!`);
        }
    });

    //Do not submit the form since there is an error message
    if(errorMessages.length > 0 ){
        alert(`Please complete the following fields: \n${errorMessages.join('\n')}`);
    }
    //else{console.log(data);}
    else{

        try {
            const config = {
                headers: {
                  "Content-type": "application/json",
                },
              };
            const response = await axios.post("/user/sign_in", data, config);
            console.log("Success"); 
            //navigate('/select_discussion'); //redirect to select discussion page
            const username = response.data.username;
            navigate(`/select_discussion/${username}`);
    } catch (e) {
        console.log("Error", e.stack);
        console.log("Error", e.name);
        console.log("Error", e.message);
    }
    };

   };


    return (
        <div className="signIn" >
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="circle1"></div>
                <div className="circle2"></div>
                <div className="circle3"></div>
                <div className="circle4"></div>
                <div className="circle5"></div>
            
                <h3>Please enter your username and password</h3>
                <div className="row">
                    <input size='25' type ='text' name='username' placeholder="Username" onChange={handleChange}/>
                </div>

                <div className="row">
                    <input size='25' type ='password' name='password' placeholder="Password" onChange={handleChange}/>
                </div>

                <div className="buttons">
                    <button className="signin">Sign In</button>
                    {/*In case someone is not sure that they don't have the account*/}
                    <button className="signup" onClick={redirectToRegistration}>Sign Up</button>
                </div>
           
            </form>
            
            


            


        </div>
    );
   


};

export default SignIn;