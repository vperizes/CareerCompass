import nodemailer from "nodemailer";

export const sendResetEmail = async (option) => {
  //create reusable transporter object using defulat SMTP transport
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.CC_APP_PASSWORD,
    },
  });

  const emailOptions = {
    from: {
      name: "Career Compass",
      address: process.env.EMAIL,
    }, // sender address
    to: option.userEmail, // list of receivers
    subject: option.emailSubject, // Subject line
    text: option.emailText, // plain text body
  };

  await transporter.sendMail(emailOptions);
};
