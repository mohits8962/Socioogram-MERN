import { ManageAccountsOutlined, EditOutlined, LocationOnOutlined, WorkOutlineOutlined } from "@mui/icons-material"
import { Box, Typography, Divider, useTheme } from "@mui/material"

import UserImage from "components/UserImage"
import FlexBetween from "components/FlexBetween"
import WidgetWrapper from "components/WidgetWrapper"

import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null)
    const { palette } = useTheme()
    const navigate = useNavigate()
    // selecting themes
    const dark = palette.neutral.dark
    const medium = palette.neutral.medium
    const main = palette.neutral.main
    // here grabing token from state
    const token = useSelector((state) => state.token)


    // here in userwidget for the particular widget we want to gran the user information
    // so we have to call the api for user information
    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json()
        setUser(data)
    }


    // here invoking the getUser() with the help of useEffect (this is useeffect and this will render after the component gets rendered)
    // here what it means is when we entered this page
    // and because we are sending empty array getUser will be called
    // when we render this component first time
    useEffect(() => {
        getUser()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    // and if we dont have user we simply return null
    if (!user) {
        return null
    }


    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends,
    } = user

    return (
        <WidgetWrapper>
            {/* FIRST ROW -------------------------------------------- */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            color={dark}
                            fontWeight="500"
                            sx={{
                                "&:hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {/* this will be showing our first and last name */}
                            {firstName} {lastName}
                        </Typography>
                        <Typography color={medium}>
                            {/* this will show no of friends they have */}
                            {friends.length} friends
                            {/* {10} friends */}
                        </Typography>
                    </Box>
                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween >


            {/* setting divider of our first row and second row */}
            <Divider />


            {/* SECOND ROW -------------------------------------------------------------------------- */}
            <Box p="1rem 0">
                {/* for location */}
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    {/* location icon */}
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium} >
                        {location}
                    </Typography>
                </Box>

                {/* for occupation */}
                <Box display="flex" alignItems="center" gap="1rem">
                    {/* work icon */}
                    <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium} >
                        {occupation}
                    </Typography>
                </Box>
            </Box>


            {/* setting divider of our first row and second row */}
            <Divider />

            {/* THIRD ROW -------------------------------------------------------------------------- */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Who's viewed your profile</Typography>
                    <Typography color={main}>{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Impressions of your post</Typography>
                    <Typography color={main}>{impressions}</Typography>
                </FlexBetween>
            </Box>


            {/* setting divider of our first row and second row */}
            <Divider />


            {/* FORTH ROW -------------------------------------------------------------------------- */}
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
                    Social Profiles
                </Typography>

                {/* social network -- twitter */}
                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/twitter.png" alt="twitter" />
                        <Typography color={main} fontWeight="500">
                            Twitter
                        </Typography>
                        <Typography color={medium}>
                            Social Network
                        </Typography>
                    </FlexBetween>
                    {/* edit icon */}
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>


                {/* network paltform -- linkedin */}
                <FlexBetween gap="1rem">
                    <FlexBetween gap="1rem">
                        <img src="../assets/Linkedin.png" alt="Linkedin" />
                        <Typography color={main} fontWeight="500">
                            Linkedin
                        </Typography>
                        <Typography color={medium}>
                            Network Platform
                        </Typography>
                    </FlexBetween>
                    {/* edit icon */}
                    <EditOutlined sx={{ color: main }} />
                </FlexBetween>
            </Box>


        </WidgetWrapper >
    )
}


export default UserWidget