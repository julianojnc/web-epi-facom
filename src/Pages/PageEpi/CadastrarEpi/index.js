import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuBar from "../../../componentes/MenuBar";
import ModalManutencaoEpi from "./ModalManutencaoEpi";
import iconLink from "../../../assets/icon-link.png"
import iconManutencao from "../../../assets/icon-manutencao.png"
import axios from "axios";

const CadastrarEpi = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const epi = {
        nome: '',
        patrimonio: '',
        local: '',
        setor: '',
        dataCompra: '',
        dataGarantia: '',
        idMarca: {
            id: '',
        }
    };

    const [epis, setEpis] = useState([]);
    const [objEpi, setObjEpi] = useState(epi);// Funcao para o cadastro de Epi

    const objMarcas = { id: "" };
    const [marcas, setMarcas] = useState([]);
    const [objMarca, setObjMarca] = useState(objMarcas);
    const [searchMarca, setSearchMarca] = useState('');
    const [searchMarcaOpen, setSearchMarcaOpen] = useState(false);
    const [carregandoMarcas, setCarregandoMarcas] = useState(true);

    useEffect(() => {
        const fetchMarcas = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/marca');
                if (Array.isArray(response.data.lista)) {
                    setMarcas(response.data.lista);
                } else {
                    console.error('A resposta da API não contém a estrutura esperada:', response.data.lista);
                }
            } catch (error) {
                if (error.response) {
                    // A requisição foi feita e o servidor respondeu com um status code fora do alcance 2xx
                    console.error('Erro na resposta da API:', error.response);
                } else if (error.request) {
                    // A requisição foi feita mas nenhuma resposta foi recebida
                    console.error('Erro na requisição:', error.request);
                } else {
                    // Algo aconteceu ao configurar a requisição que disparou um erro
                    console.error('Erro ao configurar a requisição:', error.message);
                }
            }
        };
        fetchMarcas();
    }, []);

    useEffect(() => {
        if (marcas.length === 0) {
            setCarregandoMarcas(true);
        } else {
            setCarregandoMarcas(false);
        }
    }, [marcas]);

    const filterData = (data, searchTerm, fields) => {
        return data.filter(item =>
            fields.some(field => item[field].toLowerCase().includes(searchTerm.toLowerCase()))
        );
    };

    const handleSelection = (type, item) => {
        if (type === 'marca') {
            setObjMarca(item);
            setSearchMarca(item.nome);
            setSearchMarcaOpen(false);
            setObjEpi(prevState => ({
                ...prevState,
                idMarca: item
            }));
        }
    };

    const cadastrar = () => {
        console.log('Objeto a ser enviado:', objEpi); // Adicione esta linha para verificar o objeto

        fetch('http://localhost:4000/api/epi', {
            method: 'post',
            body: JSON.stringify(objEpi),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(retorno => {
                if (!retorno.ok) {
                    throw new Error(`HTTP error! status: ${retorno.status}`);
                }
                return retorno.json();
            })
            .then(retorno_convertido => {
                console.log('Resposta da API:', retorno_convertido); // Adicione esta linha para verificar a resposta

                if (retorno_convertido.mensagem !== undefined) {
                    alert(retorno_convertido.mensagem);
                } else {
                    setEpis([...epis, retorno_convertido]);
                }
            })
            .catch(error => {
                console.error('Erro ao cadastrar Epi:', error);
                alert('Ocorreu um erro ao tentar cadastrar Epi. Confira se não há duplicidade!');
            });
    };

    const aoDigitar = (e) => {
        setObjEpi({ ...objEpi, [e.target.name]: e.target.value });
    }

    // Modal Open
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <section>
            <MenuBar />
            <div className="content-page-epi">

                <div className="title">
                    <h1>Cadastro de Equipamentos</h1>

                    <div className="link-manutencao">
                        <ul>
                            <li>
                                <Link title='Vincular Periférico'>
                                    <span>
                                        <img src={iconLink} alt="icon"></img>
                                    </span>
                                </Link>
                            </li>

                            <li>
                                <Link onClick={() => setModalOpen(true)} title='Registros de Manutenção'>
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
                        <input
                            value={objEpi.nome}
                            onChange={aoDigitar}
                            name='nome'
                            className="input"
                            type="text"
                            placeholder="Nome"
                        />
                    </label>

                    <label className="label"> Patrimônio:
                        <input
                            value={objEpi.patrimonio}
                            onChange={aoDigitar}
                            name='patrimonio'
                            className="input"
                            type="text"
                            placeholder="Patrimônio" />
                    </label>

                    <div className="marca-checkbox">

                        <input
                            value={objMarca.codMarca}
                            onChange={aoDigitar}
                            name="codMarca.id"
                            className="input input-marca"
                            type="text"
                            placeholder="ID Marca"
                            hidden />

                        <label className="label"> Marca:
                            <input
                                value={searchMarca}
                                onClick={() => setSearchMarcaOpen(true)}
                                onChange={(e) => setSearchMarca(e.target.value)}
                                name="idMarca.id"
                                className="input input-marca"
                                type="text"
                                placeholder="Marca" />
                                
                                {searchMarcaOpen && (
                                        <div className="search-bar-curso">
                                            {filterData(marcas, searchMarca, ['nome']).map((obj, indice) => (
                                                <ul key={indice} onClick={() => handleSelection('marca', obj)}>
                                                    <li>
                                                        <p>{obj.nome}</p>
                                                    </li>
                                                </ul>
                                            ))}
                                        </div>
                                    )}
                        </label>

                        <label className="label label-details">
                            <input className="input input-details" type="checkbox" />
                            Mais Detalhes
                        </label>
                    </div>

                    <label className="label"> Service Tag:
                        <input
                            className="input"
                            type="text"
                            placeholder="Service Tag" />
                    </label>

                    <label className="label"> Express Code:
                        <input
                            className="input"
                            type="text"
                            placeholder="Express Code" />
                    </label>

                    <label className="label"> Local:
                        <input
                            value={objEpi.local}
                            onChange={aoDigitar}
                            name='local'
                            className="input"
                            type="text"
                            placeholder="Local" />
                    </label>

                    <label className="label"> Setor:
                        <input
                            value={objEpi.setor}
                            onChange={aoDigitar}
                            name='setor'
                            className="input"
                            type="text"
                            placeholder="Setor" />
                    </label>

                    <label className="label"> Data da Compra:
                        <input
                            value={objEpi.dataCompra}
                            onChange={aoDigitar}
                            name='dataCompra'
                            className="input"
                            type="date"
                            placeholder="Data da Compra" />
                    </label>

                    <label className="label"> Data de Vencimento:
                        <input
                            value={objEpi.dataGarantia}
                            onChange={aoDigitar}
                            name='dataGarantia'
                            className="input"
                            type="date"
                            placeholder="Data de Vencimento da Garantia" />
                    </label>

                    <label className="label"> Usuario
                        <input
                            className="input"
                            type="text"
                            placeholder="Usuario" />
                    </label>

                    <label className="label"> Email do Usuario:
                        <input
                            className="input"
                            type="text"
                            placeholder="Email" />
                    </label>

                    <label className="label"> Contato do Usuario:
                        <input
                            className="input"
                            type="text"
                            placeholder="Contato" />
                    </label>

                    <div className="container-buttons">
                        <Link to='/cadastro-epi' onClick={cadastrar} className="button button-cadastrar">Cadastrar</Link>
                        <Link to='/cadastro-epi' hidden className="button button-cadastrar alterar">Alterar</Link>
                        <Link to='/cadastro-epi' hidden className="button button-cadastrar excluir">Excluir</Link>
                    </div>

                </form>

            </div>

            {modalOpen && (
                <ModalManutencaoEpi onClose={closeModal} />
            )}
        </section>

    )
}

export default CadastrarEpi;