import express from 'express';
import * as userController from '../controllers/userController';
const router = express.Router();

/**
 * Login With Existing User
 * If The Email Not Found In Database
 * 404 Response Will Be Returned
 * Else Will Check if Password Matches (Return Succes)
 * Else Return Bad Request
 */
 router.post('/login', function(req, res, next) {
    res.send('respond Login');
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
    res.json(userController.createUser(req))
  });
  
  /**
   * Get All Users In Database
   */
  router.get('/all', function(req, res, next) {
    res.json(userController.getAllUsers(req, res, next));
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
