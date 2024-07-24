import { Link } from 'react-router-dom';
import MenuBar from '../../componentes/MenuBar'
import iconSearch from "../../assets/icon-search.png"
import TableMarcas from './TableMarcas';

const PageMarcas = () => {
    return (
        <section>
            <MenuBar />
            <div className="content-page-epi">

                <div className="title">
                    <h1>Marcas</h1>

                    <span>
                        <input className="input" placeholder="Pesquisar..." />
                        <span className="search-icon">
                            <img src={iconSearch} alt="icon"></img>
                        </span>
                    </span>
                </div>

                <TableMarcas />

                <Link to='/cadastro-marcas' className="button">Cadastrar</Link>
            </div>
        </section>
    )
}

export default PageMarcas;