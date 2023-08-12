const nodemailer = require("nodemailer");

// Replace the following with your SMTP server and email credentials
const emailConfig = {
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false,
  auth: {
    user: "mahalakshmirameshr@gmail.com",
    pass: "CgGXxQSEYt49Wnf1",
  },
};

// Sample list of candidates to whom notifications will be sent
const shortlistedCandidates = [
  { name: "Mahalakshmi R", email: "mahalakshmiramesh31072003@gmail.com" },
  { name: "Soumya R", email: "soumyarajappan528@gmail.com" },
  // Add more candidates here as needed
];

// Email content
const subject = "Congratulations! You have been shortlisted!";
const emailText = `Dear {name},

Congratulations! We are pleased to inform you that you have been shortlisted for the interview.

Please find the details of the interview schedule in the attached document.

Best regards,
Tata Consultancy Services`;

// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(emailConfig);

// Function to send emails to candidates
async function sendEmailNotification(candidate) {
  try {
    const emailContent = emailText.replace("{name}", candidate.name);

    // Send email with defined transport object
    const info = await transporter.sendMail({
      from: "mahalakshmirameshr@gmail.com",
      to: candidate.email,
      subject: subject,
      text: emailContent,
    });

    console.log("Email sent to", candidate.email, "with message ID:", info.messageId);
  } catch (error) {
    console.error("Error sending email to", candidate.email, ":", error.message);
  }
}

// Send notifications to all shortlisted candidates
shortlistedCandidates.forEach(sendEmailNotification);
