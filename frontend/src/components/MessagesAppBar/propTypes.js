import PropTypes from 'prop-types';

export const defaultPropTypes = {
  selectedUser: false,
};

const propTypes = {
  selectedUser: PropTypes.oneOfType([
    PropTypes.bool, // null is not supported by propTypes so we set defaultPtoptype of bool
    PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  ]),
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default propTypes;
