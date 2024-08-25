import nodemailer from "nodemailer"

export const sendEmail = async({appointment, username, email, status}: any) => {
        
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MY_EMAIL,
            pass: process.env.MY_EMAIL_APP_PASSWORD
        }
    });
    
    let mailOptions = {
        from: process.env.MY_EMAIL,
        to: email,
        subject: status === "accepted" ? "Your Appointment Has Been Confirmed!" : "Your Appointment Has Been Cancelled!",
        html: status === "accepted" ?
        `<!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Appointment Confirmation</title>
            <style>
                body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                }

                .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }

                .header {
                background-color: #4caf50;
                color: white;
                text-align: center;
                padding: 20px;
                border-radius: 10px 10px 0 0;
                }

                .header h1 {
                margin: 0;
                }

                .content {
                background-color: #C5EBAA;
                padding: 20px;
                text-align: center;
                }

                .content p {
                font-size: 18px;
                color: #333333;
                }

                .appointment-card {
                margin: 20px auto;
                background-color: #e8f5e9;
                border-left: 5px solid #4caf50;
                padding: 15px;
                border-radius: 10px;
                text-align: left;
                }

                .appointment-card h2 {
                margin: 0 0 10px;
                color: #388e3c;
                }

                .appointment-card p {
                margin: 5px 0;
                font-size: 16px;
                }

                .footer {
                text-align: center;
                padding: 20px;
                color: #666666;
                font-size: 14px;
                }

                .footer a {
                font-weight: bold;
                color: #4caf50;
                text-decoration: none;
                }
            </style>
            </head>
            <body>

            <div class="email-container">
                <!-- Header -->
                <div class="header">
                <h1>Appointment Accepted!</h1>
                </div>

                <!-- Content -->
                <div class="content">
                <p>Dear ${username},</p>
                <p>Your appointment with the pet doctor has been accepted. Below are the details of your appointment:</p>

                <!-- Appointment Card -->
                <div class="appointment-card">
                    <h2>Appointment Details</h2>
                    <p><strong>Pet Owner's Name:</strong> ${appointment.name} ${appointment.lastname}</p>
                    <p><strong>Pet's Name:</strong> ${appointment.petname}</p>
                    <p><strong>Pet Type:</strong> ${appointment.pettype}</p>
                    <p><strong>Doctor:</strong> Dr. ${appointment.doctor.name}</p>
                    <p><strong>Doctor's Email:</strong> ${appointment.doctor.contact}</p>
                    <p><strong>Place:</strong> ${appointment.doctor.organisation}</p>
                    <p><strong>Fees:</strong> ${appointment.doctor.fees}}</p>
                    <p><strong>Date:</strong> ${appointment.date.split('-').reverse().join('/')}</p>
                    <p><strong>Time:</strong> ${appointment.timeSlot}</p>
                </div>

                <p>We look forward to seeing you and your pet soon!</p>
                </div>

                <!-- Footer -->
                <div class="footer">
                <p>If you have any questions, feel free to <a href="mailto:${appointment.doctor.contact}">contact us</a>.</p>
                <p>Thank you for choosing us to care for your pet!</p>
                </div>
            </div>

            </body>
            </html>
            ` : `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Appointment Cancellation</title>
                <style>
                    body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    }

                    .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }

                    .header {
                    background-color: #f44336;
                    color: white;
                    text-align: center;
                    padding: 20px;
                    border-radius: 10px 10px 0 0;
                    }

                    .header h1 {
                    margin: 0;
                    }

                    .content {
                    background-color: #fddede;
                    padding: 20px;
                    text-align: center;
                    }

                    .content p {
                    font-size: 18px;
                    color: #333333;
                    }

                    .appointment-card {
                    margin: 20px auto;
                    background-color: #fdeaea;
                    border-left: 5px solid #f44336;
                    padding: 15px;
                    border-radius: 10px;
                    text-align: left;
                    }

                    .appointment-card h2 {
                    margin: 0 0 10px;
                    color: #d32f2f;
                    }

                    .appointment-card p {
                    margin: 5px 0;
                    font-size: 16px;
                    }

                    .footer {
                    text-align: center;
                    padding: 20px;
                    color: #666666;
                    font-size: 14px;
                    }

                    p a {
                    font-weight: bold;
                    color: #f44336;
                    text-decoration: none;
                    }
                </style>
                </head>
                <body>

                <div class="email-container">
                    <!-- Header -->
                    <div class="header">
                    <h1>Appointment Canceled</h1>
                    </div>

                    <!-- Content -->
                    <div class="content">
                    <p>Dear ${username},</p>
                    <p>Unfortunately, your appointment with the pet doctor has been canceled. We apologize for the inconvenience. Below are the details of your canceled appointment:</p>

                    <!-- Appointment Card -->
                    <div class="appointment-card">
                        <h2>Canceled Appointment Details</h2>
                        <p><strong>Pet Owner's Name:</strong> ${appointment.name} ${appointment.lastname}</p>
                        <p><strong>Pet's Name:</strong> ${appointment.petname}</p>
                        <p><strong>Pet Type:</strong> ${appointment.pettype}</p>
                        <p><strong>Doctor:</strong> Dr. ${appointment.doctor.name}</p>
                        <p><strong>Doctor's Email:</strong> ${appointment.doctor.contact}</p>
                        <p><strong>Place:</strong> ${appointment.doctor.organisation}</p>
                        <p><strong>Fees:</strong> ${appointment.doctor.fees}</p>
                        <p><strong>Date:</strong> ${appointment.date.split('-').reverse().join('/')}</p>
                        <p><strong>Time:</strong> ${appointment.timeSlot}</p>
                    </div>

                    <p>We apologize for any inconvenience this may have caused. Please feel free to reschedule your appointment by <a href="http://localhost:3000/doctors">Visiting Our Website</a>.</p>
                    </div>

                    <!-- Footer -->
                    <div class="footer">
                    <p>If you have any questions, feel free to <a href="mailto:${appointment.doctor.contact}">contact us</a>.</p>
                    <p>Thank you for understanding.</p>
                    </div>
                </div>

                </body>
                </html>
            `

    };

    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse

}