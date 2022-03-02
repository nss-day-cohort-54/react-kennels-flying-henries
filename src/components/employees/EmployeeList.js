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
        }, []
    )
// returns html of employee list
    return (
        <>
            <div className="employees">
                {
                    emps.map(a => <Employee key={a.id} employee={a} />)
                }
            </div>
        </>
    )
}
