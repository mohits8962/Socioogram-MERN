import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";


const router = express.Router()


// READ

// this will grab the user feed when we were on the home page. basically get all the posts from the database and show
router.get("/", verifyToken, getFeedPosts)

// so this one involve userid because we want only the relevant user posts.....like we open someone profile
router.get("/:userId/posts", verifyToken, getUserPosts)


// UPDATE
router.patch("/:id/like", verifyToken, likePost)



export default router;