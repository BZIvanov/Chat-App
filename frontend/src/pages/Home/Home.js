import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Paper, Typography, Button, Stack } from '@mui/material';

const Home = () => {
  const user = useSelector((state) => state.user.token);

  return (
    <Box>
      <Paper elevation={2}>
        <Stack spacing={2}>
          <Typography variant="h2" sx={{ textAlign: 'center' }}>
            Welcome to the Chat app
          </Typography>

          {user ? (
            <Button component={Link} to="/chat" aa="sss" variant="contained">
              Chat
            </Button>
          ) : (
            <>
              <Button component={Link} to="/signup" variant="contained">
                Sign up
              </Button>

              <Button component={Link} to="/signin" variant="contained">
                Sign in
              </Button>
            </>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default Home;
