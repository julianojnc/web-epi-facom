import '../../../styles/Loading.css'
import { ThreeDot } from "react-loading-indicators"

const SmallLoading = () => {
    return (
        <section className="loading-content small">
            <div className='loading'>
                <ThreeDot color="#f1b53d" size="small" text="" textColor="" />
            </div>
        </section>
    )
}

export default SmallLoading;