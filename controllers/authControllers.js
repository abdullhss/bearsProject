const User = require("../models/accountsSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");


require("dotenv").config();




const register = (req, res, next) => {
  User.findOne({ Name: req.body.Name }).then((result) => {
    if (result) {
      res.json({
        message: "Username already exists ! ",
      });
    } else {
      bcrypt.hash(req.body.Password, 10, function (err, hashedPass) {
        if (err) {
          res.json({
            error: err,
          });
        }

        let user = new User({
          Name: req.body.Name,
          Password: hashedPass,
        });
        console.log(user)
        user
          .save()
          .then((result) => {
            let token = jwt.sign(
              { Id: user.id, Name: user.Name },
              process.env.SECRET_KEY,
              {
                expiresIn: "30h",
              }
            );

            res.cookie("token", token, { httpOnly: true });
            //res.redirect("/login");
            res.redirect("/addExam")
          })
          .catch((error) => {
            console.log(error)
            res.json({
              message: "An error occured ! ",
            });
          });
      });
    }
  });
};

const login = (req, res, next) => {
  console.log(req.body);
  User.findOne({ Name: req.body.Name })
    .then((user) => {
      if (user) {
        if (!user.verified) {
          res.json({
            status: "failed",
            message: "User is not verified",
          });
        } else {
          bcrypt.compare(
            req.body.Password,
            user.Password,
            function (err, result) {
              if (err) {
                res.json({
                  error: err,
                });
              }
              if (result) {
                let token = jwt.sign(
                  { Id: user.id, Name: user.Name },
                  process.env.SECRET_KEY,
                  {
                    expiresIn: "1h",
                  }
                );

                res.cookie("token", token, { httpOnly: true });
                res.redirect("/home");
                // res.json({
                //     message: 'login successfully !' ,
                //     token:token

                // })
              } else {
                res.render("logIn");
              }
            }
          );
        }
      } else {
        res.json({
          message: "no user found !",
        });
      }
    })
    .catch((err) => {
      res.json(err);
    });
};



module.exports = { register, login  };
