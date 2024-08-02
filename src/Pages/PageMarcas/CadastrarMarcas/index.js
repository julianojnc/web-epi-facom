import MenuBar from "../../../componentes/MenuBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cadastrarMarcas } from "../api/apiMarca";
import ModalSucess from "../../../componentes/Modal/ModalSucess";

const CadastrarMarcas = () => {

    const [sucessAnimation, setSucessAnimation] = useState(false);

    const marca = {
        nome: ''
    };

    const [marcas, setMarcas] = useState([]);
    const [objMarca, setObjMarca] = useState(marca);// Funcao para o cadastro de Marca

    const cadastrar = async () => {
        console.log('Objeto a ser enviado:', objMarca);
        try {
            const response = await cadastrarMarcas(objMarca);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setMarcas([...marcas, response]);
                setSucessAnimation(true);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao cadastrar Marca:', error);
            alert('Ocorreu um erro ao tentar cadastrar Marca!');
        }
    };

    const aoDigitar = (e) => {
        setObjMarca({ ...objMarca, [e.target.name]: e.target.value });
    }

    return (
        <section>
            <MenuBar />
            <div className="content-page-epi">

                <div className="title">
                    <h1>Cadastro de Marcas</h1>
                </div>

                <form>

                    <label className="label"> Nome da Marca:
                        <input
                            value={objMarca.nome}
                            onChange={aoDigitar}
                            name='nome'
                            className="input"
                            type="text"
                            placeholder="Nome"
                        />
                    </label>


                    <div className="container-buttons">
                        <Link onClick={cadastrar} className="button button-cadastrar">Cadastrar</Link>
                        <Link to='/cadastro-epi' hidden className="button button-cadastrar alterar">Alterar</Link>
                        <Link to='/cadastro-epi' hidden className="button button-cadastrar excluir">Excluir</Link>
                    </div>

                </form>

            </div>

            {sucessAnimation && (
                <ModalSucess />
            )}
        </section>
    )
}

export default CadastrarMarcas;