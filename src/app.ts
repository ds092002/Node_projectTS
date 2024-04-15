import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const port : Number = Number(process.env.PORT);
const dbURL: string = process.env.MONGO_DB_URL as string;

app.use(express.json());

// Admin Routes
import admin from './routes/admin/index.routes'
app.use('/api/admin', admin)

// User Routes
import user from './routes/user/index.routes'
app.use('/api/user', user);

app.listen(port, async () => {
    mongoose.connect(dbURL)
    .then(() => console.log('DB is Connected Successfully.....👍🏻'))
    .catch(error => console.log(error.message));
    console.log(`Server Start at http://localhost:${port}`);    
});