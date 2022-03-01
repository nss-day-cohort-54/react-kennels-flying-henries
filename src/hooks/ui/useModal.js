import { useState } from "react"
// modal - mode
const useModal = (selector) => {
    // set up state for modalIsOpen
    const [modalIsOpen, setIsOpen] = useState(false)
    // function that sets modalIsOpen state
    const toggleDialog = () => {
        setIsOpen(!modalIsOpen)
        // if modalIsOpen is true- remove attribute "open", if not, setAttribute to "open", true
        if (modalIsOpen) {
            document.querySelector(`${selector}`).removeAttribute("open")
        } else {
            document.querySelector(`${selector}`).setAttribute("open", true)
        }
    }
    // return object with toggleDialogue and modalIsOpen variable
    return { toggleDialog, modalIsOpen }
}
// export modal function
export default useModal
