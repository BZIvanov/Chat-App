import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  IconButton,
  Drawer,
  Divider,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { ExitToAppIcon } from '../icons';
import { UserAvatar } from '../../components/UserAvatar';
import { signoutAction } from '../../redux/features/user/user-slice';
import { DRAWER_WIDTH } from '../../constants';

const MessagesDrawer = ({
  users = [],
  mobileOpen,
  handleDrawerToggle,
  loading,
  errorMessage,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Chat
        </Typography>
        <IconButton onClick={() => dispatch(signoutAction())}>
          <ExitToAppIcon color="secondary" />
        </IconButton>
      </Toolbar>
      <Divider />

      {loading && (
        <Box sx={{ textAlign: 'center', marginTop: '8px' }}>
          <CircularProgress color="secondary" />
        </Box>
      )}

      {errorMessage && (
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: 'center',
            color: (theme) => theme.palette.warning.main,
          }}
        >
          {errorMessage}
        </Typography>
      )}

      <List>
        {users.map(({ id, firstName, lastName }) => (
          <ListItem
            key={id}
            disablePadding={true}
            onClick={() => navigate(`/chat/${id}`)}
          >
            <ListItemButton>
              <ListItemIcon>
                <UserAvatar firstName={firstName} lastName={lastName} />
              </ListItemIcon>
              <ListItemText primary={`${firstName} ${lastName}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default MessagesDrawer;
