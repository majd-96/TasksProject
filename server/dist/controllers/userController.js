"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDefaultAdmin = exports.applyUnVerifiedUsers = exports.updateUserStatus = exports.login = exports.createUser = exports.getAllUsers = void 0;

var _models = require("../models");

var _Responses = require("../responses/Responses");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _mongoose = require("mongoose");

var _nodemailer = require("../models/nodemailer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
}; // This Called From Second Screen In Frontend Project To Create Account From Users


exports.getAllUsers = getAllUsers;

const createUser = async (req, res) => {
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
      res.json((0, _Responses.getErrorMessageResponse)("Email Missing, Please Send Email Field", req.body, 400));
    } else if (password == undefined || password == null || password === "") {
      res.json((0, _Responses.getErrorMessageResponse)("password Missing, Please Send password Field", req.body, 400));
    } else if (gender == undefined || gender == null || gender === "") {
      res.json((0, _Responses.getErrorMessageResponse)("gender Missing, Please Send gender Field", req.body, 400));
    } else if (name == undefined || name == null || name === "") {
      res.json((0, _Responses.getErrorMessageResponse)("name Missing, Please Send name Field", req.body, 400));
    } else if (expName == undefined || expName == null || expName === "") {
      res.json((0, _Responses.getErrorMessageResponse)("expName Missing, Please Send expName Field", req.body, 400));
    } else if (title == undefined || title == null || title === "") {
      res.json((0, _Responses.getErrorMessageResponse)("title Missing, Please Send title Field", req.body, 400));
    } else if (education == undefined || education == null || education === "") {
      res.json((0, _Responses.getErrorMessageResponse)("education Missing, Please Send education Field", req.body, 400));
    } else if (expNumber == undefined || expNumber == null || expNumber <= 0) {
      res.json((0, _Responses.getErrorMessageResponse)("expNumber Missing, Please Send expNumber Field", req.body, 400));
    } else {
      if (gender === "male" || gender === "female") {
        await _bcryptjs.default.genSalt(10, function (err, salt) {
          _bcryptjs.default.hash(password, salt, function (err, hash) {
            const data = _models.User.create({
              email: email,
              expNumber: expNumber,
              education: education,
              title: title,
              expName: expName,
              name: name,
              password: hash,
              gender: gender,
              isApproved: false,
              isAdmin: false
            }).then(e => {
              res.json((0, _Responses.getSuccessResponse)("Data Saved", e));
            }).catch(e => {
              res.json((0, _Responses.getErrorResponse)(e, req.body, 500));
            });
          });
        });
      } else {
        res.json((0, _Responses.getErrorMessageResponse)("gender Should be male or female only", req.body, 400));
      }
    }
  } catch (ex) {
    res.json((0, _Responses.getErrorResponse)(ex, req.body, 500));
  }
};

exports.createUser = createUser;

const login = (req, res, next) => {
  var username = req.body.email;
  var password = req.body.password;

  _models.User.findOne({
    email: username
  }).then(user => {
    if (user) {
      _bcryptjs.default.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
            code: 500,
            message: err.message
          });
        }

        if (result) {
          res.json({
            code: 200,
            message: 'Login Successful!',
            data: user
          });
        } else {
          res.json({
            status: false,
            code: 400,
            message: 'password dose not match!'
          });
        }
      });
    } else {
      res.json({
        status: false,
        message: 'User not Found, PLease Send Right Credintals'
      });
    }
  });
};

exports.login = login;

const updateUserStatus = async (req, res) => {
  const status = req.body.newStatus;
  const userId = req.body.id;

  if (status == null || status == undefined) {
    res.json({
      message: "Status Not Defined, Please Send newStatus In Request Body"
    });
  }

  if (status === "Accept" || status === "Reject") {
    const targetUser = await _models.User.findOne({
      _id: userId
    });

    if (targetUser == null || targetUser == undefined) {
      res.json({
        message: "No Account Related To This User Id , Please Send Correct User Id"
      });
    } else {
      var newStatus = false;

      if (status === "Accept") {
        newStatus = true;
      }

      await _models.User.findOneAndUpdate({
        _id: userId
      }, {
        $set: {
          isApproved: newStatus
        }
      }, {
        returnNewDocument: true
      }, function (e1, e2) {
        console.log("IIII ::" + e1 + " :: " + e2);
      });

      if (newStatus == true) {
        (0, _nodemailer.sendEmail)({
          from: 'tproject575@gmail.com',
          to: targetUser.email,
          subject: 'Important Email',
          text: 'You Accepted Inside System Feel Free To Login With Your Information: ' + targetUser.email + " Password: " + targetUser.password
        });
      } else {
        (0, _nodemailer.sendEmail)({
          from: 'tproject575@gmail.com',
          to: targetUser.email,
          subject: 'Important Email',
          text: 'You Rejected From The System'
        });
      }

      res.json({
        message: "User Updated Successfully"
      });
    }
  } else {
    res.json({
      message: "Status Should be Accept or Reject Only"
    });
  }
}; // Only Called By Admin From Client Project (Admin Can Decide This Account is For User Or Admin)


exports.updateUserStatus = updateUserStatus;

const applyUnVerifiedUsers = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const expName = req.body.expName;
    const gender = req.body.gender;
    const title = req.body.title;
    const education = req.body.education;
    const expNumber = req.body.expNumber;
    const isAdmin = req.body.isAdmin;

    if (email == undefined || email == null || email === "") {
      res.json((0, _Responses.getErrorMessageResponse)("Email Missing, Please Send Email Field", req.body, 400));
    } else if (password == undefined || password == null || password === "") {
      res.json((0, _Responses.getErrorMessageResponse)("password Missing, Please Send password Field", req.body, 400));
    } else if (gender == undefined || gender == null || gender === "") {
      res.json((0, _Responses.getErrorMessageResponse)("gender Missing, Please Send gender Field", req.body, 400));
    } else if (name == undefined || name == null || name === "") {
      res.json((0, _Responses.getErrorMessageResponse)("name Missing, Please Send name Field", req.body, 400));
    } else if (expName == undefined || expName == null || expName === "") {
      res.json((0, _Responses.getErrorMessageResponse)("expName Missing, Please Send expName Field", req.body, 400));
    } else if (title == undefined || title == null || title === "") {
      res.json((0, _Responses.getErrorMessageResponse)("title Missing, Please Send title Field", req.body, 400));
    } else if (education == undefined || education == null || education === "") {
      res.json((0, _Responses.getErrorMessageResponse)("education Missing, Please Send education Field", req.body, 400));
    } else if (expNumber == undefined || expNumber == null || expNumber <= 0) {
      res.json((0, _Responses.getErrorMessageResponse)("expNumber Missing, Please Send expNumber Field", req.body, 400));
    } else {
      if (gender === "male" || gender === "female") {
        await _bcryptjs.default.genSalt(10, function (err, salt) {
          _bcryptjs.default.hash(password, salt, function (err, hash) {
            const data = _models.User.create({
              email: email,
              expNumber: expNumber,
              education: education,
              title: title,
              expName: expName,
              name: name,
              password: hash,
              gender: gender,
              isApproved: true,
              isAdmin: isAdmin
            }).then(e => {
              res.json((0, _Responses.getSuccessResponse)("Data Saved", e));
            }).catch(e => {
              res.json((0, _Responses.getErrorResponse)(e, req.body, 500));
            });
          });
        });
      } else {
        res.json((0, _Responses.getErrorMessageResponse)("gender Should be male or female only", req.body, 400));
      }
    }
  } catch (ex) {
    res.json((0, _Responses.getErrorResponse)(ex, req.body, 500));
  }
};

exports.applyUnVerifiedUsers = applyUnVerifiedUsers;

const createDefaultAdmin = async (req, res) => {
  await _bcryptjs.default.genSalt(10, function (err, salt) {
    _bcryptjs.default.hash("admin", salt, function (err, hash) {
      const data = _models.User.create({
        email: "admin",
        expNumber: 10,
        education: "education",
        title: "title",
        expName: "expName",
        name: "name",
        password: hash,
        gender: "male",
        isApproved: true,
        isAdmin: true
      }).then(e => {
        res.json((0, _Responses.getSuccessResponse)("Data Saved", e));
      }).catch(e => {
        res.json((0, _Responses.getErrorResponse)(e, req.body, 500));
      });
    });
  });
};

exports.createDefaultAdmin = createDefaultAdmin;