import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import AnimalRepository from "../../repositories/AnimalRepository";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import Settings from "../../repositories/Settings";
import LocationRepository from "../../repositories/LocationRepository";
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"


//exports a search bar & the nav bar
export const NavBar = () => {
    //search terms is an empty string and allows a user to save a search to state
    const [ searchTerms, setTerms ] = useState("")
    //getting the users info & authentication
    const { isAuthenticated, logout, getCurrentUser } = useSimpleAuth()
    const history = useHistory()

    //search event listener
    const search = (e) => {
        //if enter key is pressed, then search
        if (e.keyCode === 13) {
            //get the search terms from document
            const terms = document.querySelector("#searchTerms").value
            //creates foundItems object and contains empty arrays
            const foundItems = {
                animals: [],
                locations: [],
                employees: []
            }
            //fetch the remoteURL from setting
            //terms are encoded for unique URL when searched
            //.then searches the different resources and returns matching resources with terms as input
            fetch(`${Settings.remoteURL}/users?employee=true&name_like=${encodeURI(terms)}`)
                .then(r => r.json())
                //set the foundItems.employees as employees 
                .then(employees => {
                    foundItems.employees = employees
                    //return the location
                    return LocationRepository.search(terms)
                })
                .then(locations => {
                    //set the location
                    foundItems.locations = locations
                    return AnimalRepository.searchByName(encodeURI(terms))
                })
                .then(animals => {
                    //set the animals
                    foundItems.animals = animals
                    //changes searchTerms
                    setTerms("")
                    //sending user to the search page after setting terms - returns an empty string to search again?
                    history.push({
                        pathname: "/search",
                        state: foundItems
                    })
                })
        }
        else {
            //if user has not entered... then search field is set as searchTerms (whatever the user has input) transient state
            setTerms(e.target.value)
        }
    }

        //return JSX including navbar hyperlinks
    return (
        <div className="container">
            <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top onTop">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbarNavDropdown" className="navbar-collapse collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">NSS Kennels <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/locations">Locations</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/animals">Animals</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/employees">Employees</Link>
                        </li>
                        <li className="nav-item">
                            <input id="searchTerms"
                                onKeyUp={search}
                                className="form-control w-100"
                                type="search"
                                placeholder="Search"
                                aria-label="Search" />
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            {
                                isAuthenticated()
                                    ? <Link onClick={() => {
                                        logout()
                                    }} className="nav-link" to="/login">Logout {getCurrentUser().name}</Link>
                                    : <Link className="nav-link" to="/login">Login</Link>
                            }
                        </li>
                        <li className="nav-item">
                            {
                                !isAuthenticated()
                                    ? <Link className="nav-link" to="/register">Register</Link>
                                    : ""
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
