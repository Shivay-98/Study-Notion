const courseEnrollmentEmail = (
  courseName,
  name,
  dashboardUrl
) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Course Registration Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        padding: 20px;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        padding: 30px;
        text-align: center;
        border-radius: 8px;
      }

      .logo {
        background-color: #ffd60a;
        display: inline-block;
        padding: 10px 20px;
        font-size: 24px;
        font-weight: bold;
        border-radius: 5px;
        margin-bottom: 20px;
      }

      .heading {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .message {
        color: #444;
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 20px;
      }

      .button {
        display: inline-block;
        background-color: #ffd60a;
        color: #000;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 5px;
        font-weight: bold;
        margin-top: 20px;
      }

      .footer {
        margin-top: 30px;
        color: #666;
        font-size: 14px;
      }

      .footer a {
        color: #0073e6;
        text-decoration: none;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="logo">
        StudyNotion
      </div>

      <div class="heading">
        Course Registration Confirmation
      </div>

      <p class="message">
        Dear ${name},
      </p>

      <p class="message">
        You have successfully registered for the course
        <strong>"${courseName}"</strong>.
        We are excited to have you as a participant!
      </p>

      <p class="message">
        Please log in to your learning dashboard to access
        the course materials and start your learning journey.
      </p>

      <a href="${dashboardUrl}" class="button">
        Go to Dashboard
      </a>

      <div class="footer">
        <p>
          If you have any questions or need assistance,
          please feel free to contact us at
          <a href="mailto:info@studynotion.com">
            info@studynotion.com
          </a>
        </p>

        <p>We are here to help!</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

module.exports = courseEnrollmentEmail;