import React from "react";
import { useNavigate } from "react-router-dom";

const Select_Discussion =() =>{
    const navigate = useNavigate(); //navigate function


    const toLanding = () => {
        navigate('/')
    }

    function openForm(){
        document.getElementById("myForm").style.display = "block"
    }



    return(
        <div className="select_discussion">
            <header>
                <button class="logout" onClick={toLanding}>Logout</button>
                
            </header>

            <div class="upper_bar">
                <h1>Courses</h1>
                <a onClick="openForm()" class="btn btn--circle fa fa-plus"></a>
                <a class="semester">Semester</a>
            </div>

            <div class="form-popup" id="addDiscussion">
                <form action="" class="form-container">
                    <h1>Add new Discussion Board</h1>
                    <label for="course_number">Course Number</label>
                    <input type="text" placeholder="COMP307" name="course_number" required></input>
                    
                </form>
            </div>
            
            <div class="select_board">
                <div class="item">
                    <img src="../assets/course_img.jpeg"></img>
                    <button class="btn fas fa-minus"></button>
                    <div class="course_text">
                        <h2>Course name1</h2>
                        <a href="./discussion"></a>
                        <p>course description</p>
                    </div>
                </div>
                <div class="item">
                    <img src="../assets/course_img.jpeg"></img>
                    <button class="btn fas fa-minus"></button>
                    <div class="course_text">
                        <h2>Course name2</h2>
                        <p>course description</p>
                    </div>
                </div>
                <div class="item">
                    <img src="../assets/course_img.jpeg"></img>
                    <button class="btn fas fa-minus"></button>
                    <div class="course_text">
                        <h2>Course name3</h2>
                        <p>course description</p>
                    </div>
                </div>
                <div class="item">
                    <img src="../assets/course_img.jpeg"></img>
                    <button class="btn fas fa-minus"></button>
                    <div class="course_text">
                        <h2>Course name4</h2>
                        <p>course description</p>
                    </div>
                </div>
                <div class="item">
                    <img src="../assets/course_img.jpeg"></img>
                    <button class="btn fas fa-minus"></button>
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
