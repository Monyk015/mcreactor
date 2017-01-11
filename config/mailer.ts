let nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport('smtps://monyashadow@gmail.com:Geopardus123@smtp.gmail.com')

export default function sendEmail(targetEmail, postId) {
    let mailOptions = {
        to: targetEmail,
        subject: 'New best post in your subscribed',
        html: `<p>
                <a href="http://localhost:3000/#/post/${postId}">Here it is</a>
               </p>`
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error)
        {
            return console.log(error)
        }
        console.log('Message sent: ' + info.response + ' target email: ' + targetEmail)
    })
}