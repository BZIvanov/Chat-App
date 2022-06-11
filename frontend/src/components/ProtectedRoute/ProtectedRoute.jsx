import { Navigate, Outlet } from 'react-router-dom';
import propTypes from './propTypes';

const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return children || <Outlet />;
};

ProtectedRoute.propTypes = propTypes;

export default ProtectedRoute;
