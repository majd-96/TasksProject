"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSuccessResponse = exports.getErrorMessageResponse = exports.getErrorResponse = void 0;

/**
 * Return Same Erorr Response As a Json Response
 * @param {The Catched Exception} exception 
 * @param {The Passed Parameters} reqBody 
 * @param {Response Code} code 
 * @returns Json Error Object
 */
let getErrorResponse = (exception, reqBody, code) => {
  return {
    message: exception.message,
    params: reqBody,
    code: code
  };
};
/**
 * Return Same Erorr Response As a Json Response
 * @param {Message Validation} message 
 * @param {The Passed Parameters} reqBody 
 * @param {Response Code} code 
 * @returns Json Error Object
 */


exports.getErrorResponse = getErrorResponse;

let getErrorMessageResponse = (message, reqBody, code) => {
  return {
    message: message,
    params: reqBody,
    code: code
  };
};

exports.getErrorMessageResponse = getErrorMessageResponse;

let getSuccessResponse = (message, value, code) => {
  return {
    message: message,
    data: value,
    code: code
  };
};

exports.getSuccessResponse = getSuccessResponse;