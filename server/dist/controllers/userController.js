"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUser = exports.getAllUsers = void 0;

var _models = require("../models");

var _Responses = require("../responses/Responses");

const getAllUsers = async (req, res, next) => {
  try {
    const data = await _models.User.find();
    res.send({
      name: 'User Route',
      data
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = getAllUsers;

const createUser = async req => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const expName = req.body.expName;
    const gender = req.body.gender;
    const title = req.body.title;
    const education = req.body.education;
    const expNumber = req.body.expNumber;

    if (email == undefined || email == null || email === "") {
      return (0, _Responses.getErrorMessageResponse)("Email Missing, Please Send Email Field", req.body, 400);
    } else if (password == undefined || password == null || password === "") {
      return (0, _Responses.getErrorMessageResponse)("password Missing, Please Send password Field", req.body, 400);
    } else if (gender == undefined || gender == null || gender === "") {
      return (0, _Responses.getErrorMessageResponse)("gender Missing, Please Send gender Field", req.body, 400);
    } else if (name == undefined || name == null || name === "") {
      return (0, _Responses.getErrorMessageResponse)("name Missing, Please Send name Field", req.body, 400);
    } else if (expName == undefined || expName == null || expName === "") {
      return (0, _Responses.getErrorMessageResponse)("expName Missing, Please Send expName Field", req.body, 400);
    } else if (title == undefined || title == null || title === "") {
      return (0, _Responses.getErrorMessageResponse)("title Missing, Please Send title Field", req.body, 400);
    } else if (education == undefined || education == null || education === "") {
      return (0, _Responses.getErrorMessageResponse)("education Missing, Please Send education Field", req.body, 400);
    } else if (expNumber == undefined || expNumber == null || expNumber <= 0) {
      return (0, _Responses.getErrorMessageResponse)("expNumber Missing, Please Send expNumber Field", req.body, 400);
    } else {
      if (gender === "male" || gender === "female") {
        const data = await _models.User.create({
          email: email,
          expNumber: expNumber,
          education: education,
          title: title,
          expName: expName,
          name: name,
          password: password,
          gender: gender
        }).then(e => {
          return (0, _Responses.getSuccessResponse)("Data Saved", e);
        }).catch(e => {
          return (0, _Responses.getErrorResponse)(e, req.body, 500);
        });
        return (0, _Responses.getSuccessResponse)("Data Saved", data);
      } else {
        return (0, _Responses.getErrorMessageResponse)("gender Should be male or female only", req.body, 400);
      }
    }
  } catch (ex) {
    return (0, _Responses.getErrorResponse)(ex, req.body, 500);
  }
};

exports.createUser = createUser;