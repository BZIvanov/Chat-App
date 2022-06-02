import { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import { SendIcon } from '../icons';

const NewMessage = ({ receiverId, sendMessage }) => {
  const [text, setText] = useState('');

  const handleEnterPressed = (e) => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      setText('');
      sendMessage({
        variables: {
          text,
          receiverId: Number(receiverId),
        },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setText('');
    sendMessage({
      variables: {
        text,
        receiverId: Number(receiverId),
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate={true}>
      <TextField
        hiddenLabel={true}
        multiline={true}
        variant="filled"
        minRows={2}
        maxRows={2}
        value={text}
        fullWidth={true}
        onChange={(event) => {
          setText(event.target.value);
        }}
        placeholder="Send a message"
        onKeyDown={handleEnterPressed}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default NewMessage;
