import React from "react";

const Discussion =() =>{

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

  // function to create and display messages
  function sendMessage(){
    const messageInput = document.getElementById("textarea");
    const message = messageInput.value;
    if (message.trim() == '') return;

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
  }


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
              <input type="text" id="searchInput" placeholder="Search..."></input>
            </div>

          </section>
          <section class="discussion_board">
            <header class="channel_name">
              <h1>Channel 1</h1>
              <img src="../assets/pin.png"></img>
            </header>

            {/* Time line */}
            <div id="messages">

              {/* Others' messages */}
              <div class="message message_left">
                <div class="message_box">
                  <div class="message_content">
                    <div class="message_text">hi is todays lecture in person?</div>
                  </div>
                </div>
              </div>
              <div class="clear"></div>

              {/* My messages */}
              <div class="message message_right">
                <div class="message_box">
                  <div class="message_content">
                    <div class="message_text">No, it will be hosted on Zoom.</div>
                  </div>
                </div>
              </div>
              <div class="clear"></div>
            
            </div>

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