const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); //mistake:forgot writing this
const jwt = require("jsonwebtoken");
const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true, //mistake : required hoga (require nahi)
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//secure the pswd with bcrypt
userschema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltround = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltround);
    user.password = hash_password;
  } catch (error) {
    //console.log("try block inside pre method working",this);      debug line
    next(error); //can skip this line also
  }
});

//compare the password
userschema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//json web token
userschema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        //to return jwt
        userId: this._id.toString(), //1. payload
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_secret_key, //2. signature
      {
        expiresIn: "30d", //3. expiresIn (optional)
      }
    );
  } catch (error) {
    console.error(error);
  }
};

//define model or collection name

const User = new mongoose.model("User", userschema);

module.exports = User;
