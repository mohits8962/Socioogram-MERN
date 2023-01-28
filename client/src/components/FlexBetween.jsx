import { Box } from "@mui/material";
import { styled } from "@mui/system";

// mui styled component
// this syntax is good for reusing css style as component
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})

export default FlexBetween;