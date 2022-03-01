//imports useState hook from react
import { useState } from "react"


// defines a new function, useAPIAuth
const useAPIAuth = () => {

    //loggedIn initial value is false
    const [loggedIn, setIsLoggedIn] = useState(false)

    //defines a new function, isAuthenticated
    const isAuthenticated = () =>
        loggedIn
        //checks that "credentials" in local and session storage is not null
        || localStorage.getItem("credentials") !== null
        || sessionStorage.getItem("credentials") !== null

    //defines a new function, login, which accepts an email, a password, and storageType set as localStorage
    const login = (email, password, storageType = localStorage) => {

        //this accesses localStorage, invokes the setItem function, and adds the item "credentials"
        storageType.setItem(
            "credentials",

            //stringifies the following info so it can be used with the api
            JSON.stringify({
                //email key value is what gets passed in as the value for the parameter email
                email: email,
                //password key value is what gets passed in as the value for the parameter password
                password: password
            })
        )
        //makes the value of loggedIn true
        setIsLoggedIn(true)
    }

    //defines a new function, logout
    const logout = () => {

        //makes the value of loggedIn false
        setIsLoggedIn(false)
        //removes the credintials item from local and session storage
        localStorage.removeItem("credentials")
        sessionStorage.removeItem("credentials")
    }
    //returns the return value of these three functions
    return { isAuthenticated, logout, login }
}

//exports a single return value for useAPIAuth
export default useAPIAuth



