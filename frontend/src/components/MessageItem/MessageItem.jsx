import { useEffect, useRef } from 'react';
import { Typography, ListItem, ListItemText } from '@mui/material';
import propTypes from './propTypes';

const MessageItem = ({ text, sentDate, daysAgo, textAlign }) => {
  const messageBoxRef = useRef(null);

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollIntoView();
    }
  }, []);

  return (
    <ListItem ref={messageBoxRef}>
      <ListItemText
        primary={<Typography variant="body1">{text}</Typography>}
        secondary={
          <Typography color="text.primary" component="p" variant="caption">
            <span>{sentDate}</span>
            <em> - {daysAgo} days ago</em>
          </Typography>
        }
        style={{ textAlign }}
      />
    </ListItem>
  );
};

MessageItem.propTypes = propTypes;

export default MessageItem;
