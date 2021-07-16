import { User } from '../models';
import { getErrorMessageResponse, getSuccessResponse, getErrorResponse } from '../responses/Responses';

export const getAllUsers = async (req, res, next) => {
  try {
    const data = await User.find();
    res.send({ name: 'User Route', data })
  } catch (err) { next(err) }
};

export const createUser = (req) => {
  try {
      const email = req.body.email;
      const password = req.body.password;
      const name = req.body.name;
      const expName = req.body.expName;
      const title = req.body.title;
      const education = req.body.education;
      const expNumber = req.body.expName;
      console.log("Step 1")
      if (email == undefined || email == null || email === "") {
          return getErrorMessageResponse("Email Missing, Please Send Email Field", req.body, 400)
      } else if (password == undefined || password == null || password === "") {
          return getErrorMessageResponse("password Missing, Please Send password Field", req.body, 400)
      } else if (name == undefined || name == null || name === "") {
        console.log("Step 2")

          return getErrorMessageResponse("name Missing, Please Send name Field", req.body, 400)
      } else if (expName == undefined || expName == null || expName === "") {
          return getErrorMessageResponse("expName Missing, Please Send expName Field", req.body, 400)
      } else if (title == undefined || title == null || title === "") {
          return getErrorMessageResponse("title Missing, Please Send title Field", req.body, 400)
      } else if (education == undefined || education == nulleducation|| title === "") {
          return getErrorMessageResponse("education Missing, Please Send education Field", req.body, 400)
      }  else if (expNumber == undefined || expNumber == nulleducation|| expNumber <= 0) {
          return getErrorMessageResponse("expNumber Missing, Please Send expNumber Field", req.body, 400)
      } else {
        console.log("Step 3")

          return getSuccessResponse("Data Saved", {
              email: email,
              expNumber: expNumber,
              education: education,
              title: title,
              expName: expName,
              name: name,
              password: password
          })
      }

      // const queryInstance = new SomeModel({

      // });
  } catch(ex) {
    console.log("Step 4")

      return getErrorResponse(ex, req.body, 500)
  }

}
