
import React, {useState, useMemo, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const Discussion =() =>{
  const [pinnedMessage, setPinnedMessage] = useState(null);

  const [showPopup, setShowPopup] = useState(false); 



  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Popup component
  const PinnedMessagesPopup = () => (
    <div className="popup">
      <div className="popup-inner">
        <h2>Pinned Messages</h2>
        {pinnedMessage && <p>{pinnedMessage.content}</p>}
        <button onClick={togglePopup}>Close</button>
      </div>
    </div>
  );
  
  const chatName = useParams().discussionName;
  const username = useParams().username;
  console.log(useParams());

  const navigate = useNavigate(); //navigate function
  

  const toSelectDiscussion = () => {
    navigate(`/select_discussion/${username}`);
  };

  const toUserManagement = () => {
    navigate(`/userManagement/${username}/${chatName}`);
    //navigate('/userManagement');
  };

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

  
  // Chat log
  const [messageLog, setMessageLog] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = {};
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      try {
        const response = await axios.get(`/message/get_messages?chatName=${chatName}&user=${username}`, data, config);
        if (response.status === 200) {
          setMessageLog(response.data.allMessages);
        } else {
          console.error('Failed to fetch chat logs');
        }
      } catch (error) {
        console.error('Error fetching chat logs:', error);
      }
    };

    fetchData();
  }, []);
  console.log(messageLog);

 

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

    const user = username;
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
    setMessageLog([...messageLog, { id: messageLog.length + 1, sendername: user, content: message, createdAt: time }]);

    messageInput.value = "";

    try{
      // send the new message data to DB
      axios.post("/message/send_message/", data, config);

    } catch (e) {
      console.error("Error", e);
    }

  }


  useEffect(() => {
    const fetchPinnedMessages = async () => {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      try {
        const response = await axios.get(`/message/get_pins?chatName=Comp307&user=John`, config);
        if (response.status === 200) {
          setPinnedMessage(response.data); // Adjust this according to your data structure
        }
      } catch (error) {
        console.error('Error fetching pinned messages:', error);
      }
    };

    fetchPinnedMessages();
  }, []);


  const pinMessage = async (messageId) => {
    try {
      const response = await axios.post('/message/get_pins', { messageId });
      if (response.status === 200) {
        // Update pinned message in state, adjust according to your needs
        setPinnedMessage(response.data);
      }
    } catch (error) {
      console.error('Error pinning message:', error);
    }
  };

  //function pinMessage(){
    
    // do something to pin message
  //}
  //if not empty then change the color to white 
  const inputTextStyle = searchTerm ? {color:'white'} : {};


  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

   // Filter messages based on the search term
   const filteredMessages = messageLog.filter((message) =>
   message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  

  return (
      <div className="discussion">
        <div class="flexbox">

          <section class="left_column">
            <button id="home_btn" onClick={toSelectDiscussion}><i class="fa-solid fa-house-chimney fa-3x"></i></button>
          </section>


          <section class="channel_selection">

            <header class="course_name">
              <h1>{chatName}</h1>
              <button class="manageMember_btn" onClick={toUserManagement}>Manage Users</button>
            </header>
            <div class="search">
              <input type="text" id="searchInput" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} style={inputTextStyle}/>
            </div>

          </section>
          <section class="discussion_board">
            <header class="channel_name">
              <h1>Channel 1</h1>
              {/*<button id="pin_btn" onClick={pinMessage(message.id)}><i class="fa-solid fa-thumbtack"></i></button>*/}
              
            </header>


            <div id="messages">
              {pinnedMessage && (
                <div className="pinned-message">
                  Pinned: {pinnedMessage.content}
                </div>
              )}
              {filteredMessages.map((message) => (
                <div key={message.id} className={`message message_${message.sendername === username ? "right" : "left"}`}>
                  <div className="message_box">
                    <div className="message_text"><a>{message.sendername}:</a> {message.content}</div>
                    <div className="time_stamp">{message.createdAt}</div>
                    {/*<button id="pin_btn" onClick={pinMessage(message.id)}><i class="fa-solid fa-thumbtack"></i></button>*/}
                    <button id="send_btn" onClick={togglePopup}><i class="fa-solid fa-paper-plane"></i></button>
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
                

              </div>

            </div>


          </section>
        </div>
      </div>
      
  );
};
export default Discussion;