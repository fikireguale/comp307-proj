import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect, useInsertionEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';


const Select_Discussion =() =>{
    const navigate = useNavigate(); //navigate function


    const toLanding = () => {
        navigate('/')
    }


    // Modal CSS
    const customStyles = {
        content: {
            top: "25%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            minWidth: "40%",
            border: "5px solid rgb(255, 111, 255)",
            borderRadius: "15px",
            background: "#1B2432",
            textAlign: "center",
        }
    };

    const modalContentStyle = {
        textAlign: "center",
    };

    const titleStyle = {
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: "24px",
    };

    const inputStyle = {
        fontSize: "17px",
        padding: "10px",
        margin: "20px",
        height: "40px",
        width: "70%",
    };

    const buttonStyle = {
        color: "#ffffff",
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingRight: "20px",
        paddingLeft: "20px",
        cursor: "pointer",
        marginTop: "10px",
        marginBottom: "10px",
        marginRight: "15px",
        marginLeft: "15px",
        display: "inline-block",
        fontSize: "15px",
        borderRadius: "5px",
        
    };

    const pinkButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#d669bb",

    };

    const purpleButtonStyle = {
        ...buttonStyle,
        backgroundColor: "#7b53bd",

    };

    const [editModalIsOpen, setEditModalIsOpen] = useState(false);

    function createDiscussion(){
        // Do something (backend)
        setEditModalIsOpen(false);
    }

    function joinDiscussion(){
        // Do something (backend)
        setEditModalIsOpen(false);
    }

    const {username} = useParams();
    const [chats, setChats] = useState([]);
    
    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axios.get("/user/get_user_chat/?username=${encodeURIComponent(username)}");
                console.log("RESPONSE:", response)
                console.log("RESPONSE.DATA:", response.data)
                if (response.status === 200){
                    console.log("GOT DATA", response.data.chats)
                    setChats((prevChats) => response.data.chats);
                    console.log(chats)
                }  else {
                    console.error("Failed to fetch chats");
                }
            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        };
        fetchData();
    }, [username]);

    useInsertionEffect(() => {
        console.log('Current state:', chats);
    }, [chats]);



    return(
        <div className="select_discussion">
            <header>
                <button class="logout" onClick={toLanding}>Logout</button>
                
            </header>

            <div class="upper_bar">
                <h1>Courses</h1>
                <a class="btn btn--circle fa fa-plus" onClick={() => {setEditModalIsOpen(true)}}></a>
                <Modal isOpen={editModalIsOpen} style={customStyles} onRequestClose={() => {setEditModalIsOpen(false)}}>
                    <div style={modalContentStyle}>
                        <a style={titleStyle}>Course Code :</a>
                        <input type="text" placeholder="e.g. COMP307" style={inputStyle}></input>
                    </div>
                    <button id="Create" style={pinkButtonStyle} onClick={createDiscussion}>Create</button>
                    <button id="Join" style={pinkButtonStyle} onClick={joinDiscussion}>Join</button>
                    <button id="Cancel" style={purpleButtonStyle} onClick={() => {setEditModalIsOpen(false)}}>Cancel</button>
                </Modal>
                
                <a class="semester">Semester</a>
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
