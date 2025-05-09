module.exports = {
  successResponse: (res, message, data) => {
    return res.status(200).json({
      status: true,
      message,
      data,
    });
  },
  errorResponse: (res, messgae) => {
    return res.status(400).json({
      status: false,
      messgae,
    });
  },
  alreadyExist: (res, message = "Already exists") => {
    return res.status(409).json({
      success: false,
      message,
    });
  },
  catchError: (res, message, err) => {
    return res.status(500).json({
      status: false,
      message,
      err,
    });
  },
};
