"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var userController = _interopRequireWildcard(require("../controllers/userController"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();
/**
 * Login With Existing User
 * If The Email Not Found In Database
 * 404 Response Will Be Returned
 * Else Will Check if Password Matches (Return Succes)
 * Else Return Bad Request
 */


router.post('/login', function (req, res, next) {
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

router.post('/register', function (req, res, next) {
  res.json(userController.createUser(req));
});
/**
 * Get All Users In Database
 */

router.get('/all', function (req, res, next) {
  res.json(userController.getAllUsers(req, res, next));
});

function getDatabaseInstance() {
  var mongoDB = 'mongodb://127.0.0.1/tasks';
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }); //Get the default connection

  var db = mongoose.connection; //Bind connection to error event (to get notification of connection errors)

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  return db;
}

var _default = router;
exports.default = _default;