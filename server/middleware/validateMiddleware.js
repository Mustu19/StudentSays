const validate = (schema) => async (req, res, next) => {
  console.log("Validating request body:", req.body);
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    console.log("Validation successful:", parsedBody);
    return next();
  } catch (err) {
    console.error("Validation failed:", err);
    const status = 422;
    const message = "Fill the input properly";
    const extraDetails = err.errors.map((issue) => issue.message);

    const error = {
      status,
      message,
      extraDetails,
    };

    res.status(status).json(error);
  }
};

export default validate;
