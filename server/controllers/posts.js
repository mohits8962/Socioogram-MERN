import Post from "../models/Post.js"
import User from "../models/User.js"


// CREATE

export const createPost = async (req, res) => {
    try {
        // getting data from req.body
        const { userId, description, picturePath } = req.body

        // making a db call to find the user id
        const user = await User.findById(userId)

        // creating a new post
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},        // it will save as {"someid": true}
            comments: []
        })
        await newPost.save()        // saving in mongodb

        const post = await Post.find()       // once we add our post then this will grab all the post and return to the frontend so feed will get the updated posts
        res.status(201).json(post)

    }
    catch (error) {
        res.status(409).json({ message: error.message })
    }
}


// READ

// this will grab all the posts and represent feed
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find()        // grabbing all the posts
        res.status(200).json(post)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}


export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params

        // grabbing the user feed
        const post = await Post.find({ userId })
        res.status(200).json(post)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// UPDATE

export const likePost = async (req, res) => {
    try {
        // getting data
        const { id } = req.params
        const { userId } = req.body

        const post = await Post.findById(id)     // grabbing post information

        //checking if the userid is exist.....means that particular user like that post
        const isLiked = post.likes.get(userId)      // grabbing whether user liked it or not

        // objects that includes list thats gonna have all the ids if that exist then we are gonna delete it
        if (isLiked) {
            post.likes.delete(userId)      // deleting it if it is already liked
        }
        else {
            post.likes.set(userId, true)   // if not liked then we are setting liked
        }

        // updating and passing the likes to particular post
        const updatedPost = await Post.findByIdAndUpdate(
            id,                       // passing the id to target specific post
            { likes: post.likes },    // passing the likes to post that we are modifying...its the list of likes that we modify
            { new: true }
        )

        res.status(200).json(updatedPost)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}


