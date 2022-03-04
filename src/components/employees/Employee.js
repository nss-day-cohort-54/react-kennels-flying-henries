import React, { useState, useEffect } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import EmployeeRepository from "../../repositories/EmployeeRepository";
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import person from "./person.png"
import "./Employee.css"

// function outputs single representation of employee
export default ({ employee, setEmployees, employees }) => {
    // set up all state needed
    const [animalCount, setCount] = useState(0)
    const [location, markLocation] = useState({ name: "" })
    const [classes, defineClasses] = useState("card employee")
    // get employee id from state
    const { employeeId } = useParams()
    // get current user from simpleAuth
    const { getCurrentUser } = useSimpleAuth()
    const currentUser = getCurrentUser()
    const history = useHistory()
    
    // get data from useResourceResolver function
    const { resolveResource, resource: currentEmployee } = useResourceResolver()

    // checks if employeeId is true, then updates the class in the HTML representation
    useEffect(() => {
        if (employeeId) {
            defineClasses("card employee--single")
        }
        // setting resource state
        resolveResource(employee, employeeId, EmployeeRepository.get)
    }, [])

    // useEffect checks if employeeLocations length is greater than zero
    useEffect(() => {
        if (currentEmployee?.employeeLocations?.length > 0) {
            // if true- pass employeeLocation from array into location state (where does array come from?)
            markLocation(currentEmployee.employeeLocations[0])
        }
    }, [currentEmployee])
    // return JSX
    return (
        <article className={classes}>
            <section className="card-body">
                <img alt="Kennel employee icon" src={person} className="icon--person" />
                <h5 className="card-title">
                    {
                        employeeId
                            ? currentEmployee.name
                            : <Link className="card-link"
                                to={{
                                    pathname: `/employees/${currentEmployee.id}`,
                                    state: { employee: currentEmployee }
                                }}>
                                {currentEmployee.name}
                            </Link>

                    }
                </h5>
                {
                    employeeId
                        ? <>
                            <section>
                                Caring for {animalCount} animals
                            </section>
                            <section>
                                Working at {location.name} location
                            </section>
                        </>
                        : ""
                }
                
                {currentUser.employee ? <button className="btn--fireEmployee" id={currentEmployee.id} onClick={(event) => {
                    //^check if the current user is an employee and then add button if so
                    //conditional all within fire button element
                    //fire button matches with current user's id - what if current user clicks fire on their own employee card?
                    if (currentUser.id === parseInt(event.target.id)) {
                        window.alert("Are you really trying to fire yourself?")
                    } else {
                        //WHY DO I HAVE TO REFRESH PAGE FOR CARD TO DELETE WHEN FIRED
                        //WHY DOES CONSOLE SAY FILTER ERROR
                        //WHY DOES GOING TO SPECIFIC EMPLOYEE CARD REFRESH TO EMPLOYEE PAGE BUT DOES NOT DELETE EMPLOYEE
                        //employee repository has the delete fetch
                        //match with btn id - currentEmployee.id to delete the selected employee
                        EmployeeRepository.delete(currentEmployee.id)
                        .then(() => {

                            if (employeeId) {
                                history.push("/employees")
                            } else {
                                const employeeState = employees.filter(employee => {
                                    return employee.id != currentEmployee.id
                                })
                                setEmployees(employeeState)
                            }
                        })
                }
                    //show fire button if employee and empty string if current user is not an employee
                }}>Fire</button> : ""}

            </section>

        </article>
    )
}
