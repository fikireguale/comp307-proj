const mongoose = require("mongoose");

const chat = mongoose.Schema(
  {
    chatName: { 
        type: String,
        trim: true,
        required: true
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
    pinned:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    }
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;