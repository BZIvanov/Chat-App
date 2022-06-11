import PropTypes from 'prop-types';

const propTypes = {
  signin: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default propTypes;
