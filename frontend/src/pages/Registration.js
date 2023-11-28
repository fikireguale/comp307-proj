import React, {useState} from "react";


const Registration = () =>{
   const [data, setData] = useState({
        fname: '',
        lname: '',
        email: '',
        phoneNum: '',
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
            errorMessages.push(`{field} is required!`);
        }
    });

   }

    return(
        
        <div className="registration">
            <h1 style={{color:'white', textAlign: 'center'}}>Welcome</h1>
            <form>
                <label> 
                    <input type="text" />

                </label>
            </form>

           
            
        </div>

    )
    
};
export default Registration;