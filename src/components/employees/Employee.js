import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import EmployeeRepository from "../../repositories/EmployeeRepository";
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import person from "./person.png"
import "./Employee.css"


// function outputs single representation of employee
export default ({ employee }) => {
    // set up all state needed
    const [animalCount, setCount] = useState(0)
    const [location, markLocation] = useState({ name: "" })
    const [classes, defineClasses] = useState("card employee")
    // get employee id from state
    const { employeeId } = useParams()
    // get current user from simpleAuth
    const { getCurrentUser } = useSimpleAuth()
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
        if (currentEmployee?.animals?.length > 0) {
            const count = currentEmployee.animals.length
            setCount(count)
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

                {
                    <button className="btn--fireEmployee" onClick={() => {}}>Fire</button>
                }

            </section>

        </article>
    )
}
