import PropTypes from 'prop-types';

const propTypes = {
  signup: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default propTypes;
