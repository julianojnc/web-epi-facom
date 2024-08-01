import '../../../styles/Loading.css'
import { OrbitProgress } from "react-loading-indicators"

const LargeLoading = () => {
    return (
        <section className="loading-content">
            <div className='loading'>
                <OrbitProgress dense variant="track-disc" color="#f1b53d" size="large" speedPlus="2" easing="linear" />
            </div>
        </section>
    )
}

export default LargeLoading;