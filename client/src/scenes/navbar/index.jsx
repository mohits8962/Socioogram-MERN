import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery } from "@mui/material";
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close } from "@mui/icons-material";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import FlexBetween from "components/FlexBetween";

import { setMode, setLogout } from "state";



const Navbar = () => {
  // this is value for if we open up the mobile menu in small screens and we can use it to toggle on and off
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  // setting dispatch to dispatch actions from reducers
  const dispatch = useDispatch();
  // using navigate to navigate to paths
  const navigate = useNavigate();
  // using useSelector to select the state.user from the state file 
  const user = useSelector((state) => state.user);


  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  //setting themes so we can use the themes which we set in theme.js
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;
  // const fullName = "Fake Person"

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          // clamp is a fucntion we can use in css that determine minimum, prefferd and maximum value for font
          // example ---------- means if the screen size is small then it set it to 1 or if its large then its 2.25
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            }
          }}
        >
          Socioogram
        </Typography>


        {/* if its mobile screen we are not going to give it search bar */}
        {/* this will showing search bar */}
        {isNonMobileScreens && (
          <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>


      {/* DESKTOP NAV --------------------------------------------------------------------------------- */}

      {isNonMobileScreens ?
        (<FlexBetween gap="2rem">
          {/* setting this for switching between dark and light mode */}
          <IconButton onClick={() => dispatch(setMode())}>
            {
              theme.palette.mode === "dark" ?
                (<DarkMode sx={{ fontSize: "25px" }} />) :
                (<LightMode sx={{ color: dark, fontSize: "25px" }} />)
            }
          </IconButton>

          {/* setting icons */}
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          {/* side form showing logged in person and showing logout option to logout */}
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>
                  {fullName}
                </Typography>
              </MenuItem>
              {/* dispatching logout reducer to logout */}
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
        ) : (
          // mobile hamburgur menu
          <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
            <Menu />
          </IconButton>
        )}



      {/* MOBILE NAV --------------------------------------------------------------------------------- */}

      {/* if its mobile screen amd mobile menu toggled  */}
      {/* so basically when we toggled it should open up the ebox */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >

          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)} >
              <Close />
            </IconButton>
          </Box>


          {/* MENU ITEMS --------------------------------------------------------------------------------- */}
          {/* same menu items for mobile screen */}
          <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem" >
            {/* setting this for switching between dark and light mode */}
            <IconButton onClick={() => dispatch(setMode())}>
              {
                theme.palette.mode === "dark" ?
                  (<DarkMode sx={{ fontSize: "25px" }} />) :
                  (<LightMode sx={{ color: dark, fontSize: "25px" }} />)
              }
            </IconButton>

            {/* setting icons */}
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            {/* side form showing logged in person and showing logout option to logout */}
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>
                    {fullName}
                  </Typography>
                </MenuItem>
                {/* dispatching logout reducer to logout */}
                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;