import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
    picturePath: {
        type: String,
    },
    userPicturePath: {
        type: String,
    },
    // if we like it we are adding it to map and if we inlike it we are removing it from map
    likes: {
        type: Map,
        of: Boolean
    },
    comments: {
        type: Array,
        default: []
    },
}, { timestamps: true })


const Post = mongoose.model("Post", postSchema);
export default Post;