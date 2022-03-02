import React from "react"
import { Route, Redirect } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

const AuthRoute = ({ path, component: TargetComponent }) => {
    //useSimpleAuth returns { isAuthenticated (a boolean value), logout, login, register, getCurrentUser }
    // checks if user is authenticated
    const { isAuthenticated } = useSimpleAuth()

    return (
        <Route exact path={path} render={props => {
            // if authenticated route to TargetComponent with props
            if (isAuthenticated()) {
                return <TargetComponent {...props} />
            } else {
                // if false, route to login
                return <Redirect to="/login" />
            }
        }} />
    )
}
//since it just says export default, and no function name, it will be imported in another module? (not imported anywhere yet)
export default AuthRoute
