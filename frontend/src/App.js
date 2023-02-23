import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Container, Box } from "@mui/material"
// App Components
import AppFooter from "./components/AppFooter/AppFooter";
import AppMain from "./components/AppMain/AppMain";
import AppNavBar from "./components/AppNavbar/AppNavbar";
import Signin from "./components/Signin/Signin"; 
import Signup from "./components/Signup/Signup"; 

// API 
import { getAllBithdays } from "./api";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import SuccessMessage from "./components/SuccessMessage/SuccessMessage";
import Profile from "./components/Profile/Profile";
const App = () => {
    return <div className="app">
        <AuthProvider>
            <AppNavBar />
            <Container>
                <Box mt="6rem">
                    <Routes>
                        <Route path="/" element={ <AppMain/> } />
                        <Route path="/profile" element={ <Profile /> } />
                        <Route path="/signin" element={ <Signin /> } />
                        <Route path="/signup" element={ <Signup /> } />
                    </Routes>
                </Box>
            </Container>
            <AppFooter />
            <SuccessMessage />
            <ErrorMessage />
        </AuthProvider>
        

    </div>;
};

export default App;
