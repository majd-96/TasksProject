# TaskskProject
Taks Project Powered By Angular, Express.js, MongoDB


# Read Me 

![Project Image](project-image-url)



---

### Table of Contents
You're sections headers will be used to reference location of destination.

- [Description](#description)
- [How To Use](#how-to-use)
- [References](#references)
- [License](#license)
- [Author Info](#author-info)

---

## Description

log in website with login ,  regester and admin pages

#### Technologies

- nodejs
- angular
- javascript
- visual studio code 
- bootstrap
- postman

[Back To The Top](#read-me)

---

## How To Use

#### Installation
you can install the from my github clone repository

//clint
to run the clint 
1.open the cmd 
2.write cd clint then ng serve --open the webpage will open on ur browser


//server
to run the server
1.open the cmd 
2.write cd clint then npm start the server will run



#### API Reference
user Schema 
`

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const UserSchema = new _mongoose.Schema({
  email: String,
  password: String,
  name: String,
  title: String,
  gender: String,
  education: String,
  experience: String,
  isApproved: Boolean,
  isAdmin: Boolean,
  expNumber: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});
const User = (0, _mongoose.model)('User', UserSchema);
var _default = User;
exports.default = _default;
```

////////////////////////////////////////////////////////


userController
import { User } from '../models';
import { getErrorMessageResponse, getSuccessResponse, getErrorResponse } from '../responses/Responses';
import encryption from 'bcryptjs';
import { get } from 'mongoose';
import { sendEmail } from '../models/nodemailer';


export const getAllUsers = async (req, res, next) => {
  try {
    const data = await User.find();
    res.send({ name: 'User Route', data })
  } catch (err) { next(err) }
};

// This Called From Second Screen In Frontend Project To Create Account From Users
export const createUser = async (req, res) => {
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
          res.json(getErrorMessageResponse("Email Missing, Please Send Email Field", req.body, 400))
      } else if (password == undefined || password == null || password === "") {
          res.json(getErrorMessageResponse("password Missing, Please Send password Field", req.body, 400))
      } else if (gender == undefined || gender == null || gender === "") {
         res.json(getErrorMessageResponse("gender Missing, Please Send gender Field", req.body, 400))
    } else if (name == undefined || name == null || name === "") {
          res.json(getErrorMessageResponse("name Missing, Please Send name Field", req.body, 400))
      } else if (expName == undefined || expName == null || expName === "") {
          res.json(getErrorMessageResponse("expName Missing, Please Send expName Field", req.body, 400))
      } else if (title == undefined || title == null || title === "") {
          res.json( getErrorMessageResponse("title Missing, Please Send title Field", req.body, 400))
      } else if (education == undefined || education == null || education === "") {
          res.json(getErrorMessageResponse("education Missing, Please Send education Field", req.body, 400))
      }  else if (expNumber == undefined || expNumber == null|| expNumber <= 0) {
          res.json(getErrorMessageResponse("expNumber Missing, Please Send expNumber Field", req.body, 400))
      }  else {
        if (gender === "male" || gender === "female") {
          await encryption.genSalt(10, function(err, salt) {
            encryption.hash(password, salt, function(err, hash) {
              const data = User.create({
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
            })
            .then((e) => {
              res.json(getSuccessResponse("Data Saved", e))
            })
            .catch((e) => {
              res.json(getErrorResponse(e, req.body, 500))
            })
           
          })
        })
         
      } else {
        res.json(getErrorMessageResponse("gender Should be male or female only", req.body, 400))
      }
    }
  } catch(ex) {
      res.json(getErrorResponse(ex, req.body, 500))
  }

}

export const login =(req ,res , next) =>{
  var username = req.body.email
   var password = req.body.password
  
  User.findOne({email:username})
  .then(user =>{
    if(user){
      encryption.compare(password,user.password,function(err , result) {
        if(err){
          res.json({
            error:err,
            code: 500,
            message: err.message
          })
        }
        if(result){
         
          res.json({
            code: 200,
            message:'Login Successful!',
            data: user
          })
  
        }else{
          res.json({
            status: false,
            code: 400,
            message:'password dose not match!'
          })
        }
      })
  }else{
      res.json({
          status: false,
          message:'User not Found, PLease Send Right Credintals'
      })
  }
  })
  }


  export const updateUserStatus = async (req, res) => {
    const status = req.body.newStatus;
    const userId = req.body.id;
    if (status == null || status == undefined) {
        res.json({
          message: "Status Not Defined, Please Send newStatus In Request Body"
        })
    }
  
    if (status === "Accept" || status === "Reject") {
      const targetUser = await User.findOne({
        _id: userId
      })

      if (targetUser == null || targetUser == undefined) {
        res.json({
          message: "No Account Related To This User Id , Please Send Correct User Id"
        })
      } else {
        var newStatus = false
        if (status === "Accept") {
          newStatus = true
        }

        await User.findOneAndUpdate({
          _id: userId
        }, { $set: {  isApproved: newStatus } },      
        {
           returnNewDocument: true
        }, function(e1, e2) {
          console.log("IIII ::"  + e1 + " :: " + e2)
        })

        if (newStatus == true) {
          sendEmail({
            from:'tproject575@gmail.com',
            to: targetUser.email,
            subject:'Important Email',
            text:'You Accepted Inside System Feel Free To Login With Your Information: ' + targetUser.email + " Password: " + targetUser.password
          })
        } else {
          sendEmail({
            from:'tproject575@gmail.com',
            to: targetUser.email,
            subject:'Important Email',
            text:'You Rejected From The System'
          })
        }
        
        res.json({
          message: "User Updated Successfully"
        })
      }
    } else {
      res.json({
        message: "Status Should be Accept or Reject Only"
      })
    }
  }

  // Only Called By Admin From Client Project (Admin Can Decide This Account is For User Or Admin)
  export const applyUnVerifiedUsers = async (req, res ,next) => {
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
          res.json(getErrorMessageResponse("Email Missing, Please Send Email Field", req.body, 400))
      } else if (password == undefined || password == null || password === "") {
          res.json(getErrorMessageResponse("password Missing, Please Send password Field", req.body, 400))
      } else if (gender == undefined || gender == null || gender === "") {
         res.json(getErrorMessageResponse("gender Missing, Please Send gender Field", req.body, 400))
    } else if (name == undefined || name == null || name === "") {
          res.json(getErrorMessageResponse("name Missing, Please Send name Field", req.body, 400))
      } else if (expName == undefined || expName == null || expName === "") {
          res.json(getErrorMessageResponse("expName Missing, Please Send expName Field", req.body, 400))
      } else if (title == undefined || title == null || title === "") {
          res.json( getErrorMessageResponse("title Missing, Please Send title Field", req.body, 400))
      } else if (education == undefined || education == null || education === "") {
          res.json(getErrorMessageResponse("education Missing, Please Send education Field", req.body, 400))
      }  else if (expNumber == undefined || expNumber == null|| expNumber <= 0) {
          res.json(getErrorMessageResponse("expNumber Missing, Please Send expNumber Field", req.body, 400))
      }  else {
        if (gender === "male" || gender === "female") {
          await encryption.genSalt(10, function(err, salt) {
            encryption.hash(password, salt, function(err, hash) {
              const data = User.create({
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
            })
            .then((e) => {
              res.json(getSuccessResponse("Data Saved", e))
            })
            .catch((e) => {
              res.json(getErrorResponse(e, req.body, 500))
            })
           
          })
        })
         
      } else {
        res.json(getErrorMessageResponse("gender Should be male or female only", req.body, 400))
      }
    }
  } catch(ex) {
      res.json(getErrorResponse(ex, req.body, 500))
  }

  }

  export const createDefaultAdmin = async (req, res) => {
    await encryption.genSalt(10, function(err, salt) {
      encryption.hash("admin", salt, function(err, hash) {
        const data = User.create({
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
      })
      .then((e) => {
        res.json(getSuccessResponse("Data Saved", e))
      })
      .catch((e) => {
        res.json(getErrorResponse(e, req.body, 500))
      })
     
    })
  })
  }

////////////////////////////////////////// 

  useing express

  
import express from 'express';
import * as userController from '../controllers/userController';
const router = express.Router();

router.put('/status', function(req, res, next) {
  userController.updateUserStatus(req, res)
})

router.post('/register/user', function(req, res, next) {
  userController.createUser(req, res)
 });

 router.post('/register/admin', function(req, res, next) {
  userController.applyUnVerifiedUsers(req, res)
 });

 router.post('/create/admin', function(req, res, next) {
  userController.createDefaultAdmin(req, res)
 });

/**
 * Login With Existing User
 * If The Email Not Found In Database
 * 404 Response Will Be Returned
 * Else Will Check if Password Matches (Return Succes)
 * Else Return Bad Request
 */
 router.post('/login', function(req, res, next) {
  userController.login(req, res)
});
  
  /**
   * Save User In Database
   * This is Only Called If the Sender is Admin
   * To Create Another Users Database
   * 
   * This Request Should Work For Anyone if the Collection is Empty
   * That's Mean there is no any Users Saved In Database And The First One Will Be The Admin Directly
   */
  router.post('/register', function(req, res, next) {
   userController.createUser(req, res)
  });
  
  /**
   * Get All Users In Database
   */
  router.get('/all', function(req, res, next) {
    userController.getAllUsers(req, res, next)
  });
  
  function getDatabaseInstance() {
    var mongoDB = 'mongodb://127.0.0.1/tasks';
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
  
    //Get the default connection
    var db = mongoose.connection;
  
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    return db
  }

export default router;


[Back To The Top](#read-me)

---

## References
[Back To The Top](#read-me)

//////////////////////////////////////////////////
 using nodemailer
---
const nodemailer = require('nodemailer');

var createTransportorter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'tproject575@gmail.com',
        pass:'123456789@m'
    }
});

export function sendEmail(mailoption) {

    createTransportorter.sendMail(mailoption , function(error ,info){
        if(error){
            console.log(error);

        }else {
            console.log('Email sent: ' + info.response)
        }
    });
}

## License

MTj License

Copyright (c) [2021] [Majd T jaradat]



[Back To The Top](#read-me)

