import AnimalRepository from "./AnimalRepository"
import { fetchIt } from "./Fetch"
import Settings from "./Settings"

//async event - gets params and await keyword tells it what to do/what to fetch here
//async functions are paused until the request completes/promise is settled
//when request completes, response is assigned with response object of the request
//await can only be used in async functions. 
//It is used for calling an async function and waits for it to resolve or reject. 
//await blocks the execution of the code within the async function in which it is located.
export default {
    async get(params) {
        const e = await fetch(`${Settings.remoteURL}/animalOwners/${params}`, {
            headers: { //metadata?
                "Authorization": `Bearer ${localStorage.getItem("kennel_token")}`
            }
        })
        return await e.json()
    }, //authorization for current user to get or delete a user
    async delete(id) {
        const e = await fetch(`${Settings.remoteURL}/animalOwners/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("kennel_token")}`
            }
        })
        return await e.json()
    },
    //function to remove owners and caretakers while fetching owner data and employee/caretaker data
    async removeOwnersAndCaretakers(animalId) {
        return AnimalRepository.get(animalId)
            .then(animal => {
                const ownerDeletes = animal.animalOwners.map(
                    ao => fetchIt(`${Settings.remoteURL}/animalOwners/${ao.id}`,"DELETE")
                )
                const employeeDeletes = animal.animalCaretakers.map(
                    c => fetchIt(`${Settings.remoteURL}/animalCaretakers/${c.id}`, "DELETE")
                )
                return Promise.all(ownerDeletes)
                    .then(() => Promise.all(employeeDeletes))
            })
    },
    //get the owners of each animal by fetching animalID expanded to users
    async getOwnersByAnimal (animalId) {
        const e = await fetch(`${Settings.remoteURL}/animalOwners?animalId=${animalId}&_expand=user`)
        return await e.json()
    },
    //after you get the the matching owner for an animal, assign animal owners and make an object 
    async assignOwner(animalId, userId) {
        const e = await fetch(`${Settings.remoteURL}/animalOwners`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("kennel_token")}`
            },
            "body": JSON.stringify({ animalId, userId })
        })
        return await e.json()
    },
    //gets animal, user, animal owners, and employee data
    async getAll() {
        const e = await fetch(`${Settings.remoteURL}/animalOwners?_expand=user&user.employee=false&_expand=animal`)
        return await e.json()
    }
}