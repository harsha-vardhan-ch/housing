import mongoose from 'mongoose';

const connectDB =(url)=>{
    console.log(url);
    mongoose.set('strictQuery',true);
    mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>(
        console.log("Running Successful")
	)) // If connection successful, then
	.catch((error) => console.log(error)) // If connection Failed, then
}
export default connectDB;