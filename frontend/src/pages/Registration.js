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