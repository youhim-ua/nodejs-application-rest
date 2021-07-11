const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

const sendVerifyMail = (userEmail, verifyToken) => {
  const link = `localhost:8080/api/users/verify/${verifyToken}`

  const msg = {
    to: `${userEmail}`,
    from: 'chechy201192@gmail.com',
    subject: 'Confirmation later',
    text: `Please, confirm your email and finish registration by the link: ${link}`,
    html: `<span>Please, confirm your email and finish registration by the link: <a href="${link}" target="_blank">${link}</a></span>`,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error.message)
    })
}

module.exports = {
  sendVerifyMail
}
