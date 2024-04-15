import nodemailer from "nodemailer";

export const sendMail = async (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.NODEMAILER_FROM_NAME} <${process.env.NODEMAILER_FROM_EMAIL}`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  await transport.sendMail(message);
};
