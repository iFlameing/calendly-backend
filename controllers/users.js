const User = require("../models/user");
const Event = require("../models/event");
const Schedule = require("../models/schedule");
const nodemailer = require("nodemailer");

module.exports = {
  googleOAuth: async (req, res, next) => {
    const { email, googleId, imageUrl, givenName } = req.body;
    let user = await User.findOne({ googleid: req.body.googleId });
    if (user) {
      return res.status(200).json({ Success: true });
    }

    user = {
      googleid: googleId,
      email: email,
      imageUrl: imageUrl,
      givenName: givenName,
    };
    console.log("thi si user", user);

    const newUser = await User.create(user);
    console.log(newUser);
    const min15Event = {
      title: "15 Min Meeting",
      link: `${googleId}/15min`,
      type: "one-to-one",
      duration: "15min",
    };
    const min30Event = {
      title: "30 Min Meeting",
      link: `${googleId}/30min`,
      type: "one-to-one",
      duration: "30min",
    };
    const min60Event = {
      title: "60 Min Meeting",
      link: `${googleId}/60min`,
      type: "one-to-one",
      duration: "60min",
    };
    const min15 = await Event.create(min15Event);
    const min30 = await Event.create(min30Event);
    const min60 = await Event.create(min60Event);
    newUser.events.push(min15);
    newUser.events.push(min30);
    newUser.events.push(min60);
    newUser.save();
    res.status(200).json({ Success: true });
  },
  getEventTypesForUser: async (req, res, next) => {
    console.log(req.params.id);
    User.findOne({ googleid: req.params.id })
      .populate("events")
      .exec(function (err, foundUser) {
        if (err) {
          res.json(err);
        } else {
          return res.status(200).json(foundUser);
        }
      });
  },
  getScheduleForUser: async (req, res, next) => {
    User.findOne({ googleid: req.params.id })
      .populate("schedules")
      .exec(function (err, foundUser) {
        if (err) {
          res.json(err);
        } else {
          return res.status(200).json(foundUser);
        }
      });
  },
  createScheduleForUser: async (req, res, next) => {
    const foundUser = await User.findOne({ googleid: req.params.id });
    console.log(foundUser);
    const { name, email, duration, date, discription } = req.body;
    const newSche = { name, email, duration, date, discription };
    const newSchedule = await Schedule.create(newSche);
    console.log(newSchedule);
    foundUser.schedules.push(newSchedule);
    foundUser.save();
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      port: 587,
      secure: false,
      auth: {
        user: "funapp1076@gmail.com",
        pass: "Alok@9988",
      },
    });
    transporter.sendMail(
      {
        from: "funapp1076@gmail.com",
        to: email,
        subject: `New Metting with ${foundUser.givenName}`,
        text: "Hello world ?",
        html: `<p>Hello, A New meeting is setup with${foundUser.givenName} on ${date} </p>`,
      },
      function (err, info) {
        if (err) {
          res.json(err);
        } else {
          console.log(info);
          console.log("Email sent successfully");
        }
      }
    );
    transporter.sendMail(
      {
        from: "funapp1076@gmail.com",
        to: foundUser.email,
        subject: `New Metting with ${name}`,
        text: "Hello world ?",
        html: `<p>Hello, A New meeting is setup with${name} on ${date} </p>`,
      },
      function (err, info) {
        if (err) {
          res.json(err);
        } else {
          console.log(info);
          console.log("Email sent successfully");
        }
      }
    );
    res.status(200).json({ Success: true });
  },
  createNewEvent: async (req, res, next) => {
    const foundUser = await User.findOne({ googleid: req.params.id });
    const { title, link, duration } = req.body;
    const newEvent = {
      title: title,
      link: `${foundUser.googleid}/${link}`,
      type: "one-to-one",
      duration: duration,
    };
    const newevent = await Event.create(newEvent);
    foundUser.events.push(newevent);
    foundUser.save();
    res.status(200).json({ Success: true });
  },
};
