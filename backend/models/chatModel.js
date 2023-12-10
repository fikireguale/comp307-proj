const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    name: { 
        type: String,
        required: true,
        unique: true
    },

    admin: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true, 
    },

    users: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    }],

    image: {
      type: String,
      default: 'https://static-00.iconduck.com/assets.00/chat-icon-2048x2048-i7er18st.png'
    },


    pins:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }]
  }
);

module.exports = mongoose.model('chat', chatSchema)