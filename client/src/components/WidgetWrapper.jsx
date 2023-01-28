import { Box } from "@mui/material";
import { styled } from "@mui/system";


// mui styled component
// this syntax is good for reusing css style as component

const WidgetWrapper = styled(Box)(({ theme }) => ({
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: theme.palette.background.alt,
    borderRadius: "0.75rem"
}))

export default WidgetWrapper