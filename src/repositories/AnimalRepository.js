import Settings from "./Settings"
import { fetchIt } from "./Fetch"
import OwnerRepository from "./OwnerRepository"

//find the user/owner and caretaker that matches with an animal (userId that matches animalOwnerId)
const expandAnimalUser = (animal, users) => {
    animal.animalOwners = animal.animalOwners.map(ao => {
        ao.user = users.find(user => user.id === ao.userId)
        //returns animal's owner/user
        return ao
    })

    animal.animalCaretakers = animal.animalCaretakers.map(caretaker => {
        caretaker.user = users.find(user => user.id === caretaker.userId)
        //returns animal's caretaker
        return caretaker
    })
    //returns the matching animal
    return animal
}

export default {
    //get the owners and caretakers of animals and wait for fetch and promise to resolve before returning animal
    async get(id) {
        const users = await OwnerRepository.getAll()
        return await fetchIt(`${Settings.remoteURL}/animals/${id}?_embed=animalOwners&_embed=treatments&_embed=animalCaretakers`)
            .then(animal => {
                animal = expandAnimalUser(animal, users)
                return animal
            })
    },
    //allows a user to search by animal name
    async searchByName(query) {
        return await fetchIt(`${Settings.remoteURL}/animals?_expand=employee&_sort=employee.id&_embed=treatments&_expand=location&name_like=${query}`)
    },
    //allows user to delete an animal by id
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/animals/${id}`, "DELETE")
    },
    //gets all info about an animal, including owner, caretaker, treatment
    async getAll() {
        const users = await OwnerRepository.getAll()
        const animals = await fetchIt(`${Settings.remoteURL}/animals?_embed=animalOwners&_embed=treatments&_embed=animalCaretakers`)
            .then(data => {
                const embedded = data.map(animal => {
                    animal = expandAnimalUser(animal, users)
                    return animal
                })
                return embedded
            })
        return animals
    },
    //creates a new object for a new animal
    async addAnimal(newAnimal) {
        return await fetchIt(
            `${Settings.remoteURL}/animals`,
            "POST",
            JSON.stringify(newAnimal)
        )
    },
    //allows a user to edit an animals data
    async updateAnimal(editedAnimal) {
        return await fetchIt(
            `${Settings.remoteURL}/animals/${editedAnimal.id}`,
            "PUT",
            JSON.stringify(editedAnimal)
        )
    }
}
