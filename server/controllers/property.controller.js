import mongoose from "mongoose";
import PropertyModel from "../mongoDB/models/property.js";
import UserModel from "../mongoDB/models/user.js";

import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_URL,
	api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
	api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

export const getAllProperties = async (req, res) => {
	// console.log("In Controller");
	// For pagination, sorting
	const {
		_end,
		_order,
		_start,
		_sort,
		title_like = "",
		propertyType = "",
	} = req.query;
	const query = {};
	if (propertyType !== "") {
		query.propertyType = propertyType;
	}
	if (title_like) {
		query.title = { $regex: title_like, $options: "i" };
	}

	// Display posts
	try {
		const count = await PropertyModel.countDocuments({ query });

		const properties = await PropertyModel.find(query)
			.limit(_end)
			.skip(_start)
			.sort({ [_sort]: _order });

		// console.log(count, properties);
		res.header("x-total-count", count);
		res.header("Access-Control-Expose-Headers", "x-total-count");
		res.status(200).json(properties);
	} catch (err) {
		// console.log(err, err.message);
		res.status(404).json(err.message);
	}
};

export const getProperty = async (req, res) => {
	try {
		const { id } = req.params;
		const propertyExists = await PropertyModel.findOne({ _id: id }).populate('creator');
	
		if (propertyExists) res.status(200).json(propertyExists);
		else res.status(404).json({ message: 'Property does not exist' });
	  } catch (err) {
		res.status(500).json({ message: 'Failed to get the property details, please try again later' });
	  }
};

export const createProperty = async (req, res) => {
	try {
		const {
			title,
			description,
			propertyType,
			location,
			price,
			photo,
			email,
		} = req.body;

		const session = await mongoose.startSession();
		session.startTransaction();

		const user = await UserModel.findOne({ email }).session(session);

		if (!user) throw new Error("User Not Found");

		const photo_url = await cloudinary.uploader.upload(photo);

		const newProperty = await PropertyModel.create({
			title,
			description,
			propertyType,
			location,
			price,
			photo: photo_url.url,
			creator: user._id,
		});

		user.allProperties.push(newProperty._id);
		await user.save({ session });
		await session.commitTransaction();
		res.status(200).json({ message: "Property creation Success" });
	} catch (err) {
		res.status(500).json({ message: err.message });
		// res.send("Error in Property Creation");
	}
};

export const updateProperty = async (req, res) => {
	// const { id } = req.params;
	// const { title, message, creator, selectedFile, tags } = req.body;
	// if (!mongoose.Types.ObjectId.isValid(id))
	// 	return res.status(404).send(`No post with id: ${id}`);
	// const updatedPost = {
	// 	creator,
	// 	title,
	// 	message,
	// 	tags,
	// 	selectedFile,
	// 	_id: id,
	// };
	// await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
	// res.json(updatedPost);
};

export const deleteProperty = async (req, res) => {
	// const { id } = req.params;
	// if (!mongoose.Types.ObjectId.isValid(id))
	// 	return res.status(404).send(`No post with id: ${id}`);
	// await PostMessage.findByIdAndRemove(id);
	// res.json({ message: "Delete succesful " });
};
