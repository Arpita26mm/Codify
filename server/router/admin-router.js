const express = require("express");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const router = express.Router();

router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);

router
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminController.getUserById);

router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateUserById);

router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);
//-----------------------------------------------------------------
router
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, adminController.getAllContacts);
//-----------------------------------------------------------------
router
  .route("/create-prob")
  .post(authMiddleware, adminMiddleware, adminController.createProblem);
router
  .route("/probs")
  .get(authMiddleware, adminMiddleware, adminController.getAllProblems);
router.route("/probs/:id").get(authMiddleware, adminController.getProblemById);
router
  .route("/probs/update-prob/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateProblemById);
router
  .route("/probs/delete-prob/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteProblemById);
module.exports = router;
