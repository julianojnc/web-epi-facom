import MenuBar from "../../../componentes/MenuBar";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { cadastrarMarcas, fetchMarcaById } from "../api/apiMarca";
import ModalSucess from "../../../componentes/Modal/ModalSucess";

const CadastrarMarcas = () => {
    const { id } = useParams(); // Obtenha o ID da URL
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

    useEffect(() => {
        if (id) {
            const fetchMarca = async () => {
                const marcaData = await fetchMarcaById(id); // Fetch Epi data by ID
                setObjMarca(marcaData);
            };
            fetchMarca();
        }
    }, [id]);

    const aoDigitar = (e) => {
        setObjMarca({ ...objMarca, [e.target.name]: e.target.value });
    }

    return (
        <section>
            <MenuBar />
            <div className="content-page">

                <div className="title">
                    <h1>{id ? 'Editar Marca' : 'Cadastro de Marca'}</h1>
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
                        {id ? (
                            <>
                                <Link to='/cadastro-marcas' className="button button-cadastrar alterar">Alterar</Link>
                                <Link to='/cadastro-marcas' className="button button-cadastrar excluir">Excluir</Link>
                            </>
                        ) : (
                            <Link onClick={cadastrar} className="button button-cadastrar">Cadastrar</Link>
                        )}
                    </div>

                </form>

            </div>

            {sucessAnimation && (
                <ModalSucess title="Marca Cadastrada!" />
            )}
        </section>
    )
}

export default CadastrarMarcas;