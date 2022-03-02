import React, { useState, useContext } from "react"
import "./AnimalForm.css"
import AnimalRepository from "../../repositories/AnimalRepository";

// function makes JSX output for animal form, takes props as argument
export default (props) => {
    // sets up all state
    const [animalName, setName] = useState("")
    const [breed, setBreed] = useState("")
    const [animals, setAnimals] = useState([])
    const [employees, setEmployees] = useState([])
    const [employeeId, setEmployeeId] = useState(0)
    const [saveEnabled, setEnabled] = useState(false)
// event to construct new animal
    const constructNewAnimal = evt => {
        // prevent default behavior in browser
        evt.preventDefault()
        // put employee id into a variable
        const eId = parseInt(employeeId)

        if (eId === 0) {
            // if employee id is equal to zero, window alert to select caretaker
            window.alert("Please select a caretaker")
            // else find the employee that matches event with employee id, 
            // make an animal object
        } else {
            const emp = employees.find(e => e.id === eId)
            const animal = {
                name: animalName,
                breed: breed,
                employeeId: eId,
                locationId: parseInt(emp.locationId)
            }
            // add animal to AnimalRepository then change saveEnabled state to true
            AnimalRepository.addAnimal(animal)
                .then(() => setEnabled(true))
                // push user back to animals page
                .then(() => props.history.push("/animals"))
        }
    }
    // return JSX
    return (
        <form className="animalForm">
            <h2>Admit Animal to a Kennel</h2>
            <div className="form-group">
                <label htmlFor="animalName">Animal name</label>
                <input
                    type="text"
                    required
                    autoFocus
                    className="form-control"
                    onChange={e => setName(e.target.value)}
                    id="animalName"
                    placeholder="Animal name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="breed">Breed</label>
                <input
                    type="text"
                    required
                    className="form-control"
                    onChange={e => setBreed(e.target.value)}
                    id="breed"
                    placeholder="Breed"
                />
            </div>
            <div className="form-group">
                <label htmlFor="employee">Make appointment with caretaker</label>
                <select
                    defaultValue=""
                    name="employee"
                    id="employeeId"
                    className="form-control"
                    onChange={e => setEmployeeId(e.target.value)}
                >
                    <option value="">Select an employee</option>
                    {employees.map(e => (
                        <option key={e.id} id={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit"
                onClick={constructNewAnimal}
                disabled={saveEnabled}
                className="btn btn-primary"> Submit </button>
        </form>
    )
}
