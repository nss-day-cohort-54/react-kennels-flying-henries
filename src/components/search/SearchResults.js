import React from "react"
import { useLocation } from "react-router-dom";
import "./SearchResults.css"


export default () => {
    const location = useLocation()


    const displayAnimals = () => {
        //if state property exists on location... 
        if (location.state?.animals.length) {
            
            //...render this
            return    (
                <React.Fragment>
                    <h2>Matching Animals</h2>
                    <section className="animals">
                        Display matching animals
                    </section>
                </React.Fragment>
            )
        }
    }
    
//same logic as displayAnimals function
    const displayEmployees = () => {
        if (location.state?.employees.length) {
            return (
                <React.Fragment>
                    <h2>Matching Employees</h2>
                    <section className="employees">
                        Display matching employees
                    </section>
                </React.Fragment>
            )
        }
    }


    //same logic
    const displayLocations = () => {
        if (location.state?.locations.length) {
            return (
                <React.Fragment>
                    <h2>Matching Locations</h2>
                    <section className="locations">
                        Display matching locations
                    </section>
                </React.Fragment>
            )
        }
    }


    //return an article tag with the values of all functions inside tthe return statement
    return (
        <React.Fragment>
            <article className="searchResults">
                {displayAnimals()}
                {displayEmployees()}
                {displayLocations()}
            </article>
        </React.Fragment>
    )
}
