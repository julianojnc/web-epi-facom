import Modal from ".."
import "../../../styles/ModalContent.css"
import SucessAnimation from "../../LoadingAnimation/SucessAnimation"

const ModalSucess = ({ title }) => {
    return(
        <Modal>
            <h1 className="title-modal-sucess">{title}</h1>
            <SucessAnimation/>
        </Modal>
    )
}

export default ModalSucess;