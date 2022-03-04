import React, { useState, useEffect } from "react"
import Employee from "./Employee"
import EmployeeRepository from "../../repositories/EmployeeRepository"
import "./EmployeeList.css"

// exports function to list out employees
export default () => {
    // sets up employee state
    const [emps, setEmployees] = useState([])


    // gets all data from EmployeeRepository
    useEffect(
        () => {
            EmployeeRepository.getAll()
            .then(
                (employeeData) => {
                    setEmployees(employeeData)
                }
            )
        }, []
    )
// returns html of employee list
    return (
        <>
            <div className="employees">
                {
                    emps.map(employee => <Employee key={employee.id} employee={employee} />)
                }
            </div>
        </>
    )
}
