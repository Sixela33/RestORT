function errorHandler(err, req, res, next) {
    console.error(err.stack);
  
    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Something went wrong';
  
    res.status(statusCode).json({ error: errorMessage });
  }

export default errorHandler