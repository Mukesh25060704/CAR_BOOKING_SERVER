const express = require("express");
const app = express();
const schema = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

exports.create = async (req, res) => {
  if (
    req.body.email === "" ||
    req.body.password === "" ||
    req.body.name === "" ||
    req.body.phonenumber === ""
  ) {
    res.json({ message: "all feilds are requried" });
  }
  //  else if(req.body.email===''){
  //     res.json({message:"enter the email"})
  // }
  // else if(req.body.password===''){
  //     res.json({message:"enter the password"})
  // }
  else {
    const exuser = await schema.findOne({ email: req.body.email });
    try {
      const hashedpassword = await bcrypt.hash(req.body.password, saltRounds);
      if (!exuser) {
        const lastDocument = await schema.findOne(
          {},
          { userid: 1 },
          { sort: { userid: -1 } }
        );
        let nextId = 1; // Default value for the first document
        if (lastDocument) {
          nextId = lastDocument.userid + 1;
        }
        const user = await schema
          .create({
            userid: nextId,
            email: req.body.email,
            name: req.body.name,
            phonenumber: req.body.contact,
            address: req.body.address,
            age: req.body.age,
            city: req.body.city,
            pincode: req.body.pincode,
            password: hashedpassword,
          })

          .then((user) => {
            const token = jwt.sign(
              {
                user: {
                  userid: user._id,
                  email: user.email,
                },
              },
              process.env.TOKEN_KEY
            );

            // save user token

            res.json({ message: "account created successfully", token });
          });
      } else {
        res.json({ message: `${req.body.email} is already existing` });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
exports.Login = async (req, res) => {
  const exuser = await schema.findOne({ email: req.body.email });
  if (exuser) {
    if (await bcrypt.compare(req.body.password, exuser.password)) {
      const token = jwt.sign(
        {
          user: {
            userid: exuser._id,
            email: exuser.email,
          },
        },
        process.env.JWTKEY
      );

      // save user token

      // user
      res.status(200).json({ token, message: "sucesss" });
    } else {
      res.staus(400).json({ message: "wrong password" });
    }
  } else {
    res.status(400).json({ message: "User Not Found" });
  }
};

exports.userprofile = async (req, res) => {
  const user = req.user;
  const userprofile = await schema.findOne({ userid: user.userid });
  res.json({ message: "success", userprofile });
};

exports.userupdate = async (req, res) => {
  const user = req.user;
  if (
    req.body.useremail === "" ||
    req.body.username === "" ||
    req.body.userphonenumber === "" ||
    req.body.useraddress === ""
  ) {
    res.json({ message: "all fields are required" });
  } else {
    const updateuser = await schema.findOneAndUpdate(
      { userid: user.userid },
      {
        email: req.body.useremail,
        name: req.body.username,
        phonenumber: Number(req.body.userphonenumber),
        address: req.body.useraddress,
      }
    );
    res.json({ message: "success" });
  }
};
