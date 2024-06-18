const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const problemController = require("../controllers/problem-controller");

router.route("/").get(authMiddleware, problemController.AllProblemsHomePage);
router.route("/:id").get(authMiddleware, problemController.getProblemById1);

router.route("/run/:id").post(authMiddleware, problemController.RunCode);
router.route("/submit/:id").post(authMiddleware, problemController.SubmitCode);

module.exports = router;
