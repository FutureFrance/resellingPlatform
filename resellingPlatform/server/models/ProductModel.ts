import { Schema, model, Types } from 'mongoose';

const ProductModel = new Schema({
    title: {type: String, required: true},
    categories: {type: Array<String>},
	owner:  {type: Schema.Types.ObjectId, required: true},
	description: {type: String, required:true},
	price: {type: String, required: true},
	image: {type: String, required: false}
}, {timestamps: true, versionKey: false});

export default model("Product", ProductModel)