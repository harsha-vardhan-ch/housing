import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongoDB/connect.js'

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json({limit:'50mb'}));

app.get('/',(req,res)=>{
    res.send({message:'Hello, world!'});
})

const startServer = async() => {
    try{
        // Connect to DB
        connectDB(process.env.MONGODB_CONNECTION_URL)
        app.listen(8080, () => console.log("Running Successful "))
    }
    catch(err){
        console.log(err);
    }
}

startServer();