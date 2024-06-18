const adminMiddleware = async (req, res, next) => {
  try {
    console.log(req.user); //  req.user property defined in auth-middleware can be easily accessed by admin-middleware
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      return res
        .status(403)
        .json({ message: "Access denied. User is not an Admin" });
    }
    next(); //if user is an Amin proceed to nextmiddleware
    // res.status(200).json({ msg: req.user.isAdmin });
  } catch (error) {
    next(error);
  }
};
module.exports = adminMiddleware;
