import { useEffect, useState } from "react";
import { cadastrarPerifericos } from "../api";
import MenuBar from "../../../componentes/MenuBar";
import { Link } from "react-router-dom";
import iconManutencao from "../../../assets/icon-manutencao.png"
import { fetchMarca } from "../../PageMarcas/api/apiMarca";
import SmallLoading from "../../../componentes/LoadingAnimation/SmallLoading";
import ModalSucess from "../../../componentes/Modal/ModalSucess";

const CadastrarPeriferico = () => {

    const [sucessAnimation, setSucessAnimation] = useState(false);

    const periferico = {
        nome: '',
        patrimonio: '',
        serviceTag: '',
        expressCode: '',
        dataCompra: '',
        dataGarantia: '',
        isVinculado: '',
        idMarca: {
            id: '',
        }
    };

    const [perifericos, setPerifericos] = useState([]);
    const [objPeriferico, setObjPeriferico] = useState(periferico);// Funcao para o cadastro de Periferico

    const objMarcas = { id: "" };
    const [marcas, setMarcas] = useState([]);
    const [objMarca, setObjMarca] = useState(objMarcas);
    const [searchMarca, setSearchMarca] = useState('');
    const [searchMarcaOpen, setSearchMarcaOpen] = useState(false);
    const [carregando, setCarregando] = useState(true);

    const cadastrar = async () => {
        console.log('Objeto a ser enviado:', objPeriferico);
        try {
            const response = await cadastrarPerifericos(objPeriferico);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setPerifericos([...perifericos, response]);
                setSucessAnimation(true);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao cadastrar Periferico:', error);
            alert('Ocorreu um erro ao tentar cadastrar Periferico!');
        }
    };

    const aoDigitar = (e) => {
        setObjPeriferico({ ...objPeriferico, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const fetchAndSetMarcas = async () => {
            const fetchedMarcas = await fetchMarca();
            setMarcas(fetchedMarcas);
        };
        fetchAndSetMarcas();
    }, []);

    useEffect(() => {
        setCarregando(marcas.length === 0);
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
            setObjPeriferico(prevState => ({
                ...prevState,
                idMarca: item
            }));
        }
    };

    return (
        <section>
            <MenuBar />
            <div className="content-page-epi">

                <div className="title">
                    <h1>Cadastro de Periféricos</h1>

                    <div className="link-manutencao">
                        <ul>

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
                        <input
                            value={objPeriferico.nome}
                            onChange={aoDigitar}
                            name='nome'
                            className="input"
                            type="text"
                            placeholder="Nome"
                        />
                    </label>

                    <label className="label"> Patrimônio:
                        <input
                            value={objPeriferico.patrimonio}
                            onChange={aoDigitar}
                            name='patrimonio'
                            className="input"
                            type="text"
                            placeholder="Patrimônio"
                        />
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
                                carregando ? (
                                    <SmallLoading />
                                ) : (
                                    <div className="search-bar-curso">
                                        {filterData(marcas, searchMarca, ['nome']).map((obj, indice) => (
                                            <ul key={indice} onClick={() => handleSelection('marca', obj)}>
                                                <li>
                                                    <p>{obj.nome}</p>
                                                </li>
                                            </ul>
                                        ))}
                                    </div>
                                )
                            )}

                        </label>

                        <label className="label label-details">
                            <input className="input input-details" type="checkbox" />
                            Mais Detalhes
                        </label>
                    </div>

                    <label className="label"> Service Tag:
                        <input
                            value={objPeriferico.serviceTag}
                            onChange={aoDigitar}
                            name='serviceTag'
                            className="input"
                            type="text"
                            placeholder="Service Tag"
                        />
                    </label>

                    <label className="label"> Código:
                        <input
                            value={objPeriferico.expressCode}
                            onChange={aoDigitar}
                            name='expressCode'
                            className="input"
                            type="text"
                            placeholder="Código"
                        />
                    </label>

                    <label className="label"> Data Compra:
                        <input
                            value={objPeriferico.dataCompra}
                            onChange={aoDigitar}
                            name='dataCompra'
                            className="input"
                            type="date"
                            placeholder="Data Compra"
                        />
                    </label>

                    <label className="label"> Data Garantia:
                        <input
                            value={objPeriferico.dataGarantia}
                            onChange={aoDigitar}
                            name='dataGarantia'
                            className="input"
                            type="date"
                            placeholder="Data Garantia"
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

export default CadastrarPeriferico;
