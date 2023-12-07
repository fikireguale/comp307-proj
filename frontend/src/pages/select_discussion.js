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

            <div class="upper_bar">
                <h1>Courses</h1>
                <button class="create_board">+</button>
                <a>Course Name</a>
            </div>
            
            <div class="select_board">
                <div class="item">
                    <img src="../assets/course_img.jpeg"></img>
                    <div class="course_text">
                        <h2>Course name1</h2>
                        <a href="./discussion"></a>
                        <p>course description</p>
                    </div>
                </div>
                <div class="item">
                    <img src="../assets/course_img.jpeg"></img>
                    <div class="course_text">
                        <h2>Course name2</h2>
                        <p>course description</p>
                    </div>
                </div>
                <div class="item">
                    <img src="../assets/course_img.jpeg"></img>
                    <div class="course_text">
                        <h2>Course name3</h2>
                        <p>course description</p>
                    </div>
                </div>
                <div class="item">
                    <img src="../assets/course_img.jpeg"></img>
                    <div class="course_text">
                        <h2>Course name4</h2>
                        <p>course description</p>
                    </div>
                </div>
                <div class="item">
                    <img src="../assets/course_img.jpeg"></img>
                    <div class="course_text">
                        <h2>Course name5</h2>
                        <p>course description</p>
                    </div>
                </div>
            </div>


        </div>
    )
};
export default Select_Discussion;
