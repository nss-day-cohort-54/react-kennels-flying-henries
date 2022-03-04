import React from "react"
import { Link } from "react-router-dom"
import locationImage from "./location.png"
import "./Location.css"




//location just returns JSX
export default ({location}) => {

        return (
            <article className="card location" style={{ width: `18rem` }}>
                <section className="card-body">
                    <img alt="Kennel location icon" src={locationImage} className="icon--location" />
                    <h5 className="card-title">
                        <Link className="card-link"
                            to={{
                                pathname: `/locations/${location.id}`,
                                state: { location: location }
                            }}>
                            {location.name}
                        </Link>
                    </h5>
                </section>
                <section>
                    {location.animals.length} animals live here
                </section>
                <section>
                    Imprisons {location.employeeLocations.length} workers
                </section>
            </article>
        )
    }

