class ErrorHandler {
  handleError(message, e) {
    alert(message);
    console.log(e);
  }
}

export default new ErrorHandler();