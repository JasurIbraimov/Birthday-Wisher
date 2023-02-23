import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Calendar from "rc-calendar";
import moment from 'moment';

const BirthdayCard = ({ date, email, username }) => {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        {username}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} variant="body2">
                        {email}
                    </Typography>
                    <Calendar
                        value={moment(date)}
                        showDateInput={false}
                        showToday={false}
                        style={{ boxShadow: "none", border: "none", width: "100%" }}
                    />
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default BirthdayCard;
