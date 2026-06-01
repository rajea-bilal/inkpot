import nodemailer from "nodemailer";
// Nodemailer is a Node.js library that talks to an email provider.

// Nodemailer needs permission to use your Gmail account.
// Because Google does not want apps using your actual Gmail password,
// you use OAuth2 instead.
// Nodemailer’s OAuth2 flow uses the refresh token to automatically generate short-lived access tokens when needed
// Inkpot = your real app/backend/frontend code
// Google OAuth app = Inkpot’s registered identity inside Google Cloud
// Client ID = the ID number for that Google OAuth app
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_ClIENT_ID, // identifies your app/project inside Google Cloud
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN, // owner of this Gmail account allowed Inkpot to send mails
  },
});

export async function verifyTransporter() {
  try {
    await transporter.verify();
    console.log("Email transporter is ready to send emails");
    return true;
  } catch (err) {
    console.error("Email transporter verification failed", err.message);
    console.error(err);
    return false;
  }
}

export async function sendEmail({ to, subject, html, text }) {
  try {
    const mailOptions = {
      from: `"Inkpot" <${process.env.GOOGLE_USER}>`,
      to,
      subject,
      html,
      text,
    };

    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent:", details);
    return details;
  } catch (err) {
    console.error("Email sending failed:", err.message);
    console.error(err);
    throw err;
  }
}
