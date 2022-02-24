const __ = require("multi-lang")();

module.exports = {
  responseData: (message = "", result = {}, status, req) => {
    //const language = req.headers.language ? req.headers.language : "en";
    const language = "en";
    var response = {};
    response.status = status || 200;
    response.message =
      __(message, language) || __("SOMETHING_WENT_WRONG", language);
    response.data = result;
    return response;
  },
  setMessage: (message, language) => {
    return __(message, language);
  },
};
