import '../../styles/Modal.css'

const Modal = ({children}) => {
    return (

        <div className="overlay">
            <div className="dialog">
               {children}
            </div>
        </div>
    )
}

export default Modal