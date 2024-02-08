const nodemailer = require("nodemailer");

module.exports.send = async (totalUsers) => {
    try {

       const mail=[]= totalUsers; 
     const mail1 =  mail.map((x)=>{
 return x.email
       });

       console.log("dddd",mail1)
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Example service provider (replace with your own)
            auth: {
                user: 'madhurgarg87@gmail.com',
                pass: 'wzgp xjjj efqc kyor'
            }
        });

        const mailOptions = {
            from: 'madhurgarg87@gmail.com',
            to: mail1,
            subject: 'New Book is Released',
            text: 'This New book is Relased today'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (error) {
        console.error("EmailService", error);
    }
};

