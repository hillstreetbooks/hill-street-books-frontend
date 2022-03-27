import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.user.info);
  const { _id } = user || { _id: null };
  let { authorId } = useParams();

  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  if (location.pathname === '/profile' && _id === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (authorId && authorId !== _id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export { RequireAuth };
