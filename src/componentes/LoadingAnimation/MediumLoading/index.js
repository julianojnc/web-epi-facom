import '../../../styles/Loading.css'
import { OrbitProgress } from "react-loading-indicators"

// Loading Medio utilizado na espera do retorno da api na modal manutencao, vincular periferico e vincular usuario
const MediumLoading = () => {
    return (
        <div className='modal-loading-table'>
        <OrbitProgress dense variant="track-disc" color="#f1b53d" size="large" speedPlus="2" easing="linear" />
        </div>
    )
}

export default MediumLoading;