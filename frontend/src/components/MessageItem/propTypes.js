import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string.isRequired,
  sentDate: PropTypes.string.isRequired,
  daysAgo: PropTypes.number.isRequired,
  textAlign: PropTypes.string.isRequired,
};

export default propTypes;
