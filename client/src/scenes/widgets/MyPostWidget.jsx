import { EditOutlined, DeleteOutlined, AttachFileOutlined, GifBoxOutlined, ImageOutlined, MicOutlined, MoreHorizOutlined } from "@mui/icons-material"
import { Box, Divider, Typography, InputBase, useTheme, Button, IconButton, useMediaQuery, } from "@mui/material"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import FlexBetween from "components/FlexBetween"
import Dropzone from "react-dropzone"
import UserImage from "components/UserImage"
import WidgetWrapper from "components/WidgetWrapper"
import { setPosts } from "state"


const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch()
  // grabbing our colors
  const { palette } = useTheme()
  // this state is going to represent the switch whether if someone has clicked the image button
  // to open up a place to drop the image for posting
  const [isImage, setIsImage] = useState(false)
  // this is another state
  // this will be the actual image if they drop it
  // we are gonna set the image 
  const [image, setImage] = useState(null)
  // and this state will actual represent our post content 
  const [post, setPost] = useState("")
  // selectig id of user from state
  const { _id } = useSelector((state) => state.user)
  // selectig token of user from state
  // this token is used to authorize this user to make a post (or we can say call this api)
  const token = useSelector((state) => state.token)
  const mediumMain = palette.neutral.mediumMain
  const medium = palette.neutral.medium
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")


  // for handling post
  const handlePost = async () => {
    // here we are again using formData (because we are passing image )
    const formData = new FormData();
    // appending some properties manually
    formData.append("userId", _id);
    formData.append("description", post);
    // here we are using picture key 
    // that we add in server/index.js file as middleware to upload pictures
    if (image) {
      formData.append("picture", image);
      // in addition we need picture name too so here adding picture path
      formData.append("picturePath", image.name);
    }

    // this will send the post information to the backend
    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    // and backend will return our list of updated post
    const posts = await response.json();
    // this will keep our list of posts
    dispatch(setPosts({ posts }));
    // so this will basically reset all the states that we have
    // once we make an api call
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          // this input should be updating the setPost state that we created
          // post decription part
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>


      {/* so basically if they click the image  they wanna add a image to the post */}
      {/* basically if setImage is true */}
      {isImage && (
        // this will open up this div
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          {/* another file dropping area */}
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>


                {/* here we add an image and adding icon button here */}
                {/* because we are going to add a trash icon if they want to remove the image */}
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    {/* delete icon */}
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}


      {/* setting divider */}
      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        {/* this will turn of and open the image dropzone */}
        {/* initial value false hai mtlab false ka ulta true */}
        {/* to if someone clicks it then it will open the dropzone box that we created above */}
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>


        {/* if desktop screen rahegi to ? y: warna y */}
        {isNonMobileScreens ? (
          <>
            {/* for gif icon */}
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            {/* for attach icon */}
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            {/* for audio icon */}
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          // this is for mobile screen
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}


        {/* button for posting */}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
