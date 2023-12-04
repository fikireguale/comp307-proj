import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';


const Landing = () =>{
    const navigate = useNavigate();
    const headline1 = "Beyond words, Above Expectations -"
    const headline2 = "Your Nest for Exceptional Communication!"

    const toPerch = () => {
        navigate('/')
    }
    
    return (
        <div >
            <Navbar/>
            
            <div className="landing">
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
                        <button>Download to your Desktop</button>
                        <button onClick={toPerch}>Open Perch in your browser</button>


                    </div>

                    
                    
                    

                </div>
                
            </div>
            
            
            
        </div>
        
    )



};

export default Landing;