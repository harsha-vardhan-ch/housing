import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: 'String', required: true},
	email: { type: 'String', required: true},
	avatar: { type: 'String', required: true},
    allProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property'}]
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
