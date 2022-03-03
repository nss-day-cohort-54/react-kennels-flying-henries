import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Animal } from "./Animal"
import { AnimalDialog } from "./AnimalDialog"
import AnimalRepository from "../../repositories/AnimalRepository"
import AnimalOwnerRepository from "../../repositories/AnimalOwnerRepository"
import useModal from "../../hooks/ui/useModal"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import OwnerRepository from "../../repositories/OwnerRepository"

import "./AnimalList.css"
import "./cursor.css"

// function lists out animals in modal 
export const AnimalListComponent = (props) => {
    // set up state
    const [animals, petAnimals] = useState([])
    const [animalOwners, setAnimalOwners] = useState([])
    const [owners, updateOwners] = useState([])
    const [currentAnimal, setCurrentAnimal] = useState({ treatments: [] })
    // import getCurrentUser from useSimpleAuth
    const { getCurrentUser } = useSimpleAuth()
    const history = useHistory()
    // sets up the toggle for modal to appear
    let { toggleDialog, modalIsOpen } = useModal("#dialog--animal")
// get animals state
    const syncAnimals = () => {
        // uses petAnimals to update state of animals array
        AnimalRepository.getAll().then(data => petAnimals(data))
    }
    // useEffect gets all customers, then updates animalOwners state...
    useEffect(() => {
        OwnerRepository.getAllCustomers().then(updateOwners)
        // then gets animal owners and sets animalOwner state
        AnimalOwnerRepository.getAll().then(setAnimalOwners)
        // updates petAnimals
        syncAnimals()
    }, [])

        // function sets current animal with animal passed in, and toggles modal 
    const showTreatmentHistory = animal => {
        setCurrentAnimal(animal)
        toggleDialog()
    }

        // if escape key is pressed, and modal is open- this function closes it
    useEffect(() => {
        const handler = e => {
            if (e.keyCode === 27 && modalIsOpen) {
                toggleDialog()
            }
        }

        window.addEventListener("keyup", handler)

        console.log("event useEffect fired")

        return () => window.removeEventListener("keyup", handler)
    }, [toggleDialog, modalIsOpen])

// return JSX
    return (
        <>
            {/* sets the toggle dialoge to function and animal to current animal state */}
            <AnimalDialog toggleDialog={toggleDialog} animal={currentAnimal} />

        {/* if employee variable holds "true" value return empty string. 
        if false return the register animal button*/}
            {
                getCurrentUser().employee
                    ? ""
                    : <div className="centerChildren btn--newResource">
                        <button type="button"
                            className="btn btn-success "
                            onClick={() => { history.push("/animals/new") }}>
                            Register Animal
                        </button>
                    </div>
            }


            <ul className="animals">
                {
                    animals.map(anml =>
                        // invoke Animal component and set props
                        <Animal key={`animal--${anml.id}`} animal={anml}
                            animalOwners={animalOwners}
                            owners={owners}
                            syncAnimals={syncAnimals}
                            setAnimalOwners={setAnimalOwners}
                            showTreatmentHistory={showTreatmentHistory}
                        />)
                }
            </ul>
        </>
    )
}
