//middleware--> parseAsync(arg=user filled data) method : zod k thru jo schema define kiya usko validate krna prega

const validate = (schema) => async (req, res, next) => {
  try {
    const parsebody = await schema.parseAsync(req.body);
    req.body = parsebody;
    next();
  } catch (err) {
    // console.log(err);
    // console.log(err.errors);
    // console.log(err.issues);
    const status = 422;
    const message = "Fill the input properly";
    const extradetails = err.errors[0].message;
    const error = {
      status,
      message,
      extradetails,
    };

    console.log(error);
    console.log("nckjsdn");
    //res.status(400).json({msg:message});
    next(error);
  }
};
module.exports = validate;
