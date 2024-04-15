import nodemailer from "nodemailer";

export const sendMail = async ({ email, html, subject }) => {
  const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: 2525,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.NODEMAILER_FROM_NAME} <${process.env.NODEMAILER_FROM_EMAIL}`,
    to: email,
    subject: subject,
    html: html,
    text: html,
  };

  await transport.sendMail(message);
};
