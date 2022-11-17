class CustomError extends Error {
  constructor(error) {
    super(error.message);
    this.code = error.code;
    this.message = error.message;
  }
}

module.exports = CustomError;
