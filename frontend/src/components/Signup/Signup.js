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
import Calendar from "rc-calendar";
import moment from "moment";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const { currentUser, register, setError, setMessage } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [birthday, setBirthday] = useState("");

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    async function handleFormSubmit(e) {
        e.preventDefault();
        if(birthday.length == 0) {
            return setError("Birthday not chosen!")
        }
        if (password !== confirmPassword) {
            return setError("Passwords do not match!");
        }

        try {
            setLoading(true);
            await register(email, password, birthday, username);
            navigate("/profile");
            setMessage("Welcome, " + username + "!")
        } catch (e) {
            setError("Email already in use!")
        }

        setLoading(false);
    }
    return (
        <Box>
            <form onSubmit={handleFormSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={8} lg={8}>
                        <Typography variant="h3">Sign Up</Typography>
                        <FormControl
                            margin="dense"
                            fullWidth
                            variant="standard"
                        >
                            <InputLabel htmlFor="username">
                                Username
                            </InputLabel>
                            <Input
                                required
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                            />
                        </FormControl>
                        <FormControl
                            margin="dense"
                            fullWidth
                            variant="standard"
                        >
                            <InputLabel htmlFor="email">
                                Email address
                            </InputLabel>
                            <Input
                                required
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
                                required
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl
                            margin="dense"
                            fullWidth
                            variant="standard"
                        >
                            <InputLabel htmlFor="confirm">
                                Confirm Password
                            </InputLabel>
                            <Input
                                required
                                id="confirm"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
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
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                        <FormControl fullWidth variant="standard">
                            <Typography variant="h6">Your Birthday</Typography>
                            <Calendar
                                style={{ width: "100%" }}
                                onChange={(value) =>
                                    setBirthday(
                                        value.format("YYYY-MM-DD HH:mm:ss")
                                    )
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Signup;
