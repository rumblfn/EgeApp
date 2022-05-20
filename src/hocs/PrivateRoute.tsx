import { Navigate, Route, RouteProps } from "react-router-dom";

interface Props extends RouteProps {
    isAuth: boolean;

}

export const PrivateRoute = ({isAuth, ...routeProps}: Props) => {
    return isAuth ? <Route { ...routeProps }/> : <Navigate to='/'/>
}