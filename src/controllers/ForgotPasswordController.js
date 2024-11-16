const db = require('../config/connectDB')


class LoginController {
    getForgotPasswordForm(req, res) {
        return res.render('forgot_password', {
            layout: 'layouts/login'
        })
    }
}

module.exports = new LoginController()
