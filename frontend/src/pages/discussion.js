import React , {useState} from "react";
import { useNavigate } from 'react-router-dom';


const Discussion =() =>{

  const navigate = useNavigate();

  // sample user data with icons
  const users = [
    { name: "User 1", icon: '../assets/user1.png'},
    { name: "User 2", icon: '../assets/user2.png'}
  ];

  // function to generate current timestamp
  function getCurrentTime(){
    const now = new Date();
    return now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  }

  // State to hold messages
  const [messages, setMessages] = useState([
    { id: 1, user: "User 2", text: "hi is todays lecture in person?", time: getCurrentTime() },
    { id: 2, user: "User 1", text: "No, it will be hosted on Zoom.", time: getCurrentTime() }
  ]);

  // State to hold the search term
  const [searchTerm, setSearchTerm] = useState("");

  
  // function to create and display messages
  function sendMessage(){
    const messageInput = document.getElementById("textarea");
    const message = messageInput.value;
    if (message.trim() == '') return;

    const user = users[0];
    const time = getCurrentTime();

    // Update messages state instead of manipulating the DOM directly
    setMessages([...messages, { id: messages.length + 1, user: user.name, text: message, time: time }]);

    messageInput.value = "";
  

    /*

    const user = users[0];
    const time = getCurrentTime();

    const discussionBoard = document.getElementById("message_right");
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');

    const userInfo = document.createElement('div');
    userInfo.classList.add('user-info');

    const userIcon = document.createElement('img');
    userIcon.src = user.icon;
    userIcon.alt = "${user.name}'s icon";
    userIcon.classList.add("user-icon");

    const userName = document.createElement('span');
    userName.textContent = "${user.name}";

    const timestamp = document.createElement('span');
    timestamp.textContent = time;
    timestamp.classList.add("timestamp");

    const messageContent = document.createElement('p');
    messageContent.textContent = message;

    userInfo.appendChild(userIcon);
    userInfo.appendChild(userName);
    userInfo.append(timestamp);

    newMessage.appendChild(userInfo);
    newMessage.appendChild(messageContent);
    discussionBoard.appendChild(newMessage);

    messageInput.value = "";
    discussionBoard.scrollTop = discussionBoard.scrollHeight;
    */
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
            <img class="home_icon" src="../assets/home_icon.png"></img>
          </section>


          <section class="channel_selection">

            <header class="course_name">
              <h1>Comp 307</h1>
            </header>
            <div class="search">
              <input type="text" id="searchInput" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} style={inputTextStyle}/>
            </div>

          </section>
          <section class="discussion_board">
            <header class="channel_name">
              <h1>Channel 1</h1>
              <img src="../assets/pin.png"></img>
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

            

            {/* Time line */}
            {/*
              <div id="messages">
            */}


            {/* Others' messages */}
            {/*
              <div class="message message_left">
                <div class="message_box">
                  <div class="message_content">
                    <div class="message_text">hi is todays lecture in person?</div>
                  </div>
                </div>
              </div>
              <div class="clear"></div>
            */}

            {/* My messages */}
            {/*
              <div class="message message_right">
                <div class="message_box">
                  <div class="message_content">
                    <div class="message_text">No, it will be hosted on Zoom.</div>
                  </div>
                </div>
              </div>
              <div class="clear"></div>
            
             </div>
            */}

            {/* Text box */}
            <div id="send">
              <textarea id="textarea" placeholder="Message..."></textarea>

              
              <div class="formatting-bar">
                <button class="btn" onclick="formatText('bold')">B</button>
                <button class="btn" onclick="formatText('italic')">I</button>
                <button class="btn" onclick="formatText('underline')">U</button>
                <button class="btn" onclick="formatText('strikethrough')">S</button>
                <img class="btn" src="" type="button" id="react"></img>
                <button id="send_btn" onclick="sendMessage()"><img src="../assets/send.png"></img></button>

              </div>

            </div>


          </section>
        </div>
      </div>
      
  );
};
export default Discussion;