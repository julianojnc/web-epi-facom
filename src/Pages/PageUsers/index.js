import { Link } from "react-router-dom";
import MenuBar from "../../componentes/MenuBar";
import iconSearch from "../../assets/icon-search.png";
import TableUsers from "./TableUsers";

const PageUsers = () => {
    return (
        <section>
            <MenuBar />
            <div className="content-page-epi">

                <div className="title">
                    <h1>Usuários</h1>

                    <span>
                        <input className="input" placeholder="Pesquisar..." />
                        <span>
                            <img src={iconSearch} alt="icon"></img>
                        </span>
                    </span>
                </div>

                <TableUsers />

                <Link to='/cadastro-usuarios' className="button">Cadastrar</Link>
            </div>
        </section>
    )
}

export default PageUsers;