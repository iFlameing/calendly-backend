const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  email: {
    type: String
  },
  discription: {
    type: String
  },
  date: {
    type: Date
  },
  name: {
    type: String
  },
  duration: {
    type: String
  }
});

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
