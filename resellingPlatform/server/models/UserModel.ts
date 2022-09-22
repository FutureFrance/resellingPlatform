import { Schema, model } from 'mongoose';

const UserModel = new Schema({
    username: {type: String, required: true},
	email:  {type: String, required: true, unique: true},
	password: {type: String, required: true},
	phone: {type: String, required: true, unique: true},
	favorites: {type: Array, required:true, default: []}
}, { versionKey: false });

export default model("User", UserModel);