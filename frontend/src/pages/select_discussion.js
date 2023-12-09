//import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Select_Discussion =() => {

    const navigate = useNavigate(); //navigate function
    const redirectToLanding = () =>{
        navigate('/');
    }

    const { username } = useParams();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log(`/user/get_user_chat/${encodeURIComponent(username)}`)
        const response = await axios.get(`/user/get_user_chat/?username=${encodeURIComponent(username)}`);
        console.log("RESPONSE:", response)
        console.log("RESPONSE.DATA:", response.data)
        if (response.status === 200) {
        console.log("GOT DATA", response.data.chats)
        //console.log(response.data.chats);
        setChats((prevChats) => response.data.chats);
          console.log(chats)
        } else {
          console.error('Failed to fetch chats');
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchData();
  }, [username]); // Include username in the dependency array

  useEffect(() => {
    console.log('Current state:', chats);
  }, [chats]);
  
  return (
    <div className="select_discussion">
      <header>
        <button className="logout" onClick={redirectToLanding}>
          Logout
        </button>
      </header>
  
      <div className="upper_bar">
        <h1>Courses</h1>
        <button className="create_board">+</button>
        <a>Course Name</a>
      </div>
  
      <div className="select_board">
        {console.log("BEFORE MAP", chats)}
        {chats.map((chat) => (
          <div className="item">
            <img src="../assets/course_img.jpeg" alt="Course" />
            <div className="course_text">
                {console.log("CHATNAME:", chat.chatName)}
              <h2>{chat.chatName}</h2>
              <p>course description</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
/*
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
}*/;
}
export default Select_Discussion;
