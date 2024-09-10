import '../../../styles/Loading.css'
import { ThreeDot } from "react-loading-indicators"

// Loading pequeno usado para carregar as marcas "pretendo utilizar em carregamento ao clicar em certos botoes"
const SmallLoading = () => {
    return (
        <section className="loading-content small">
            <div className='loading'>
                <ThreeDot color="#f1b53d" size="small" />
            </div>
        </section>
    )
}

export default SmallLoading;