import React from "react"
import { Route } from "react-router-dom"
// import all needed data
import AnimalRoutes from "./AnimalRoutes"
import EmployeeRoutes from "./EmployeeRoutes"
import LocationRoutes from "./LocationRoutes"
import SearchResults from "./search/SearchResults"

//since it just says export default, and no function name, it will be imported in another module - Kennel.js
export default () => {
    return (
        <>
            <LocationRoutes />
            <AnimalRoutes />
            <EmployeeRoutes />

            <Route path="/search">
                <SearchResults />
            </Route>
        </>
    )
}
