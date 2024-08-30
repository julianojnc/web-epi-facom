import Modal from ".."
import "../../../styles/ModalContent.css"
import SucessAnimation from "../../LoadingAnimation/SucessAnimation"

const ModalSucess = ({ id, title, titleEditar }) => {
    return (
        <Modal>
            <h1 className="title-modal-sucess">{id ? titleEditar : title}</h1>
            <SucessAnimation />
        </Modal>
    )
}

export default ModalSucess;