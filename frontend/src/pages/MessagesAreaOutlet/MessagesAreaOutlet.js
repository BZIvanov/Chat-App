import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { GET_MESSAGES, SEND_MESSAGE, GET_MESSAGES_SUB } from './gql';
import { MessagesArea } from '../../components/MessagesArea';

const MessagesAreaOutlet = () => {
  const [messages, setMessages] = useState([]);

  const { id } = useParams();

  useQuery(GET_MESSAGES, {
    variables: {
      receiverId: Number(id),
    },
    fetchPolicy: 'cache-first',
    onCompleted: ({ userMessages }) => {
      setMessages(userMessages);
    },
  });

  const [sendMessage] = useMutation(SEND_MESSAGE);

  useSubscription(GET_MESSAGES_SUB, {
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      setMessages((prevMessages) => [...prevMessages, data.postMessage]);
    },
  });

  return <MessagesArea id={id} messages={messages} sendMessage={sendMessage} />;
};

export default MessagesAreaOutlet;
