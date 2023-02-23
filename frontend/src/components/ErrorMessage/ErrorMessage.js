import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useAuth } from '../../contexts/AuthContext';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorMessage() {
  const {error, setError} = useAuth()
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError("");
  };

  return (
    error && (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={error.length > 0} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          { error }
        </Alert>
      </Snackbar>
    </Stack>
    )
  );
}