var API_KEY = process.env.MAILGUN_API;
var DOMAIN = process.env.MAILGUN_DOMAIN;
var mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.verifyEmail = async (req, res, next) => {
  try {
    if (!req.body.email) {
      throw new Error("Please input an email!");
    }
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("There is no user with this email");
    }
    console.log("This is the email send to", email);
    console.log("This is the user", user);

    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.SECRET,
      {
        expiresIn: "15m",
      }
    );

    const data = {
      from: "Games Beacon Email Service <lamphuoctuong@gmail.com>",
      to: email,
      subject: "Reset Password Email from Games Beacon",
      html: `<b>This is <a href="http://localhost:3000/resetpassword/${token}">Link</a> to reset password. This token will be effective only 15 minutes after receiving this email</b>`,
    };
    mailgun.messages().send(data, (error, body) => {
      console.log("this is email body", body);
    });
    console.log(token);
    res.status(201).json({ status: "Sent token email", data: token });
  } catch (err) {
    res.json({ status: "Failed to sent token email", data: err });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const token = req.body.token;
    const password = req.body.password;
    console.log(process.env.SECRET);
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("this is the decoded", decoded);
    const user = await User.findOne({ email: decoded.email, _id: decoded._id });
    console.log("this is user", user);
    user.password = password;
    await user.save();
    res.status(201).json({ status: "Success in reset the password" });
  } catch (err) {
    res.json({ status: "Failed to sent reset password", data: err });
    console.log(err);
  }
};
