import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import EnglishIcon from "./english.png"
import RussianIcon from "./russian.png"


import { useTranslation } from "react-i18next";
const lngs = [
    { code: "en", native: "English", icon: EnglishIcon },
    { code: "ru", native: "Russian", icon: RussianIcon },
];

function AppNavbar() {
    const { t, i18n } = useTranslation();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const handleTrans = (code) => {
        handleCloseNavMenu();
        i18n.changeLanguage(code);
        localStorage.setItem("language-code", code)
    };

    useEffect(() => {
        const langCode = localStorage.getItem("language-code")
        if (langCode) {
            i18n.changeLanguage(langCode)
        } 
    }, [])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleProfile = () => {
        handleCloseUserMenu();
        navigate("/profile");
    };
    const handleLogout = async () => {
        handleCloseUserMenu();
        try {
            await logout();
            return navigate("/");
        } catch (e) {
            return alert("Failed to Logout");
        }
    };
    return (
        <AppBar position="fixed">
            <Container>
                <Toolbar disableGutters>
                   <Link to={"/"} style={{"color": "white", "textDecoration": "none"}}>
                   <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        {t("appName")}
                    </Typography>
                    </Link>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    {t("myFriends")}
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    Languages
                                </Typography>
                            </MenuItem>
                        </Menu>

                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >
                            {lngs.map((lng, i) => {
                                const { code, native, icon } = lng;
                                return (
                                    <MenuItem  onClick={() => handleTrans(code)}>
                                            <Avatar sx={{width: 20, height: 20, mr: 1}} src={icon} alt={native} />
                                            {native}
                                    </MenuItem>
                                );
                            })}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        {t("appName")}
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {t("myFriends")}
                            </Button>
                        </Link>
                        <Tooltip title={t("openLanguages")}>
                            <Button
                                onClick={handleOpenNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {t("languages")}
                            </Button>
                        </Tooltip>
                    </Box>
                    {currentUser ? (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title={t("openSettings")}>
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        alt={currentUser.username}
                                        src={currentUser.photoURL}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleProfile}>
                                    <Typography textAlign="center">
                                        {t("profile")}
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <Typography textAlign="center">
                                        {t("logOut")}
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <>
                            <Link
                                to="signin"
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    {t("signin")}
                                </Button>
                            </Link>
                            <Link
                                to="signup"
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    {t("signup")}
                                </Button>
                            </Link>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default AppNavbar;
