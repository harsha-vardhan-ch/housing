import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongoDB/connect.js'
import userRoutes from "./routes/user.routes.js";
import propertyRoutes from "./routes/property.routes.js";

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json({limit:'50mb'}));

app.use("/api/v1/properties", propertyRoutes); // localhost:3000/ => redirects here, but by this statement  it becomes localhost:3000/posts
// adds /posts in start for every route url. [ similar to adding a prefix ]
// We write /edit, /delete, /view in posts.js file. But in url it is accessed through /posts/edit, /posts/delete, /posts/view etc

app.use("/api/v1/users", userRoutes);

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