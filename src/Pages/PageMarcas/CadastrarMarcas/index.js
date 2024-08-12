import MenuBar from "../../../componentes/MenuBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { cadastrarMarcas, fetchMarcaById } from "../api/apiMarca";
import ModalSucess from "../../../componentes/Modal/ModalSucess";
import CadastroHeader from "../../../componentes/PageComponents/PageCadastroHeader";
import Buttons from "../../../componentes/PageComponents/PageCadastroButtons";

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
                <CadastroHeader
                    id={id}
                    title="Cadastro de Marca"
                    titleEditar="Editar Marca"
                    hiddenPeriferico={true}
                    hiddenManutencao={true}
                />

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

                    <Buttons
                        id={id}
                        cadastrar={cadastrar}
                    />
                </form>
            </div>

            {sucessAnimation && (
                <ModalSucess title="Marca Cadastrada!" />
            )}
        </section>
    )
}

export default CadastrarMarcas;