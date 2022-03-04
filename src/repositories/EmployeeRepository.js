import Settings from "./Settings"
import { fetchIt } from "./Fetch"


export default {
    //gets an emloyee by id
    async get(id) {
        const userLocations = await fetchIt(`${Settings.remoteURL}/employeeLocations?userId=${id}&_expand=location&_expand=user`)
        return await fetchIt(`${Settings.remoteURL}/animalCaretakers?userId=${id}&_expand=animal`)
            .then(data => {
                const userWithRelationships = userLocations
                userWithRelationships.locations = userLocations
                userWithRelationships.animals = data
                return userWithRelationships
                //returns locations and animals for caretaker/employee
            })
    },
    //allows a user to delete a user/employee
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/users/${id}`, "DELETE")
        .then(() => {
            //get caretakers
            const careTakers = fetchIt(`${Settings.remoteURL}/animalCaretakers`)
            return careTakers
        })
        .then((careTakers) => {
            //match id against caretakers.userId
            const matchedCareTakers = careTakers.filter(careTaker => careTaker.userId === id)
            //delete matching caretaker objects
            for (const careTaker of matchedCareTakers) {
                fetchIt(`${Settings.remoteURL}/animalCaretakers/${careTaker.id}`, "DELETE")
            }
        })
    },
    //allows user to add an employee
    async addEmployee(employee) {
        return await fetchIt(`${Settings.remoteURL}/users`, "POST", JSON.stringify(employee))
    },
    //allows user to assign an employee to a lcoation
    async assignEmployee(rel) {
        return await fetchIt(`${Settings.remoteURL}/employeeLocations`, "POST", JSON.stringify(rel))
    },
    async getEmployeesWithAnimals() {
        return await fetchIt(`${Settings.remoteURL}/users?employee=true&_embed=animalCaretakers`)
    },
    //get's all data for employee and employee locations
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/users?employee=true&_embed=employeeLocations`)
    }
}
