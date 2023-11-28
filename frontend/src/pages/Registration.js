import React, {useState} from "react";


const Registration = () =>{
   const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
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

   const handleSubmit = (event) => {
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
    else{console.log(data);}

   };

    return(
        
        <div className="registration">
            <h1>Welcome</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="row">
                    <input size='25' type ='text' name='firstName' placeholder="First Name" onChange={handleChange}/>
                    <input size='25' type ='text' name='lastName' placeholder="Last Name" onChange={handleChange}/>
                </div>
                <div className="row">
                    <input size='25' type ='email' name='email' placeholder="Email" onChange={handleChange}/>
                    <input size='25' type ='tel' name='phoneNumber' placeholder="Phone Number" onChange={handleChange}/>
                </div>
                <div className="row">
                    <input size='25' type ='text' name='username' placeholder="Username" onChange={handleChange}/>
                    <input size='25' type ='password' name='password' placeholder="Password" onChange={handleChange}/>
                </div>
                <div className="submitButton">
                    <button type='submit'>Submit</button>
                </div>
                

            </form>
        
        </div>

    );
    
};
export default Registration;