require("dotenv").config();
const {  insertOne } = require("../repository");
const {  findOne } = require("../repository");

const { userValidation } = require("../validations/user");
const { Users } = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { hashPassword, comparePassword, generateOtp } = require("../utils");
const Otp = require("../models/otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const API_KEY = process.env.API_KEY;
// const DOMAIN = process.env.DOMAIN;

const register = async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;
  // const { otp } = req.params;
  try {
    const { error } = userValidation(req.body);
    if (error != undefined) throw new Error(error.details[0].message);

    const checkIfUserExists = await Users.find({ email: email });
    if (checkIfUserExists ) throw new Error("User already exists");

    const { hash, salt } = await hashPassword(password);
    const createNewUser = new Users({
      user_id: uuidv4(),
      firstname,
      lastname,
      email,
      phone,
      passwordHash: hash,
      passwordSalt: salt,
    });

    const otp = generateOtp(4);

    const dataToInsert = {
     
      email: email,
      otp: otp,
    };
    
    await insertOne("Users", createNewUser);
    await insertOne("Otp", dataToInsert);
    console.log(dataToInsert);

    const newUser = await createNewUser.save();

    console.log(newUser);

    res.status(201).json({
      status: true,
      message: "Account created",
      data: newUser,
    });
  } catch (error) {
    // next(error);
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error",
    });

  }
};



const verifyUserAccount = async (req, res) => {
  const { otp, email } = req.params;
  if (!otp || !email) {
    res.status(400).json({
      status: false,
      message: "Bad request",
    });
    return;
  }
  try {
    const otpData = await Otp.find({
      
        email: email,
        otp: otp,
     

    });
    if (!otpData) {
      res.status(400).json({
        status: false,
        message: "Invalid otp",
      });
      return;
    }


    res.status(200).json({
      status: true,
      message: "Account verified successfully",
    });
    return;
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};
// const login = async (req, res) => {
//   //login user
//   const { email, password } = req.body;
//   try {
//     if (!email || !password) throw new Error("All fields are required");
//     const checkIfUserExists = await Users.findOne({
//       email: email,
//       password: password,
//     });
//     if (checkIfUserExists == null) throw new Error("Invalid email or password");
    

//     const dataToaddInMyPayload = {
//       email: checkIfUserExists.email,
//       _id: uuidv4(),
//     };

//     const compareHash = await comparePassword(
//       password,
//       checkIfUserExists.passwordHash
//     );
//     if (!compareHash) throw new Error("Invalid email or password");

//     const token = jwt.sign(dataToaddInMyPayload, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.status(200).json({
//       status: true,
//       message: "Login successful",
//       token: token,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };



const login = async (req, res) => {
  //login user
  const { email, password } = req.body;
  try {
    if (!email || !password) throw new Error("All fields are required");
    const checkIfUserExists = await Users.findOne({
      where: { email: email },
    });
    if (!checkIfUserExists ) throw new Error("Invalid data");

    let payload;
    let accessToken;

    // const dataToaddInMyPayload = {
    //   email: checkIfUserExists.email,
    //   _id: uuidv4(),
    // };

    const compareHash = await comparePassword(
      password,
      checkIfUserExists.passwordHash
    );
    if (!compareHash) throw new Error("Invalid email or password");

    const token =jwt.sign(dataToaddInMyPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      status: true,
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};
// const getUser = (email) => {
//   return Users.findOne({
//     where: {
//       email: email,
//     },
//   });
// };

module.exports = { register, login, verifyUserAccount};
