import express from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import admin from './routes/admin/index.routes'
const port : Number = Number(process.env.PORT);
const dbURL: string = process.env.MONGO_DB_URL as string;

app.use(express.json());
app.use('/api/admin', admin)

app.listen(port, async () => {
    mongoose.connect(dbURL)
    .then(() => console.log('DB is Connected Successfully.....👍🏻'))
    .catch(error => console.log(error.message));
    console.log(`Server Start at http://localhost:${port}`);    
});