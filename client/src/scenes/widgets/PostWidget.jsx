import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material"
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material"

import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";


// what likes gonna look
// so if the user id already exists in this object
// then we can check if they exist to see if the current user has liked it or not
// if they havent liked it (id not gonna show in this object)

// likes={
//     "userid1": true,
//     "userid2": true
// }


const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    // this gonna determine if we open the comments lists or not
    const [isComments, setIsComments] = useState(false)
    const dispatch = useDispatch()

    const token = useSelector((state) => state.token)
    const loggedInUserId = useSelector((state) => state.user._id)

    // liked explanation above
    // thats why we do like
    // we passing the id of logged in user id
    // so the current user id thats logged in (we gonna check if they present in that liked object or not and thats gonna give us boolean)

    // we have to keep the track of which user liked it or not
    // beacuse if we refresh that state should still be reflect ki which user liked it or not
    // thats why we cant put this as a count
    const isLiked = Boolean(likes[loggedInUserId])
    // no of likes the posts have
    const likeCount = Object.keys(likes).length

    const { palette } = useTheme()
    const main = palette.neutral.main
    const primary = palette.primary.main



    const patchLike = async () => {
        const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            // we are passing the user id 
            // so backend will keep the track which user id liked that particular post
            body: JSON.stringify({ userId: loggedInUserId }),
        });
        // and after that we are returning the entire post
        // response.jsn will give us the updated post from backend
        const updatedPost = await response.json();
        // and then we are update the post
        dispatch(setPost({ post: updatedPost }));
    }


    return (
        <WidgetWrapper m="2rem 0">
            {/* here we are creating component of post widget */}
            <Friend
                // the id of the used who post it
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
            />

            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>

            {/* this will be the post path */}
            {/* the post path that we created */}
            {picturePath && (
                // passing the image
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}

            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        {/* this gonna determine the icon whether someone is liked it or not */}
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        {/* this will display how many likes are */}
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        {/* it will open the comment section */}
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        {/* that determines no of comments */}
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>

                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>


            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment, i) => (
                        // i will give it the unique index
                        <Box key={`${name}-${i}`}>
                            <Divider />
                            <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
    );
};

export default PostWidget;