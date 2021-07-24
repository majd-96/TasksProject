/* eslint-disable no-console */
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import logger from 'morgan';
import mongoose from 'mongoose';
import * as routes from './routes';


const app = express();
const cors = require('cors');
// database setup
const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.e88f2.mongodb.net/test?retryWrites=true&w=majority';
const mongooseConfigs = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(mongoUri, mongooseConfigs);
// 'mongodb://localhost/tasks'


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(compression());


app.use('/api', routes.hello);
app.use('/api/users', routes.users);

module.exports = app;
