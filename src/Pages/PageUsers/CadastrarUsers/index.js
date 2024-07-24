import MenuBar from "../../../componentes/MenuBar";
import { Link } from "react-router-dom";
import iconLink from "../../../assets/icon-link.png"
import iconManutencao from "../../../assets/icon-manutencao.png"

const CadastrarUsers = () => {
    return (
        <section>
            <MenuBar />
            <div className="content-page-epi">

                <div className="title">
                    <h1>Cadastro de Usuários</h1>

                    <div className="link-manutencao">
                        <ul>
                            <li>
                                <Link to="/" title='Vincular Periférico'>
                                    <span>
                                        <img src={iconLink} alt="icon"></img>
                                    </span>
                                </Link>
                            </li>

                            <li>
                                <Link to='/' title='Registros de Manutenção'>
                                    <span>
                                        <img src={iconManutencao} alt="icon"></img>
                                    </span>
                                </Link>
                            </li>

                        </ul>
                    </div>
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