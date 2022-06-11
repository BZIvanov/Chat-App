import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      createdAt: PropTypes.string,
      senderId: PropTypes.number,
      receiverId: PropTypes.number,
    })
  ).isRequired,
  sendMessage: PropTypes.func,
};

export default propTypes;
