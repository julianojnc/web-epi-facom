import MenuBar from "../../../componentes/MenuBar";
import { Link } from "react-router-dom";
import iconLink from "../../../assets/icon-link.png"
import iconManutencao from "../../../assets/icon-manutencao.png"

const CadastrarMarcas = () => {
    return (
        <section>
            <MenuBar />
            <div className="content-page-epi">

                <div className="title">
                    <h1>Cadastro de Marcas</h1>

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