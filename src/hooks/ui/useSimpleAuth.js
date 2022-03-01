//what in da hell is this
//imports the exported "default" object in the Settings.js file
//allows access to the localhost and secretKey(like a password to access the )
import Settings from "../../repositories/Settings"

//this module is mainly used for authorizing and profiling users
//a custom hook to authenticate users and adds a login system to the app
//one main purpose is to offer different types of access to different users (ie. customers vs employees)
const useSimpleAuth = () => {

    //kennel_token is current user
    //isAuthenticated checks if localStorage current user does not equal null OR if session storage's current user does not equal null
    const isAuthenticated = () => localStorage.getItem("kennel_token") !== null
        || sessionStorage.getItem("kennel_token") !== null

        //POST fetch defined as register and takes user as input
        //sends information that user registers with
        //Settings.remoteURL gets whatever URL you have database access to
    const register = (user) => {
        //fetches the users array
        return fetch(`${Settings.remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(_ => _.json())
        .then(response => {
            if ("id" in response) {
                const baseUserObject = JSON.stringify(response)
                //convert buffer to string representing the object
                //buffer manipulates or interacts with binary data
                //base64(all symbols on keyboard you ca find) uses keys and converts binary into decimal or symbol?
                let encoded = Buffer.from(baseUserObject).toString("base64")
                localStorage.setItem("kennel_token", encoded)
            }
        })
    }

    //login is defined as a function to fetch and get the user's email
    //uses existing users login info to match user info in database
    const login = (email) => {
        return fetch(`${Settings.remoteURL}/users?email=${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(_ => _.json())
        .then(matchingUsers => {
            if (matchingUsers.length > 0) {
                //if there is a matching user, then return true and encode user kennel token
                const baseUserObject = JSON.stringify(matchingUsers[0])
                let encoded = Buffer.from(baseUserObject).toString("base64")
                localStorage.setItem("kennel_token", encoded)
                return true
            }
            return false
        })
    }

    //clears local storage and session storage 
    //data in local storage does not expire and stays on your computer
    //data in session storage expires when page is terminated, stays on computer until browser changes
    //logs to the console that credntials are removed and state changed
    const logout = () => {
        console.log("*** Toggling auth state and removing credentials ***")
        localStorage.removeItem("kennel_token")
        sessionStorage.removeItem("kennel_token")
    }

    //gets current user logged in whenever re-rendered
    //unencoding the users authentication data for json readability
    const getCurrentUser = () => {
        const encoded = localStorage.getItem("kennel_token")
        const unencoded = Buffer.from(encoded, "base64").toString("utf8")
        const parsed = JSON.parse(unencoded)
        //The Object.assign() method copies all enumerable own properties from one or more source objects to a target object. 
        //It returns the target object.
        //creates a new state object rather than changing the old state?
        //merge object literals?
        const bare = Object.assign(Object.create(null), parsed)
        return bare
    }
    //useSimpleAuth returns { isAuthenticated (a boolean value), logout, login, register, getCurrentUser }
    return { isAuthenticated, logout, login, register, getCurrentUser }
}

//exports several functions from useSimpleAuth function above
export default useSimpleAuth

//Export Default is used to export only one value from a file which can be a class, function, or object. 
//The default export can be imported with any name.
