import MenuBar from "../../componentes/MenuBar";
import './PageEpi.css'
import TableEpi from "./TableEpi";
import iconSearch from "../../assets/icon-search.png"
import { Link } from "react-router-dom";

const PageEpi = () => {
    return (
        <section>
            <MenuBar />
            <div className="content-page-epi">

                <div className="title">
                    <h1>Equipamentos</h1>

                    <span>
                        <input className="input" placeholder="Pesquisar..." />
                        <span>
                            <img src={iconSearch} alt="icon"></img>
                        </span>
                    </span>
                </div>

                <TableEpi></TableEpi>
                
                <Link to='/cadastro-epi' className="button-cadastrar">Cadastrar</Link>
            </div>
        </section>
    )
}

export default PageEpi;