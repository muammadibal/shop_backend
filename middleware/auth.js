const res = require('express/lib/response')
const jwt = require('jsonwebtoken')

module.exports = {
    auth: function (req, file, next) {
        try {
            const decoded = jwt.verify(req.headers.token, 'secret')
            if (decoded) {
                req.user = decoded.user
                next()
            }
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' })
        }
    }
}