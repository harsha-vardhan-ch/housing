import mongoose from "mongoose";
import UserModel from "./user.js";

const propertySchema = mongoose.Schema({
    title: { type: 'String', required: true},
	description: { type: 'String', required: true},
	propertyType: { type: 'String', required: true},
    location: { type: 'String', required: true},
	price: { type: 'Number', required: true},
    photo: { type: 'String', required: true},
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const PropertyModel = mongoose.model("property", propertySchema);

export default PropertyModel;
