import React from "react"
import { Route, Redirect } from "react-router-dom"
import Login from "./auth/Login"
import { Register } from "./auth/Register"
import { NavBar } from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Kennel.css"


export const Kennel = () => {
    const { isAuthenticated } = useSimpleAuth()

    //if current user is authenticated...
    return <>
        <Route render={() => {
            if (isAuthenticated()) {
                //...render these
                return <>
                    <NavBar />
                    <ApplicationViews />
                </>
            } else 
            //if not authenticated
            {
                return <Redirect to="/login" />
            }
        }} />
        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </>
}
