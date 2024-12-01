const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

//these allow us to simoly say throw new Error in our code whenever we have an issue
//Simply saying res.status(404, message ( {{something something}})) sometimes doesn't work as other internal error handlers
//such as a casr error in mongodb can take over and display something else
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  //Check for Mongoose bad ObjectId or Cast Error
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "🎂" : err.stack,
  });
};

export { notFound, errorHandler };
