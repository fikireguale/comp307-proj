import React from "react";
//import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';


const Test = () =>{
    const navigate = useNavigate();
    const headline1 = "Beyond words, Above Expectations -"
    const headline2 = "Your Nest for Exceptional Communication!"

    const tosignIn = () => {
        navigate('/signIn')
    }
    const tosignUp = () => {
        navigate('/Registration')
    }
    
    return (
        <div >
            {/*<Navbar/>*/}
            
            {/*remember to change this back to landing*/}
            <div className="test">
                <div className="row">
                    <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {headline1.split('').map((letter, index)=> 
                        letter === " " ? (
                            <>&nbsp;</>) :(
                            <span key = {index} className="bounce">{letter}</span>
                        ))}
                        <br />
                        
                        {headline2.split('').map((letter, index)=> 
                        letter === " " ? (
                            <>&nbsp;</>) :(
                            <span key = {index} className="bounce">{letter}</span>
                        ))}
                    </h2>

                    <div className="buttons">
                        <button onClick={tosignUp}>Sign Up</button>
                        <button onClick={tosignIn}>Sign In</button>


                    </div>

                    
                    
                    

                </div>
                
            </div>
            
            
            
        </div>
        
    )



};

export default Test;