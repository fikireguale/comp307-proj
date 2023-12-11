
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useState, useEffect, useInsertionEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';


const Select_Discussion =() => {

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
    const [newChatName, setNewChatName] = useState('');
  

    const createDiscussion= async (inputName) =>{
      try {
        const config2 = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const data3 = {"chatName": inputName, "adminName": `${encodeURIComponent(username)}`}
        console.log("Request Data3", data3)
        const response3 = await axios.post("/chat/create_chat/", data3, config2);
        console.log("R3", response3)
        setEditModalIsOpen(false);
      } catch (e) {
        console.log("Error", e.stack);
        console.log("Error", e.name);
        console.log("Error", e.message);
        alert("Chat already exists")
    }
    }

    const joinDiscussion= async (inputName2) =>{
      try {
        const config3 = {
          headers: {
            "Content-type": "application/json",
          },
        };

        const data4 = {"username": `${encodeURIComponent(username)}`, "chatName": inputName2}
        console.log("BEFORE R4", data4)
        const response4 = await axios.post("/user/add_user_chat/", data4, config3);
        console.log("R4", response4)
        setEditModalIsOpen(false);
      } catch (e) {
        console.log("Error", e.stack);
        console.log("Error", e.name);
        console.log("Error", e.message);
        alert("Discussion does not exist, please create one or verify the name.")
    }
    }

    const handleInputChange = (event) => {
      setNewChatName(event.target.value);
    };

    const toDiscussionBoard = (chatName) =>{
      navigate(`/discussion/${encodeURIComponent(username)}/${chatName}`);
    }

    const { username } = useParams();
    const [chats, setChats] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/user/get_user_chat/?username=${encodeURIComponent(username)}`);
          if (response.status === 200) {
            setChats(response.data.chats);
          } else {
            console.error('Failed to fetch chats');
          }
        } catch (error) {
          console.error('Error fetching chats:', error);
        }
      };
  
      fetchData();
    }, [username, newChatName, editModalIsOpen]);
  //        <a class="semester">Semester</a>
  return (
    <div className="select_discussion">
      <header>
        <button className="logout" onClick={toLanding}>
          Logout
        </button>
      </header>
  
      <div className="upper_bar">
        <h1>Courses</h1>
        <a class="btn btn--circle fa fa-plus" onClick={() => {setEditModalIsOpen(true)}}></a>
        <Modal isOpen={editModalIsOpen} style={customStyles} onRequestClose={() => {setEditModalIsOpen(false)}}>
           <div style={modalContentStyle}>
              <a style={titleStyle}>Course Code :</a>
              <input
              type="text"
              placeholder="e.g. COMP307"
              style={inputStyle}
              value={newChatName}
              onChange={handleInputChange}
            />
           </div>
           <button id="Create" style={pinkButtonStyle} onClick={() => createDiscussion(newChatName)}>Create</button>
           <button id="Join" style={pinkButtonStyle} onClick={() => joinDiscussion(newChatName)}>Join</button>
           <button id="Cancel" style={purpleButtonStyle} onClick={() => {setEditModalIsOpen(false)}}>Cancel</button>
        </Modal>
                

      </div>
  
      <div className="select_board">
        {console.log("BEFORE MAP", chats)}
        {chats.map((chat) => (
            <div className="item" key={chat.id} onClick={()=> toDiscussionBoard(chat.name)}>
            <img src={chat.image} alt="Course" />
            <div className="course_text">
                {console.log("CHATNAME:", chat.name)}
              <h2>{chat.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );;
}
export default Select_Discussion;
