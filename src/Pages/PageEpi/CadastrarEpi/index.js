import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuBar from "../../../componentes/MenuBar";
import ModalManutencaoEpi from "./ModalManutencaoEpi";
import ModalVincularPeriferico from "./ModalVincularPeriferico";
import iconLink from "../../../assets/icon-link.png"
import iconManutencao from "../../../assets/icon-manutencao.png"
import { fetchMarcas, cadastrarEpi } from "../api/apiEpi";

const CadastrarEpi = () => {

    const [manutencaoOpen, setManutencaoOpen] = useState(false);
    const [perifericoOpen, setPerifericoOpen] = useState(false);

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
        const fetchAndSetMarcas = async () => {
            const fetchedMarcas = await fetchMarcas();
            setMarcas(fetchedMarcas);
        };
        fetchAndSetMarcas();
    }, []);

    useEffect(() => {
        setCarregandoMarcas(marcas.length === 0);
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

    const cadastrar = async () => {
        console.log('Objeto a ser enviado:', objEpi);
        try {
            const response = await cadastrarEpi(objEpi);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setEpis([...epis, response]);
            }
        } catch (error) {
            console.error('Erro ao cadastrar Epi:', error);
            alert('Ocorreu um erro ao tentar cadastrar Epi. Confira se não há duplicidade!');
        }
    };

    const aoDigitar = (e) => {
        setObjEpi({ ...objEpi, [e.target.name]: e.target.value });
    };

    const closeModal = () => {
        setManutencaoOpen(false);
        setPerifericoOpen(false);
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
                                <Link onClick={() => setPerifericoOpen(true)} title='Vincular Periférico'>
                                    <span>
                                        <img src={iconLink} alt="icon"></img>
                                    </span>
                                </Link>
                            </li>

                            <li>
                                <Link onClick={() => setManutencaoOpen(true)} title='Registros de Manutenção'>
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

            {manutencaoOpen && (
                <ModalManutencaoEpi onClose={closeModal} />
            )}
            {perifericoOpen && (
                <ModalVincularPeriferico onClose={closeModal} />
            )}
        </section>

    )
}

export default CadastrarEpi;