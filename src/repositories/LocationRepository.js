import Settings from "./Settings"
import { fetchIt } from "./Fetch"
import OwnerRepository from "./OwnerRepository"

export default {
    //gets all employees that work at a location
    async get(id) {
        //first we get active employees/see if user/employee = true
        const employees = await OwnerRepository.getAllEmployees()
        //get the location data
        return await fetchIt(`${Settings.remoteURL}/locations/${id}?_embed=animals&_embed=employeeLocations`)
            .then(location => {
                location.employeeLocations = location.employeeLocations.map(
                    el => {
                        el.employee = employees.find(e => e.id === el.userId)
                        //match employee with location
                        return el
                    }
                )
                return location
            })
    },
    //allows a user to search by location
    async search(terms) {
        const employees = await OwnerRepository.getAllEmployees()
        return await fetchIt(`${Settings.remoteURL}/locations/?name_like=${encodeURI(terms)}&_embed=animals&_embed=employeeLocations`)
            .then(locations => {
                locations = locations.map(location => {
                    location.employeeLocations = location.employeeLocations.map(
                        el => {
                            el.employee = employees.find(e => e.id === el.userId)
                            return el
                        }
                    )
                    return location
                })
                return locations
            })
    },
    //allows user to delete a location
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/locations/${id}`, "DELETE")
    },
    //allows user to get all of the locations
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/locations?_embed=animals&_embed=employeeLocations`)
    }
}
