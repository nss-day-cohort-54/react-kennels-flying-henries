import { useEffect, useState } from "react"


//defines a new function, useResourceResolver
const useResourceResolver = () => {


    //initial value of resource is an empty object
    const [resource, setResource] = useState({})


    useEffect(() => {

        //when resource state changes, console log "resolved resource" and the value of resource
        console.log('resolved resource', resource)

        //this useEffect runs when the state of resource changes
    }, [resource])

    //defines a new variable resolveResource, which accepts three arguments
    const resolveResource = (property, param, getter) => {
        // Resource passed as prop
        //checks if property is true and also that there is an id key in property
        if (property && "id" in property) {
            //if both evaluate to true, the value of resource is changed to the value of property
            setResource(property)
        }
        else {
            // If being rendered indepedently
            if (param) {
                getter(param).then(retrievedResource => {
                    setResource(retrievedResource)
                })
            }
        }
    }

    return { resolveResource, resource }
}

export default useResourceResolver
