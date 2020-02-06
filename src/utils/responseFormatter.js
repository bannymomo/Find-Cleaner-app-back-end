function responseFormatter(res, code, message, finalPostData) {
  res.status(code).json({
    status: code === 200 ? "success" : "error",
    message: message,
    data: finalPostData
  });
}

module.exports = responseFormatter;
