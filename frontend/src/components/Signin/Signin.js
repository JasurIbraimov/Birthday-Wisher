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
import { useTranslation } from 'react-i18next';

const Signin = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();   
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
            setMessage(t("welcome"))
            navigate("/profile");
        } catch (e) {
            setError(t("tryAgain"))
        }

        setLoading(false);
    }
    return (
        <Box>
            <form onSubmit={handleFormSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={8} lg={8}>
                        <Typography variant="h3">{t("signin")}</Typography>
                        <FormControl
                            margin="dense"
                            fullWidth
                            variant="standard"
                        >
                            <InputLabel htmlFor="email">
                               {t("email")}
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
                            <InputLabel htmlFor="password">{t("password")}</InputLabel>
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
                            {t("submit")}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Signin;
