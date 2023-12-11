
import React, {useState, useMemo, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const Discussion =() =>{

  const chatName = useParams().discussionName;
  const username = useParams().username;

  const navigate = useNavigate(); //navigate function
<<<<<<< HEAD

  const toSelectDiscussion = () => {
    navigate(`/select_discussion/${username}`);
  };

=======
>>>>>>> Annie
  // sample user data with icons
  const users = [
    { name: "User 1", icon: '../assets/user1.png'},
    { name: "User 2", icon: '../assets/user2.png'}
  ];
<<<<<<< HEAD

 
=======
  const chatName = useParams().discussionName;
  const username = useParams().username;
  const toUserManagement = () => {
    navigate(`/userManagement/${username}`);
    //navigate('/userManagement');
  };
>>>>>>> Annie

  // function to generate current timestamp
  function getCurrentTime(){
    const now = new Date();
    return now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  }

  
  // Chat log

  // State to hold messages
  const [messages, setMessages] = useState([
    { id: 1, user: "User 2", text: "hi is todays lecture in person?", time: getCurrentTime() },
    { id: 2, user: "User 1", text: "No, it will be hosted on Zoom.", time: getCurrentTime() }
  ]);

  // State to hold the search term
  const [searchTerm, setSearchTerm] = useState("");

  function formatText(option){
    // option can be "bold", "italic", "underline", "strike"
  }


  // function to create and display messages
  function sendMessage(){
    const messageInput = document.getElementById("textarea");
    const message = messageInput.value;
    if (message.trim() == '') return;

    const user = users[0];
    const time = getCurrentTime();

    const data = {
      "chatName": chatName,
      "username": username,
      "content": message,
      "pin": false,
    };
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // Update messages state instead of manipulating the DOM directly
    setMessages([...messages, { id: messages.length + 1, user: user.name, text: message, time: time }]);

    messageInput.value = "";

    try{
      // send the new message data to DB
      axios.post("/message/send_message/", data, config);

    } catch (e) {
      console.error("Error", e);
    }

  }


  function pinMessage(){
    // do something to pin message
  }
  //if not empty then change the color to white 
  const inputTextStyle = searchTerm ? {color:'white'} : {};


  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

   // Filter messages based on the search term
   const filteredMessages = messages.filter((message) =>
   message.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
      <div className="discussion">
        <div class="flexbox">

          <section class="left_column">
            <button id="home_btn" onClick={toSelectDiscussion}><i class="fa-solid fa-house-chimney fa-3x"></i></button>
          </section>


          <section class="channel_selection">

            <header class="course_name">
              <h1>Comp 307</h1>
              <button class="manageMember_btn" onClick={toUserManagement}>Manage Users</button>
            </header>
            <div class="search">
              <input type="text" id="searchInput" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} style={inputTextStyle}/>
            </div>

          </section>
          <section class="discussion_board">
            <header class="channel_name">
              <h1>Channel 1</h1>
              <button id="pin_btn" onClick={pinMessage}><i class="fa-solid fa-thumbtack"></i></button>
            </header>


            <div id="messages">
              {/* Filter and map through messages for display */}
              {filteredMessages.map((message) => (
                <div key={message.id} className={`message message_${message.user === users[0].name ? "right" : "left"}`}>
                  <div className="message_box">
                    <div className="message_content">
                      <div className="message_text">{message.text}</div>
                      {/* Add timestamp and user icon if needed */}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            



            {/* Text box */}
            <div id="send">
              <input type="text" id="textarea" placeholder="Message..."></input>

              
              <div class="formatting-bar">
                <button class="btn" onClick={() => formatText('bold')}>B</button>
                <button class="btn" onClick={() => formatText('italic')}>I</button>
                <button class="btn" onClick={() => formatText('underline')}>U</button>
                <button class="btn" onClick={() => formatText('strikethrough')}>S</button>
                <img class="btn" src="" type="button" id="react"></img>
                <button id="send_btn" onClick={sendMessage}><i class="fa-solid fa-paper-plane"></i></button>

              </div>

            </div>


          </section>
        </div>
      </div>
      
  );
};
export default Discussion;