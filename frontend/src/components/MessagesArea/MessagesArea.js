import { Toolbar, Box, List, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { MessageItem } from '../MessageItem';
import { NewMessage } from '../NewMessage';
import { DRAWER_WIDTH } from '../../constants';

const MessagesArea = ({ id, messages, sendMessage }) => {
  return (
    <Box
      component="div"
      sx={{
        flexGrow: 1,
        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
      }}
    >
      <Toolbar />
      <List
        sx={{
          height: { xs: 'calc(100vh - 135px)', sm: 'calc(100vh - 143px)' },
          overflowY: 'scroll',
        }}
      >
        {messages.length > 0 ? (
          messages.map(({ id: messageId, text, senderId, createdAt }) => {
            const sentDate = DateTime.fromISO(createdAt);
            const currentDate = DateTime.now();
            const diff = currentDate.diff(sentDate, [
              'years',
              'months',
              'days',
              'hours',
            ]);

            return (
              <MessageItem
                key={messageId}
                text={text}
                sentDate={sentDate.toFormat('HH:mm:ss')}
                daysAgo={diff.days}
                textAlign={Number(id) === senderId ? 'left' : 'right'}
              />
            );
          })
        ) : (
          <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
            No messages
          </Typography>
        )}
      </List>

      <Box>
        <NewMessage receiverId={id} sendMessage={sendMessage} />
      </Box>
    </Box>
  );
};

export default MessagesArea;
