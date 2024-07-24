import MenuBar from "../../../componentes/MenuBar";
import { Link } from "react-router-dom";

const CadastrarEpi = () => {
    return (
        <section>
            <MenuBar />
            <div className="content-page-epi">

                <div className="title">
                    <h1>Cadastro de Equipamentos</h1>
                </div>

                <form>
                    <label className="label"> Nome:
                        <input className="input" type="text" placeholder="Nome" />
                    </label>

                    <label className="label"> Patrimônio:
                        <input className="input" type="text" placeholder="Patrimônio" />
                    </label>

                    <div className="marca-checkbox">
                        <label className="label"> Marca:
                            <input className="input input-marca" type="text" placeholder="Marca" />
                        </label>

                        <label className="label label-details">
                            <input className="input input-details" type="checkbox" />
                            Mais Detalhes
                        </label>
                    </div>

                    <label className="label"> Service Tag:
                        <input className="input" type="text" placeholder="Service Tag" />
                    </label>

                    <label className="label"> Express Code:
                        <input className="input" type="text" placeholder="Express Code" />
                    </label>

                    <label className="label"> Local:
                        <input className="input" type="text" placeholder="Local" />
                    </label>

                    <label className="label"> Setor:
                        <input className="input" type="text" placeholder="Setor" />
                    </label>

                    <label className="label"> Data da Compra:
                        <input className="input" type="text" placeholder="Data da Compra" />
                    </label>

                    <label className="label"> Data de Vencimento:
                        <input className="input" type="text" placeholder="Data de Vencimento da Garantia" />
                    </label>

                    <label className="label"> Usuario
                        <input className="input" type="text" placeholder="Usuario" />
                    </label>

                    <label className="label"> Email do Usuario:
                        <input className="input" type="text" placeholder="Email" />
                    </label>

                    <label className="label"> Contato do Usuario:
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

export default CadastrarEpi;