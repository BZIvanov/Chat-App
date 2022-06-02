import { useState, useMemo } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useQuery, useSubscription } from '@apollo/client';
import { Box } from '@mui/material';
import { MessagesDrawer } from '../../components/MessagesDrawer';
import { GET_USERS, GET_USERS_SUB } from './gql';
import { MessagesAppBar } from '../../components/MessagesAppBar';

const Chat = () => {
  const { id } = useParams();

  const [users, setUsers] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { loading, error } = useQuery(GET_USERS, {
    fetchPolicy: 'cache-first', // this is the default policy
    onCompleted: (data) => {
      setUsers(data.users);
    },
  });

  useSubscription(GET_USERS_SUB, {
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      setUsers((prevUsers) => [...prevUsers, data.createUser]);
    },
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const selectedUser = useMemo(() => {
    if (id) {
      return users.find((user) => user.id === id);
    }

    return null;
  }, [id, users]);

  return (
    <Box sx={{ display: 'flex' }}>
      <MessagesAppBar
        selectedUser={selectedUser}
        handleDrawerToggle={handleDrawerToggle}
      />

      <MessagesDrawer
        users={users}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        loading={loading}
        errorMessage={error && error.message}
      />

      {/* Messages area */}
      <Outlet />
    </Box>
  );
};

export default Chat;
