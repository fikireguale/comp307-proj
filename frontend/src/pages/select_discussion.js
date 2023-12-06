import React from "react";
import { useNavigate } from "react-router-dom";

const Select_Discussion =() =>{
    const navigate = useNavigate(); //navigate function
    const redirectToLanding = () =>{
        navigate('/');
    }

    return(
        <div className="select_discussion">
            <header>
                <button class="logout" onclick={redirectToLanding}>Logout</button>
            </header>

        </div>
    )
};
export default Select_Discussion;