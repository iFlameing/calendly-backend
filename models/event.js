const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String
  },
  location: {
    type: String
  },
  discription: {
    type: String
  },
  link: {
    type: String
  },
  type: {
    type: String
  },
  duration: {
    type: String
  }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
