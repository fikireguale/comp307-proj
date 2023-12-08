const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
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

module.exports = mongoose.model('chat', chatSchema)