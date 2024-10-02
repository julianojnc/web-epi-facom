import '../../../styles/Loading.css'
import { OrbitProgress } from "react-loading-indicators"

// Loading Medio utilizado na espera do retorno da api na modal manutencao, vincular periferico e vincular usuario
const MediumLoading = ({ modalLoading }) => {
    return (
        <div className={modalLoading ? "modalLoading" : 'modal-loading-table'}>
            <OrbitProgress dense variant="track-disc" color="#f1b53d" size="large" speedPlus="2" easing="linear" />

            {modalLoading ? (
                <h1>Carregando e Armazenando os Dados...</h1>
            ) :
                (<></>)}
        </div>
    )
}

export default MediumLoading;