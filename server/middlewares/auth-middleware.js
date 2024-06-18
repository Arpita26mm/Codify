//yhi pr mei jwt token ko verify krne wla hu ki token valid h ki ni (token is there ...mtlb user has logged in) (token valid?? mera theory => i.e. token time expire to ni hogya )

//agr token valid hoga to user ka data get kr k mai mere req.user m apna kud ka custom property bna k usme vo user ka data pass kr dunga fir koi bi ab usko easily access kr pyga

//jwt.sign ->jwt.sign(payload{userId, email, isAdmin}, secretkey, expiry time) used when token generate krna hota h
//jwt.verify -> jwt.verify(token from frontend , secretKey )
//If (token == valid)-->data we get ={userId, email, admin}
//only after this middleware check-> we can access the user's data by extracting his data using his emailId or userId from the user model

const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  //if token not valid
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP , Token not provided" });
  }

  //console.log("token from auth middleware", token);

  //Assuming token is in format "Bearer <jwtToken> , Remove the Bearer prefix"

  const jwtToken = token.replace("Bearer", "").trim();

  console.log("jwtToken from auth middleware", jwtToken);
  //now I have got the token...So I need to verify it now

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_secret_key);
    console.log(isVerified); //isVerified={userId, email, isAdmin} <-- Remember this was passed in jwt,sign() when jwtToken creation

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log(userData); //got all the data of user
    req.user = userData;
    req.token = token;
    req.userId = userData._id;
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid Token" });
  }
  next();
};

module.exports = authMiddleware;
