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

const createUser = req => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const expName = req.body.expName;
    const title = req.body.title;
    const education = req.body.education;
    const expNumber = req.body.expName;
    console.log("Step 1");

    if (email == undefined || email == null || email === "") {
      return (0, _Responses.getErrorMessageResponse)("Email Missing, Please Send Email Field", req.body, 400);
    } else if (password == undefined || password == null || password === "") {
      return (0, _Responses.getErrorMessageResponse)("password Missing, Please Send password Field", req.body, 400);
    } else if (name == undefined || name == null || name === "") {
      console.log("Step 2");
      return (0, _Responses.getErrorMessageResponse)("name Missing, Please Send name Field", req.body, 400);
    } else if (expName == undefined || expName == null || expName === "") {
      return (0, _Responses.getErrorMessageResponse)("expName Missing, Please Send expName Field", req.body, 400);
    } else if (title == undefined || title == null || title === "") {
      return (0, _Responses.getErrorMessageResponse)("title Missing, Please Send title Field", req.body, 400);
    } else if (education == undefined || education == nulleducation || title === "") {
      return (0, _Responses.getErrorMessageResponse)("education Missing, Please Send education Field", req.body, 400);
    } else if (expNumber == undefined || expNumber == nulleducation || expNumber <= 0) {
      return (0, _Responses.getErrorMessageResponse)("expNumber Missing, Please Send expNumber Field", req.body, 400);
    } else {
      console.log("Step 3");
      return (0, _Responses.getSuccessResponse)("Data Saved", {
        email: email,
        expNumber: expNumber,
        education: education,
        title: title,
        expName: expName,
        name: name,
        password: password
      });
    } // const queryInstance = new SomeModel({
    // });

  } catch (ex) {
    console.log("Step 4");
    return (0, _Responses.getErrorResponse)(ex, req.body, 500);
  }
};

exports.createUser = createUser;