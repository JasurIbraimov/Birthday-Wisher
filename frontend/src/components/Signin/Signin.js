import {
    Box,
    Typography,
    InputLabel,
    FormControl,
    Input,
    Grid,
    Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const navigate = useNavigate();
    const { currentUser, login, setMessage, setError } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    async function handleFormSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            await login(email, password);
            setMessage("Welcome!")
            navigate("/profile");
        } catch (e) {
            setError("Wrong credentials! Please, try again!")
        }

        setLoading(false);
    }
    return (
        <Box>
            <form onSubmit={handleFormSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={8} lg={8}>
                        <Typography variant="h3">Sign In</Typography>
                        <FormControl
                            margin="dense"
                            fullWidth
                            variant="standard"
                        >
                            <InputLabel htmlFor="email">
                                Email address
                            </InputLabel>
                            <Input
                                id="email"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl
                            margin="dense"
                            fullWidth
                            variant="standard"
                        >
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            size="large"
                            color="primary"
                            variant="contained"
                            sx={{ mt: 2 }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Signin;
