import MenuBar from "../../../componentes/MenuBar";
import { Link } from "react-router-dom";

const CadastrarUsers = () => {
    return (
        <section>
            <MenuBar />
            <div className="content-page-epi">

                <div className="title">
                    <h1>Cadastro de Usuários</h1>
                </div>

                <form>
                    <label className="label"> Nome:
                        <input className="input" type="text" placeholder="Nome" />
                    </label>

                    <label className="label"> Email:
                        <input className="input" type="text" placeholder="Email" />
                    </label>


                    <label className="label"> Contato:
                        <input className="input" type="text" placeholder="Contato" />
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

export default CadastrarUsers;