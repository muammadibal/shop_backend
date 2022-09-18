const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const nodeMailer = require("nodemailer")
const randtoken = require("rand-token")

module.exports = {
    signIn: async (req, res, next) => {
        const { email, password } = req.body;

        try {
            if (email && password) {
                const checkUser = await User.findOne({ email: email });

                if (checkUser) {
                    const checkPassword = await bcrypt.compare(
                        password,
                        checkUser.password
                    );

                    if (checkPassword) {
                        // delete checkUser.password
                        checkUser.password = undefined;

                        const token = jwt.sign({
                            user: checkUser
                        }, 'secret')

                        res.json({
                            message: "login success",
                            data: token,
                        });
                    } else {
                        res.json({
                            message: "wrong password",
                        });
                    }
                } else {
                    res.json({
                        message: "user not found",
                    });
                }
            } else {
                res.json({
                    message: "email or password cannot be empty",
                    data: null
                });
            }
        } catch (error) {
            res.json({
                message: error?.message,
                data: null
            });
        }
    },
    signUp: async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const checkUser = await User.findOne({ email: email });

            if (email && password) {

                if (!checkUser) {
                    const user = await User.create({
                        email,
                        password: bcrypt.hashSync(password, 10)
                    });

                    res.json({
                        message: "reqister success",
                        data: {
                            userType: user.userType,
                            _id: user.id,
                            email: user.email
                        },
                    });
                } else {
                    res.json({
                        message: "user already registered",
                    });
                }
            } else {
                res.json({
                    message: "email or password cannot be empty",
                    data: null
                });
            }
        } catch (error) {
            res.json({
                message: error?.message,
                data: null
            });
        }
    },
    editUser: async (req, res, next) => {
        const { email, oldPassword, newPassword } = req.body;

        try {
            if (email && oldPassword && newPassword) {
                const checkUser = await User.findOne({ email: email });

                if (checkUser) {
                    const checkPassword = await bcrypt.compare(
                        oldPassword,
                        checkUser.password
                    );

                    if (checkPassword) {
                        const user = await User.findOneAndUpdate({
                            email,
                            password: bcrypt.hashSync(newPassword, 10)
                        })

                        user.password = undefined

                        res.json({
                            message: "update user success",
                            data: user,
                        });
                    } else {
                        res.json({
                            message: "wrong password",
                        });
                    }
                } else {
                    res.json({
                        message: "user not found",
                    });
                }
            } else {
                res.json({
                    message: "email or password cannot be empty",
                    data: null
                });
            }
        } catch (error) {
            res.json({
                message: error?.message,
                data: null
            });
        }
    },
    forgotPassword: async (req, res, next) => {
        const { email } = req.body;

        try {
            if (email) {
                const checkUser = await User.findOne({ email: email });

                if (checkUser) {
                    let token = randtoken.generate(20)
                    checkUser.resetPasswordToken = token
                    checkUser.resetPasswordExpired = Date.now() + 3600000
                    checkUser.save()

                    const smtpTransport = nodeMailer.createTransport('gmail', {
                        auth: {
                            user: process.env.MAILER_EMAIL,
                            pass: process.env.MAILER_PASSW
                        }
                    })

                    const mailOptions = {
                        to: checkUser.email,
                        from: 'shopbackend@mail.com',
                        subject: 'Node.js Password Reset',
                        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                            'http://' + req.headers.host + '/password-reset/' + token + '\n\n' +
                            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                    }

                    smtpTransport.sendMail(mailOptions, function (err) {
                        res.json({
                            message: `An e-mail has been sent to ${checkUser.email} with further instructions.`,
                        });
                    })
                } else {
                    res.json({
                        message: "user not found",
                    });
                }
            } else {
                res.json({
                    message: "email or password cannot be empty",
                    data: null
                });
            }
        } catch (error) {
            res.json({
                message: error?.message,
                data: null
            });
        }
    },
    resetPassword: async (req, res, next) => {
        try {
            const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })

            if (user) {
                user.password = undefined
                user.resetPasswordToken = undefined
                user.resetPasswordExpired = undefined
                user.save()

                res.json({
                    message: "Reset your password",
                    data: user
                });

            } else {
                res.json({
                    message: "Password reset token is invalid or has expired.",
                    data: null
                });
            }
        } catch (error) {
            res.json({
                message: error?.message,
                data: null
            });
        }
    },
    updatePassword: async (req, res, next) => {
        const { email, password } = req.body;
        try {
            if (email && password) {
                const checkUser = await User.findOne({ email: email });

                if (checkUser) {
                    const user = await User.findOneAndUpdate({
                        email,
                        password: bcrypt.hashSync(password, 10)
                    })

                    user.password = undefined

                    res.json({
                        message: "update password success",
                        data: user,
                    });
                } else {
                    res.json({
                        message: "user not found",
                    });
                }
            } else {
                res.json({
                    message: "email or password cannot be empty",
                    data: null
                });
            }
        } catch (error) {
            res.json({
                message: error?.message,
                data: null
            });
        }
    }
};
