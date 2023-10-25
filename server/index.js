import express from 'express';
import connectDB from './database/db.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import Routes from './routes/route.js';
import UserRoutes from './routes/users.js';

const app=express();

dotenv.config();

app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', Routes);
app.use('/user', UserRoutes);


const startServer = async () => {
    try {
      connectDB(process.env.MONGODB_URL);  
      app.listen(8080, () => console.log('Server started on port http://localhost:8080'));
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();