import React, { useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { Link, useHistory } from "react-router-dom";
import "./Login.css"

//  useSimpleAuth is used to get user from API and encode data and is stored as kennel_token in local storage, 
// then returns boolean that shows is user exists
// user information is imported into Login function

// function for logging in 
const Login = () => {
    // sets up credentials state and sets up default object
    const [credentials, syncAuth] = useState({
        email: "",
        remember: false
    })
    // gets login value from useSimpleAuth function 
    const { login } = useSimpleAuth()
    const history = useHistory()

    // Simplistic handler for login submit
    // prevents default html loading, then setting storage- if true get data from localStorage, if not get data from sessionStorage
    const handleLogin = (e) => {
        e.preventDefault()
        const storage = credentials.remember ? localStorage : sessionStorage

        /*
            For now, just store the email and userName that
            the customer enters into local storage.
        */
        // after storage is set, console log message and send data into login function
        console.log("*** Initiate authentication ***")
        login(credentials.email, credentials.userName, storage)
            // update state
            .then(success => {
                // if data comes back console log message
                if (success) {
                    console.log("*** Rerouting to root URL ***")
                    // use history to push back to home page
                    history.push("/")
                }
            })
    }
    // event handler for user input
    const handleUserInput = (event) => {
        // gets state of credentials
        const copy = {...credentials}
        // sets id of copy as value enter
        copy[event.target.id] = event.target.value
        // update state of credentials with new data
        syncAuth(copy)
    }
    // return JSX
    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Nashville Kennels</h1>
                    <h2 className="h3 mb-3 font-weight-normal">Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email" onChange={handleUserInput}
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <input
                            onChange={
                                (event) => {
                                    const copy = {...credentials}
                                    if (event.target.value === "on") {
                                        copy.remember = true
                                    }
                                    else {
                                        copy.remember = false
                                    }
                                    syncAuth(copy)
                                }
                            }
                            defaultChecked={credentials.remember}
                            type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember"> Remember Me </label>
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                    </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}
export default Login
