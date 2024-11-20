module.exports = function (req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next()
    } else {
        res.status(403).send('Forbidden')
    }
}