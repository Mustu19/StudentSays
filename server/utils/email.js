import { createTransport } from "nodemailer";

export const sendResetPasswordEmail = async (email, resetUrl) => {
  try {
    const transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Please click on the link to reset your password: ${resetUrl}`,
      html: `<p>You requested a password reset. Please click on the link to reset your password: <a href="${resetUrl}">${resetUrl}</a></p>`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
