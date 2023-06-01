const { json } = require("express");

 const apiError = (status, message) => {
    const err = new Error()
    err.status = status;
    err.message = message;
    return json({ msg: err });
}

module.exports = apiError;