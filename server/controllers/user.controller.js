import UserModel from "../mongoDB/models/user.js";
import mongoose from "mongoose";

export const getAllUsers = async (req, res) => {};
export const getUserInfoById = async (req, res) => {};
export const createUser = async (req, res) => {
	try {
		const { name, email, avatar } = req.body;
        console.log(name,email);
		const userExists = await UserModel.findOne({ email });
        console.log(userExists);
        if (userExists)
        {
            console.log("User Exists");
            res.status(200).json(userExists)
        }
        else{
            const newUser = await UserModel.create({name, email, avatar});
            res.status(200).json(newUser)
        }
	} catch (error) {
		console.log("User not creating bhai",error,error.message);
		res.status(500).json({ message: error.message });
	}
};
