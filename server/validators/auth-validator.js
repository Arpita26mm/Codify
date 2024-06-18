const { z } = require("zod");

//creating an object schema
const signupschema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast of 3 chars" })
    .max(255, { message: "Name must be not more than 255 chars" }),
  email: z
    .string({ required_error: "email is required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "email must be atleast of 3 chars" })
    .max(255, { message: "email must be not more than 255 chars" }),
  phone: z
    .string({ required_error: "phone is required" })
    .trim()
    .min(10, { message: "phone must be atleast of 10 chars" })
    .max(20, { message: "phone must be not more than 20 chars" }),
  password: z
    .string({ required_error: "password is required" })
    .min(4, { message: "password must be atleast of 4 chars" })
    .max(1024, { message: "Name must be not more than 1024 chars" }),
});
module.exports = signupschema;
