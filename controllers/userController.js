const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email: email });
    const user = new User();

    if (email && password) {
      if (password?.length >= 8) {
        if (!checkUser) {
          const data = {
            email: email,
            password: password,
          };
          user.email = email;
          user.password = password;

          try {
            user.save();

            res.json({
              message: "reqister success",
              data: {
                email: data.email,
              },
            });
          } catch (error) {
            res.json({
              message: error,
            });
          }
        } else {
          res.json({
            message: "user already registered",
          });
        }
      } else {
        res.json({
          message: "password min 8 characters",
        });
      }
    } else {
      res.json({
        message: "email or password cannot be empty",
      });
    }
  },
  signIn: async (req, res, next) => {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email: email });

    if (email && password) {
      if (checkUser) {
        const uPassword = await bcrypt.compareSync(
          password,
          checkUser.password
        );

        if (uPassword) {
          try {
            // delete checkUser.password;
            checkUser.password = undefined;
            res.json({
              message: "login success",
              data: checkUser,
            });
          } catch (error) {
            res.json({
              message: error,
            });
          }
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
      });
    }
  },
};
