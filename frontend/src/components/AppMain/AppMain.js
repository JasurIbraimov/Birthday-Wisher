import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios"
import BirthdayCard from "../BirthdayCard/BirthdayCard";
import { useEffect } from "react";
import auth from "../../firebase";

const Item = styled(BirthdayCard)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));
const AppMain = () => {
    const birthdays = []
    useEffect(() => {
        const fetchData = async () => {
            try {
              const user = auth.currentUser;
              const token = user && (await user.getIdToken());
      
              const payloadHeader = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              };
              const res = await axios.get("http://127.0.0.1:8000/birthdays", payloadHeader);
              console.log(await res.data);
            } catch (e) {
              console.log(e);
            }
          };
    
        fetchData();
      }, []);
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 2, sm: 8, md: 12 }}
            >
                {
                    birthdays.map((birthday) => (
                        <Grid item xs={2} sm={4} md={4} key={birthday.id}>
                            <Item {...birthday} />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
};

export default AppMain;
