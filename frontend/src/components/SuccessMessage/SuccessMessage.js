import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useAuth } from '../../contexts/AuthContext';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SuccessMessage() {
  const {message, setMessage} = useAuth()
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage("");
  };

  return (
    message && (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={message.length > 0} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          { message }
        </Alert>
      </Snackbar>
    </Stack>
    )
  );
}