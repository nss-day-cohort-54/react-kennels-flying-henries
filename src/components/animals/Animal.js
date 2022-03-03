import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router";
import AnimalRepository from "../../repositories/AnimalRepository";
import AnimalOwnerRepository from "../../repositories/AnimalOwnerRepository";
import OwnerRepository from "../../repositories/OwnerRepository";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import "./AnimalCard.css"
// function produces JSX for a single representation of an animal
// Animal takes props
export const Animal = ({ animal, syncAnimals, showTreatmentHistory, owners }) => {
        // set state
    const [detailsOpen, setDetailsOpen] = useState(false)
    const [isEmployee, setAuth] = useState(false)
    const [myOwners, setPeople] = useState([])
    const [allOwners, registerOwners] = useState([])
    const [classes, defineClasses] = useState("card animal")
    // useSimpleAuth returns true if current user is employee
    const { getCurrentUser } = useSimpleAuth()
    const history = useHistory()
    const { animalId } = useParams()
    const { resolveResource, resource: currentAnimal } = useResourceResolver()

    // sets boolean value for employee property
    useEffect(() => {
        setAuth(getCurrentUser().employee)
        // sets resolveResource to animal object with all data associated with the animal that is assigned to the employee
        resolveResource(animal, animalId, AnimalRepository.get)
    }, [])

    // registerOwners updates allOwners state which is an array and passes owners as argument
    useEffect(() => {
        if (owners) {
            // updates state of owners array
            registerOwners(owners)
        }
    }, [owners])

    // gets function that returns owners by animal from AnimalOwnerRepository
    // sets state for myOwners array
    const getPeople = () => {
        return AnimalOwnerRepository
            // function matches animal with owner
            .getOwnersByAnimal(currentAnimal.id)
            .then(people => setPeople(people))
    }
    // when currentAnimal state changes, invoke getPeople to find new owner
    useEffect(() => {
        getPeople()
    }, [currentAnimal])

    // if animalId is present in useParams function...
    useEffect(() => {
        if (animalId) {
            // define animal HTML tag with below assigned class
            defineClasses("card animal--single")
            // displays details of animal by switching setDetailOpen to true
            setDetailsOpen(true)

            // fetches animal users by animal id, 
            // then set state of myOwners to all users which have that animal id
            AnimalOwnerRepository.getOwnersByAnimal(animalId).then(d => setPeople(d))
                .then(() => {
                    // get all customers state, then call registerOwners function
                    OwnerRepository.getAllCustomers().then(registerOwners)
                })
        }
    }, [animalId])

    // return JSX with card that displays info for each animal
    return (
        <>
            <li className={classes}>
                <div className="card-body">
                    <div className="animal__header">
                        <h5 className="card-title">
                            <button className="link--card btn btn-link"
                                style={{
                                    cursor: "pointer",
                                    "textDecoration": "underline",
                                    "color": "rgb(94, 78, 196)"
                                }}
                                onClick={() => {
                                    if (isEmployee) {
                                        showTreatmentHistory(currentAnimal)
                                    }
                                    else {
                                        history.push(`/animals/${currentAnimal.id}`)
                                    }
                                }}> {currentAnimal.name} </button>
                        </h5>
                        <span className="card-text small">{currentAnimal.breed}</span>
                    </div>

                    <details open={detailsOpen}>
                        <summary className="smaller">
                            <meter min="0" max="100" value={Math.random() * 100} low="25" high="75" optimum="100"></meter>
                        </summary>

                        <section>
                            <h6>Caretaker(s)</h6>
                            <span className="small">
                                {currentAnimal.animalCaretakers?.map(caretaker => {
                                    return <div key={`user-${caretaker.id}`}>{caretaker.user.name}</div>
                                })}
                            </span>


                            <h6>Owners</h6>
                            <span className="small">
                                Owned by unknown
                            </span>

                            {
                                myOwners.length < 2
                                    ? <select defaultValue=""
                                        name="owner"
                                        className="form-control small"
                                        onChange={() => {}} >
                                        <option value="">
                                            Select {myOwners.length === 1 ? "another" : "an"} owner
                                        </option>
                                        {
                                            allOwners.map(o => <option key={o.id} value={o.id}>{o.name}</option>)
                                        }
                                    </select>
                                    : null
                            }


                            {
                                detailsOpen && "treatments" in currentAnimal
                                    ? <div className="small">
                                        <h6>Treatment History</h6>
                                        {
                                            currentAnimal.treatments.map(t => (
                                                <div key={t.id}>
                                                    <p style={{ fontWeight: "bolder", color: "grey" }}>
                                                        {new Date(t.timestamp).toLocaleString("en-US")}
                                                    </p>
                                                    <p>{t.description}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    : ""
                            }

                        </section>

                        {
                            isEmployee
                                ? <button className="btn btn-warning mt-3 form-control small" onClick={() =>
                                    AnimalOwnerRepository
                                        .removeOwnersAndCaretakers(currentAnimal.id)
                                        .then(() => {}) // Remove animal
                                        .then(() => {}) // Get all animals
                                }>Discharge</button>
                                : ""
                        }

                    </details>
                </div>
            </li>
        </>
    )
}
