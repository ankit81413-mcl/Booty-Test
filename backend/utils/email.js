const nodemailer = require("nodemailer");

const senderEmail = process.env.SENDER_EMAIL;
const senderPass = process.env.SENDER_PASSWORD;

// NodeMailer Function to send Mail
function sendMail(to, username, otp) {
  return new Promise((resolve, reject) => {
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: senderEmail,
        pass: senderPass,
      },
    });

    const mailOptions = {
      from: "ankit81413.mcl@gmail.com",
      to,
      subject: "Booty By Bret Verification Code",
      text: `Hi ${username},

Welcome to Booty By Bret!

Use the verification code below to complete your registration:

${otp}

This code will expire in 5 minutes. If you didn't request this, please ignore this message.

Thanks,
Team Booty By Bret`,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "High",
        "Content-Type": "text/plain; charset=UTF-8",
      },
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}

// Function to generate OTP with length

function generateOTP(length = 6) {
  let digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

module.exports = {
  sendMail,
  generateOTP
};
