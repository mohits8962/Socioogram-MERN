import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { Formik } from "formik";
import * as yup from "yup";

// for dropping files (like uploading)
import Dropzone from "react-dropzone";

import { setLogin } from "state";
import FlexBetween from "components/FlexBetween";



// setting register schema
const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
})


// setting login schema
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
})


// setting initial value for register
const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};


// setting initial value for login
const initialValuesLogin = {
  email: "",
  password: "",
};



// now creating form component

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  // setting dispatch to dispatch actions from reducers
  const dispatch = useDispatch();
  // using navigate to navigate to paths
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const isLogin = pageType === "login";
  const isRegister = pageType === "register";


  // register function

  // the values we are getiing here is from the handle submit
  // because we have a picture image we are gonna use the form data
  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    // we are loopinig throught all the values
    // and we are gonna append it to form data
    for (let value in values) {
      formData.append(value, values[value]);
    }
    // and the other append is picture path
    // and the picture path is gonna be the picture name
    formData.append("picturePath", values.picture.name);

    // and we are saving the response whatever is returning from backend
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    // whaterver we get we gonna save it here and make it in possible form that is json
    const savedUser = await savedUserResponse.json();
    // after that we reset the form
    onSubmitProps.resetForm();

    // if we succefully succeded getiing the user
    // we are gonna set page to login otherwise we not gonna navigate
    if (savedUser) {
      setPageType("login");
    }
  }


  // Login function
  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      "http://localhost:3001/auth/login",
      {
        method: "POST",
        // here we are sending (whatever login data we type) in json
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

    const loggedIn = await loggedInResponse.json();
    // after loin we are resetting the form
    onSubmitProps.resetForm();

    // if the api call has succeded and the user succesfully authenticated 
    // we are gonna dispatch setlogin with user and token
    // here login is the action that we sending to state to dispatch a setlogin function
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      // once we have that we succesfully navigate to home
      navigate("/home");
    }
  };


  // handlesubmit function
  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  }


  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {/* these values allow us to use them inside our components and form */}
      {/* what formik is doing here is example------- */}
      {/* grabbing the handle submit passing it in formik so we can pass it in our onsubmit function */}
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  // onchange handle the situation when we typing
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  // we are checking if the field is touched or there is been error
                  // this will show that we have particular error for this particular field
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  // this will show the error in helper text
                  helperText={touched.firstName && errors.firstName}
                  // we are giving spann here (in larger screen it going to have span of 2 )
                  // and in smaller span of 4
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  // onchange handle the situation when we typing
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  // we are checking if the field is touched or there is been error
                  // this will show that we have particular error for this particular field
                  error={
                    Boolean(touched.lastName) && Boolean(errors.lastName)
                  }
                  // this will show the error in helper text
                  helperText={touched.lastName && errors.lastName}
                  // we are giving spann here (in larger screen it going to have span of 2 )
                  // and in smaller span of 4
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={
                    Boolean(touched.location) && Boolean(errors.location)
                  }
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />

                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />

                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  {/* this is where we can have  automatic configuration so we can apss files and validation as well */}
                  <Dropzone
                    // it will only accept this extension of files
                    acceptedFiles=".jpg,.jpeg,.png"
                    // we are not allowing multiple file to upload at once 
                    multiple={false}
                    // we are setting the set field value for a specific formik input that is "picture"
                    // we can use the setfield value to set those value if we need to
                    // here we are setting thse value manually bcoz we are using dropzone
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {/* this is something that we have to do with dropzone */}
                    {/* so basically we are passing props that we give you and passing it underneath */}
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        {/* this is the section where we passing files */}
                        <input {...getInputProps()} />
                        {/* we are setting if the value isint here then show add pictures */}
                        {/* otherwise show picture name with edit icon */}
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}


            {/* this section is for both login and register */}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              label="Password"
              // using type this will hide our password
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>


          {/* BUTTONS --------------------------------------------- */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {/* switch between register and login */}
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>

            {/* another switch between register and login */}
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                // clearing the inputs that we alredy have
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box >
        </form >
      )}
    </Formik >
  );
};

export default Form;
