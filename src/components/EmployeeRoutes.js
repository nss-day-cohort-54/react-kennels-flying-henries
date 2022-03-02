import React from "react"
import { Route } from "react-router-dom"
// import all needed resources
import Employee from "./employees/Employee"
import EmployeeList from "./employees/EmployeeList"
import EmployeeForm from "./employees/EmployeeForm"

//since it just says export default, and no function name, it will be imported in another module - Kennel.js
export default () => {
    return (
        <>
            <Route exact path="/employees">
                <EmployeeList />
            </Route>
            <Route path="/employees/create">
                <EmployeeForm />
            </Route>
            <Route path="/employees/:employeeId(\d+)">
                <Employee />
            </Route>
        </>
    )
}
