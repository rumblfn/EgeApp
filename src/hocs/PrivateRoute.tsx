import { Navigate, RouteProps } from 'react-router';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
} & RouteProps;

export default function ProtectedRoute({isAuthenticated, authenticationPath, ...routeProps}: ProtectedRouteProps) {
  if(isAuthenticated) {
    return <div {...routeProps} />;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
};