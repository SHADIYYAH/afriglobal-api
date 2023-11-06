require("dotenv").config();
const { findOne, insertOne } = require("../repository");
const { userValidation } = require("../validations/user");
const { Users } = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { hashPassword, comparePassword, generateOtp } = require("../utils");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { firstname, lastname, email, phone, password } = req.body;
  try {
    const { error } = userValidation(req.body);
    if (error != undefined) throw new Error(error.details[0].message);

    const checkIfUserExists = await Users.findOne({ email: email });
    if (checkIfUserExists !== null) throw new Error("User already exists");

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
    await createNewUser.save();
    res.status(201).json({
      status: "success",
      message: "User created successfully",
    });

    const _otp = generateOtp(4);
    const dataToInsert = {
      otp_id: uuidv4(),
      email: email,
      otp: _otp,
    };

    await insertOne("Users", createNewUser);

    res.status(201).json({
      status: true,
      message: "Account created",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw new Error("All fields are required");
    const checkIfUserExists = await Users.findOne({ email: email });
    if (checkIfUserExists == null) throw new Error("Invalid email or password");

    const checkPasswordMatch = await comparePassword(
      password,
      checkIfUserExists.passwordHash
    );
    if (!checkPasswordMatch) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: checkIfUserExists._id },
      process.env.JWT_SECRET
    );

    res.cookie(access_token, token, { httpOnly: true }).status(200).json({
      status: "success",
      message: "User login succesfully",
      checkIfUserExists,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "User does not exist",
    });
  }
};

module.exports = { register, login };
