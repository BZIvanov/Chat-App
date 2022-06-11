import { Typography, Toolbar, IconButton, Box, AppBar } from '@mui/material';
import { MenuIcon } from '../icons';
import { DRAWER_WIDTH } from '../../constants';
import propTypes, { defaultPropTypes } from './propTypes';

const MessagesAppBar = ({ selectedUser, handleDrawerToggle }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {selectedUser
              ? `Chat with ${selectedUser.firstName} ${selectedUser.lastName}`
              : 'Select an user to chat with'}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

MessagesAppBar.propTypes = propTypes;

MessagesAppBar.defaultProps = defaultPropTypes;

export default MessagesAppBar;
