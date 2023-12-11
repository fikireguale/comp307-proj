const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    content: { 
      type: String,
      required: true
    },

    chat: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },

    createdAt: {
      type: Date,
      default: Date.now
    },

    sendername: {
      type: String
    }

  }

);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;