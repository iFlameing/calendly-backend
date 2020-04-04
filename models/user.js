const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
  googleid: {
    type: String
  },
  email: {
    type: String,
    lowercase: true
  },
  imageUrl: {
    type: String
  },
  givenName: {
    type: String
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
    }
  ],
  schedules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule"
    }
  ]
});

// Create a model
const User = mongoose.model("user", userSchema);

// Export the model
module.exports = User;
