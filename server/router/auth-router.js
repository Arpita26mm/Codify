const express = require("express");
const router = express.Router();

const authcontrollers = require("../controllers/auth-controller");
const signupschema = require("../validators/auth-validator");
const loginschema = require("../validators/login-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authcontrollers.home); //another way of app.get(path,(req,res)=>{}) is by using router like this

router
  .route("/register")
  .post(validate(signupschema), authcontrollers.register);
router.route("/login").post(validate(loginschema), authcontrollers.login);

router.route("/user").get(authMiddleware, authcontrollers.user); // authMiddleware: to check whether user has jwt token or not(i.e. he is logged in or not)

module.exports = router;
