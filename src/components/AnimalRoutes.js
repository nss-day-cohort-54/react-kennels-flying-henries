import React from "react"
import { Route } from "react-router-dom"
import {Animal} from "./animals/Animal"
import AnimalForm from "./animals/AnimalForm"
import { AnimalListComponent } from "./animals/AnimalList"


//the purpose of this module is to decide what to render on the dom based off of what the current url is


//since it just says export default, and no function name, it will be imported in another module via the following line
// import AnimalRoutes from "./AnimalRoutes"
export default () => {
    return (
        <>
            <Route exact path="/animals">
                <AnimalListComponent />
            </Route>
            <Route path="/animals/:animalId(\d+)">
                <Animal />
            </Route>
            <Route path="/animals/new">
                <AnimalForm />
            </Route>
        </>
    )
}
//the routes above specify what to render on the dom based off of the ending for the url, for instance if 
//the url ends with "/animals/new" then the AnimalForm function will be rendered on the dom

//(\d+) means that animalId can be any integer