// export function using typescript 
// declare data types
export const OxfordList = (resources: Array<Object>, namespace: string) => {
    // declare variable with data type and use split method on string 
    const propArray: Array<string> = namespace.split(".")

    // function declares variable and state
    const display = (resource: Object) => {
        // return reduced string array 
        return propArray.reduce(
            // function declares var and data type to pass property string into data object
            (data: Object, property: string) => {
                // @ts-ignore
                //^ possibly ignoring what is on the following line and suppresses errors?
                return data[property]
            }, resource
        )
    }
// return reduced resources 
    return resources.reduce(
        // declare vars and data types
        (list: string, resource: Object, idx: number, resourceArray: Array<Object>) => {
            // var holds value of display function with resource as argument passed in
            const output = display(resource)
            // return list string and conditional output
            return `${list}${
                (resourceArray.length > 1 && idx === resourceArray.length - 1)
                    ? `, and ${output}`
                    : idx === 0
                        ? `${output}`
                        : `, ${output}`
                }`
        },
        ""
    )
}
