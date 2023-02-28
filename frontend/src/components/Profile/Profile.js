import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import auth from "../../firebase";
import { generateAvatar } from "../../utils/GenerateAvatar";
const Profile = () => {
    const [avatars, setAvatars] = useState([]);
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const { currentUser, updateUserProfile, setError } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const user = auth.currentUser;
                const token = user && (await user.getIdToken());

                const payloadHeader = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                const res = await axios.get(
                    "http://127.0.0.1:8000/birthdays",
                    payloadHeader
                );
                setProfileData(res.data);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    const fetchAvatars = () => {
        setSelectedAvatar(null);
        const res = generateAvatar();
        setAvatars(res);
    };
    useEffect(() => {
        fetchAvatars();
    }, []);
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (selectedAvatar === null) {
            return setError("Please select an avatar");
        }

        try {
            setError("");
            setLoading(true);
            const user = currentUser;
            const profile = {
                photoURL: avatars[selectedAvatar],
            };
            await updateUserProfile(user, profile);
            navigate("/profile");
        } catch (e) {
            setError("Failed to update profile");
        }

        setLoading(false);
    };

    return (
        <Box>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h3">
                                    {profileData.username}
                                </Typography>
                                <Typography variant="body2">
                                    {profileData.email}
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h5">
                                    Pick your avatar
                                </Typography>
                                <form onSubmit={handleFormSubmit}>
                                    <Grid
                                        container
                                        spacing={2}
                                        sx={{ mb: 3, mt: 2 }}
                                    >
                                        {avatars.map((avatar, index) => (
                                            <Grid
                                                item
                                                xs={4}
                                                sm={4}
                                                md={4}
                                                lg={4}
                                                key={index}
                                            >
                                                <Avatar
                                                    src={avatar}
                                                    sx={{
                                                        width: 100,
                                                        height: 100,
                                                        backgroundColor:
                                                            "#1976D2",
                                                        p: 1,
                                                        cursor: "pointer",
                                                        transition:
                                                            index ===
                                                            selectedAvatar
                                                                ? "0.5s"
                                                                : 0,
                                                        transform:
                                                            index ===
                                                            selectedAvatar
                                                                ? "scale(1.1) rotate(360deg)"
                                                                : "none",
                                                    }}
                                                    onClick={() =>
                                                        setSelectedAvatar(index)
                                                    }
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Button type="submit" variant="contained">
                                        Submit
                                    </Button>
                                    <Button
                                        onClick={fetchAvatars}
                                        type="button"
                                        sx={{ ml: 2 }}
                                        variant="outlined"
                                    >
                                        New Images
                                    </Button>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h4">Fill WishList</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Paper sx={{ p: 3 }}>
                                <Typography variant="h4">Fill WishList</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </>
            )}
        </Box>
    );
};

export default Profile;
