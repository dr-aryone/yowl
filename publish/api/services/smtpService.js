'use strict'
const nodemailer = require('nodemailer')

module.exports = function (host, port, useSecure, useAuthentication, username, password) {
  let settings = {
    host: host,
    port: port,
    secure: useSecure
  }

  if (useAuthentication) {
    settings.auth = {
      user: username,
      pass: password
    }
  }

  let transporter = nodemailer.createTransport(settings)

  return {
    send (from, to, subject, body, callback) {
      let mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: body
      }

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          callback({
            success: false,
            error: err
          })
          return
        }

        callback({
          success: true
        })
      })
    }
  }
}
