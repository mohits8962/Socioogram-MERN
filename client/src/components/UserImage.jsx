import { Box } from "@mui/material";

// mui styled component
// this syntax is good for reusing css style as component

const UserImage = ({ image, size = "60px" }) => {
    return (
        <Box width={size} height={size}>
            <img style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size}
                height={size}
                alt="user"
                // this will grab the profile image as needed for each of the profile users
                src={`http://localhost:3001/assets/${image}`}
            />

        </Box>
    )
}

export default UserImage