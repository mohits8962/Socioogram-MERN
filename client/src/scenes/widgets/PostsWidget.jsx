import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { setPosts } from "state"
import PostWidget from "./PostWidget"


// what post widget can do is it can grab all the post from anybody
// and thats api call for getfeedpost which grab all the post in the home page
// but when we go to any user we call getuserpost 

const PostsWidget = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch()

    // grabbing store list of post 
    const posts = useSelector((state) => state.posts)
    // and token as well
    const token = useSelector((state) => state.token)


    const getPosts = async () => {
        // this will grab all the posts
        const response = await fetch("http://localhost:3001/posts", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        // we are setting post value inside store with data rhat we got
        dispatch(setPosts({ posts: data }));
    };


    const getUserPosts = async () => {
        const response = await fetch(
            `http://localhost:3001/posts/${userId}/posts`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    };


    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        } else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



    return (
        <>
            {posts.map(
                // doing destructure 
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                }) => (
                    // here passing props in post widget
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        picturePath={picturePath}
                        userPicturePath={userPicturePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    )
}

export default PostsWidget;