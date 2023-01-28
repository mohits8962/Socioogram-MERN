import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";

import { useMemo } from "react";

import { useSelector } from "react-redux";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import { ErrorBoundary } from 'react-error-boundary'


// for error handling
function ErrorHandler({ error }) {
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
    </div>
  )
}


function App() {
  // useSelector for grabbing information from store (this will help us grabbing the value we set in initial state)
  // grabbing mode by using useSelector
  const mode = useSelector((state) => state.mode)
  // setting theme and then pass it to themeprovider
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // here we are grabbing token from state (so if token is  exist we are authorised)
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/home"
                element={isAuth ? <HomePage /> : <Navigate to="/" />}
              />
              <Route
                path="/profile/:userId"
                element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
              />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  )
}

export default App;
