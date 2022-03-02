import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import "./Login.css"

//exporting the Register function that registers a new user
export const Register = () => {
    //start with an object with empty string values for user info and employee checkbox value is boolean
    const [credentials, syncAuth] = useState({
        firstName: "",
        lastName: "",
        email: "",
        employee: false
    })
    //register is a function from useSimpleAuth and extract register from useSimpleAuth
    const { register } = useSimpleAuth()
    const history = useHistory()

    //event handler which prevents the default 
    const handleRegister = (e) => {
        //stops a page reload from occuring and goes to the route we choose
        e.preventDefault()

        //establishes the newUser object with input user info
        const newUser = {
            name: `${credentials.firstName} ${credentials.lastName}`,
            email: credentials.email,
            employee: credentials.employee
        }
        //call register and pass in newUser object and then go to root URL
        register(newUser).then(() => {
            history.push("/")
        })
    }

    //event handler that gets state of credentials and sets id value of credentials
    const handleUserInput = (event) => {
        const copy = {...credentials}
        copy[event.target.id] = event.target.value
        //updates state of credentials with copy object 
        syncAuth(copy)
    }

    //return JSX
    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for NSS Kennels</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input type="text" onChange={handleUserInput}
                        id="firstName"
                        className="form-control"
                        placeholder="First name"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input type="text" onChange={handleUserInput}
                        id="lastName"
                        className="form-control"
                        placeholder="Last name"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input type="email" onChange={handleUserInput}
                        id="email"
                        className="form-control"
                        placeholder="Email address"
                        required />
                </fieldset>
                <fieldset>
                    <input
                        onChange={
                            (event) => {
                                const copy = { ...credentials }
                                if (event.target.value === "on") {
                                    copy.employee = true
                                }
                                else {
                                    copy.employee = false
                                }
                                syncAuth(copy)
                            }
                        }
                        defaultChecked={credentials.employee}
                        type="checkbox" name="employee" id="employee" />
                    <label htmlFor="employee"> Employee account? </label>
                </fieldset>

                <fieldset>
                    <button type="submit">
                        Sign in
                    </button>
                </fieldset>
            </form>
        </main>
    )
}
