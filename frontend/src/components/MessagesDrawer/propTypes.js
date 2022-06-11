import PropTypes from 'prop-types';

const propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    })
  ).isRequired,
  mobileOpen: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  loading: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default propTypes;
