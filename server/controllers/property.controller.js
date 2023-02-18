import mongoose from "mongoose";
import PropertyModel from "../mongoDB/models/property.js";

export const getAllProperties = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();
		res.status(200).json(postMessages);
	} catch (err) {
		res.status(404).json(err.message);
	}
	// res.send("Working through controller bro");
};

export const getProperty = async (req, res) => {
	const id = req.params;
	try {
		const post = await PostMessage.findById(id);
		res.status(200).json(post);
	} catch (err) {
		res.status(404).json(err.message);
	}
	// res.send("Working through controller bro");
};

export const createProperty = async (req, res) => {
	const post = req.body;
	// console.log("In controller",req.body);
	// console.log(req.name,post.name); sending email as name for creator
	const newPost = new PostMessage({
		...post,
		creator: post.name,
		createdAt: new Date().toISOString(),
	});
	res.send("Post creation bro endukayya");
	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (err) {
		res.status(409).json({ message: err.message });
		res.send("Post creation bro endukayya 3");
	}
	res.send("Post creation bro endukayya 4");
};

export const updateProperty = async (req, res) => {
	const { id } = req.params;
	const { title, message, creator, selectedFile, tags } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	const updatedPost = {
		creator,
		title,
		message,
		tags,
		selectedFile,
		_id: id,
	};

	await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

	res.json(updatedPost);
};

export const deleteProperty = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	await PostMessage.findByIdAndRemove(id);

	res.json({ message: "Delete succesful " });
};

// export const likePosts = async (req, res) => {
// 	const { id } = req.params;

// 	if (!req.userId) {
// 		return res.json({ message: "Login to like the post." });
// 	}

// 	if (!mongoose.Types.ObjectId.isValid(id))
// 		return res.status(404).send(`No post with id: ${id}`);

// 	const post = await PostMessage.findById(id); // Fetched the post

// 	const index = post.likes.findIndex((id) => id === String(req.userId));

// 	if (index === -1) {
// 		post.likes.push(req.userId);
// 	} else {
// 		post.likes = post.likes.filter((id) => id !== String(req.userId));
// 	}

// 	const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
// 		new: true,
// 	}); // UPdated the post like count
// 	res.status(200).json(updatedPost);
// };
