import MenuBar from "../../../componentes/MenuBar";
import { Link } from "react-router-dom";

const CadastrarMarcas = () => {
    return (
        <section>
            <MenuBar />
            <div className="content-page-epi">

                <div className="title">
                    <h1>Cadastro de Marcas</h1>
                </div>

                <form>

                    <label className="label"> Nome da Marca:
                        <input className="input" type="text" placeholder="Nome" />
                    </label>
                
                    
                    <div className="container-buttons">
                        <Link to='/cadastro-epi' className="button button-cadastrar">Cadastrar</Link>
                        <Link to='/cadastro-epi' hidden className="button button-cadastrar alterar">Alterar</Link>
                        <Link to='/cadastro-epi' hidden className="button button-cadastrar excluir">Excluir</Link>
                    </div>

                </form>

            </div>
        </section>
    )
}

export default CadastrarMarcas;