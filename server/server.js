require("dotenv").config(); //786768
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router.js");
const adminRoute = require("./router/admin-router.js");
const problemRoutes = require("./router/problem-router.js");
const connectdb = require("./utils/db");
const errormiddleware = require("./middlewares/error-middleware");
const authMiddleware = require("./middlewares/auth-middleware");

//Handling cors policy issue
// place cors at top bcoz hme sbse phle is 5173 port ko access dena prega ...tbhi aage kch hoga...
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/admin", adminRoute);
app.use("/api/problems", problemRoutes);

//clearing server.js
//create route   /=home pg
// app.get("/",(req,res)=>{
//     res.status(200).send("Welcome to Home pg ");
// });

//ek aur route bnaya
// app.get("/register",(req,res)=>{
//     res.status(200).send("Welcome to registration pg ");
// });
app.use(errormiddleware); //hmare express app ko error-middleware k bare m btane k liye
//v.v.Imp....mtlb connection create krne s phle hi hm check krre h...if (error)->then No connection
const port = 5000;

connectdb()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running at port:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });
