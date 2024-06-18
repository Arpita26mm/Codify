const User = require("../models/user-model"); //here, user is a collection whuch has all data inside it
const bcrypt = require("bcryptjs");
//home logic
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to authorisation page using controller");
  } catch (error) {
    console.log(error);
  }
};
const register = async (req, res) => {
  try {
    console.log(req.body);

    const { username, email, phone, password } = req.body;

    const userexist = await User.findOne({ email: email });

    if (userexist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    //hash the pswd
    //  const saltround=10;
    //  const hash_password= await bcrypt.hash(password,saltround);
    const usercreated = await User.create({
      username,
      email,
      phone,
      password,
    });
    // password:hash_password});

    res.status(201).json({
      // msg : usercreated,
      msg: "registration successful",
      token: await usercreated.generateToken(), //mistake: camelcase written in small
      userId: usercreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json("internal server error1");
    //next(error);
  }
};

//--------------------------------------------------------------------------------------------//
//user login logic

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userexist = await User.findOne({ email }); //userexist contains all the data of user (not only email)
    console.log(userexist);
    //naya email
    if (!userexist) {
      return res.status(400).json({ message: "Invalid Credential" });
    }

    //const user = await bcrypt.compare(password, userexist.password);  //comparing pswd in dB and pswd entered by user
    const user = await userexist.comparePassword(password);

    //old email (already registered) but entered wrong pswd

    if (user) {
      res.status(200).json({
        // msg : usercreated,
        msg: "login successful", //                 when somebody does login, then as response his {msg, token, userId}=json data are send
        token: await userexist.generateToken(),
        userId: userexist._id.toString(),
        isAdmin: userexist.isAdmin,
      });
    } else {
      res.status(401).json({ message: "invalid email or password" });
    }
  } catch (error) {
    res.status(500).json("internal server error2");
    next(error);
  }
};

//---------------------------------------------------------------------------------------------//
// To send currently logged In user's data in frontend : User Logic

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(user);

    return res.status(200).json({ userData }); //pass to frontend
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};

module.exports = { home, register, login, user };
