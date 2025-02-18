import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config({
  path: ".env",
})

const sendMail = async (receiverEmail, OTP) => {
  const auth = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 587,
    auth: {
      user: process.env.NODE_MAILER,
      pass: process.env.NODE_MAILER_PASSWORD,
    },
    html: `     <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    padding: 0;
                    margin: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: auto;
                    overflow: hidden;
                    padding: 20px;
                }
                h1 {
                    color: #333;
                    border-bottom: 2px solid #f5f5f5;
                    display: inline-block;
                    padding-bottom: 10px;
                }
                p {
                    color: #666;
                    line-height: 150%;
                }
                .button {
                    display: inline-block;
                    border-radius: 5px;
                    background: #3498db;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 10px 20px;
                    transition: background-color 0.3s;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to HackFusion 2025</h1>
                <p>Thank you for registering!</p>
                
                <p>Your OTP for verification is:</p>
                <h2 style="color: #3498db; font-weight: bold;">${OTP}</h2>
                
                <p>Please do not share this OTP with anyone.</p>
                
                <a href="#" class="button">Verify Now</a>
            </div>
        </body>
    </html>
`,
  })

  const receiver = {
    from: process.env.EMAIL,
    to: receiverEmail,
    subject: "Verification OTP for HackFusion 2025",
    html: auth.options.html,
  }

  auth.sendMail(receiver, (err, res) => {
    if (err) throw err
    // else console.log("done")
  })
  return true
}

export { sendMail }
