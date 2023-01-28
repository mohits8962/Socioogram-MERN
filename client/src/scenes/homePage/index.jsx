import { Box, useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"

import Navbar from "scenes/navbar"
import AdvertWidget from "scenes/widgets/AdvertWidget"
import FriendListWidget from "scenes/widgets/FriendListWidget"

import MyPostWidget from "scenes/widgets/MyPostWidget"
import PostsWidget from "scenes/widgets/PostsWidget"
import UserWidget from "scenes/widgets/UserWidget"


const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)")
    // here grabbing the id and picturePath from the user (from state)
    const { _id, picturePath } = useSelector((state) => state.user)


    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                // when we display for big screen we have 3 widgets in a row
                // whereas on smaller screens we are just gonna have on top of each other
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                {/* arbitary value */}
                {/* here setting column height and width for (left side userWidget) */}
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    {/* passing id to userId and picturepath to picturePath to user widget */}
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>

                {/* arbitary value */}
                {/* here setting column height and width (centered postWidget) */}
                <Box flexBasis={isNonMobileScreens ? "42%" : undefined}
                    // setting undefined means ----- setting margin top of undefined (means it doesn't have any margin on top for desktop) 
                    // but for small screen we setting top margin to 2rem
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={picturePath} />
                    <PostsWidget userId={_id} />
                </Box>

                {/* this will only show for desktop screen */}
                {/* our friend list will onl show for desktop */}
                {isNonMobileScreens && (
                    <Box flexBasis="26%">
                        <AdvertWidget />
                        <Box m="2rem 0" />
                        <FriendListWidget userId={_id} />
                    </Box>
                )}

            </Box >

        </Box >
    )
}

export default HomePage