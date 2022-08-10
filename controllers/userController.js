const User = require('../models/User')

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const { email, password } = req.body
            if (email && password) {

                const user = await User.find({ email: email })

                if (!user) {
                    user.email = email
                    user.password = password
                    user.save()

                    res.json({
                        message: 'reqister success',
                        data: {
                            email: user.email
                        }
                    })
                } else {
                    res.json({
                        message: 'reqister failed'
                    })
                }
            } else {
                res.json({
                    message: 'email and password cannot empty'
                })
            }
        } catch (error) {
            res.json({
                message: error.message
            })
        }

    },
    signIn: (req, res, next) => {

    },
}