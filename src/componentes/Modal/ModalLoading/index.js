import Modal from ".."
import MediumLoading from "../../LoadingAnimation/MediumLoading"

const ModalLoading = () => {

    return (
        <Modal>
            <MediumLoading
                modalLoading={true}
            />
        </Modal>
    )
}

export default ModalLoading;