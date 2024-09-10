import { Link } from "react-router-dom"
import Modal from ".."
import TableManutencao from "./TableManutencao"
import iconClose from "../../../assets/icon-close.png"
import { useEffect, useState } from "react"
import { cadastrarManutencao, fetchManutencao } from "./api/apiManutencao"
import ModalSucess from "../ModalSucess";
import Paginacao from "../../Paginacao"
import MediumLoading from "../../LoadingAnimation/MediumLoading"

const ModalManutencao = ({ onClose, objEpiPeriferico, isEpi }) => {

    const manutencao = {
        descricao: "",
        valor: "",
        dataIniManutencao: "",
        dataRetManutencao: "",
        idEpi: {
            id: ""
        },
        idPeriferico: {
            id: ""
        }
    };

    const [manutencoes, setManutencoes] = useState([]);
    const [objManutencao, setObjManutencao] = useState(manutencao);
    const [carregando, setCarregando] = useState(true); // Hook para mostrar animação de Carregamento
    const [sucessAnimation, setSucessAnimation] = useState(false); // Modal Cadastrado com Sucesso
    const [totalRegistros, setTotalRegistros] = useState(0); // Hook para armazenar o total de registros info vinda da api
    const [totalPaginas, setTotalPaginas] = useState(0); // Hook para armazenar o total de paginas info vinda da api
    const [paginaAtual, setPaginaAtual] = useState(0); // Hook para armazenar em qual pagina esta selecionada info vinda da api
    const [tamanhoPagina] = useState(10); // Hook para dizer quantos registro ira ser mostrado na tela

    // Carregando Api
    useEffect(() => {
        const fetchAndSetManutencao = async () => {
            setCarregando(true); // Ativa o carregamento antes da busca
            const { lista, totalRegistros, totalPaginas } = await fetchManutencao(paginaAtual, tamanhoPagina);
            setManutencoes(lista);
            setTotalRegistros(totalRegistros);
            setTotalPaginas(totalPaginas);
            setCarregando(false); // Desativa o carregamento após a busca
        };
        fetchAndSetManutencao();
    }, [paginaAtual, tamanhoPagina]);

    const handlePageChange = (newPage) => {
        setPaginaAtual(newPage);
    };

    // Filtro das manutenções com base no objEpiPeriferico.id
    const manutencoesFiltradas = manutencoes.filter((item) => {
        return (isEpi === "epi" && item.idEpi?.id === objEpiPeriferico.id) ||
            (isEpi !== "epi" && item.idPeriferico?.id === objEpiPeriferico.id);
    });

    // Atualiza o idEpi ou idPeriferico baseado no isEpi
    useEffect(() => {
        if (objEpiPeriferico && objEpiPeriferico.id) {
            setObjManutencao(prevState => ({
                ...prevState,
                ...(isEpi === "epi"
                    ? { idEpi: { id: objEpiPeriferico.id } }
                    : { idPeriferico: { id: objEpiPeriferico.id } })
            }));
        }
    }, [objEpiPeriferico, isEpi]);

    // cadastrar manutencao
    const cadastrar = async () => {
        if (!objManutencao.descricao) {
            alert('Por favor, preencha o campo obrigatório: Descrição!');
            return;
        }
        console.log('Objeto a ser enviado antes da modificação:', objManutencao);

        // Se enviar o obj com o idEpi e idPeriferico tera erro 500 no backend entao é removido um antes do post
        // Clonar o objeto para evitar modificar o estado diretamente
        const objEnvio = { ...objManutencao };

        // Remover idPeriferico se for EPI e idEpi se for Periférico
        if (isEpi === "epi") {
            delete objEnvio.idPeriferico;
        } else {
            delete objEnvio.idEpi;
        }
        console.log('Objeto a ser enviado após modificação:', objEnvio);

        try {
            const response = await cadastrarManutencao(objEnvio);
            console.log('Resposta da API:', response);

            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                // Atualizar o estado com os dados da manutencao cadastrada
                setSucessAnimation(true); // Modal Cadastrado com sucesso é ativada
                setTimeout(() => { // Tempo de 2segundos é disparado
                    setSucessAnimation(false); // Modal Cadastrado com sucesso é desativada
                    setObjManutencao(response); // Preenche os inputs com os dados retornados da API
                    setManutencoes([...manutencoes, response]);
                }, 2000 /* Declarado os 2 segundos */);
            }
        } catch (error) {
            console.error('Erro ao cadastrar Manutencao:', error);
            alert('Ocorreu um erro ao tentar cadastrar Manutencao!');
        }
    };

    console.log(objManutencao)

    const aoDigitar = (e) => {
        setObjManutencao({ ...objManutencao, [e.target.name]: e.target.value });
    }

    return (
        <Modal>
            <div className="dialog-title">
                <h1>REGISTRO DE MANUTENÇÃO</h1>

                <Link title="Fechar Modal" onClick={() => onClose()}>
                    <span>
                        <img src={iconClose} alt="icon"></img>
                    </span>
                </Link>
            </div>

            <div className="dialog-content">
                <form>

                    <input
                        value={isEpi === "epi" ? objManutencao.idEpi.id : objManutencao.idPeriferico.id}
                        name={isEpi === "epi" ? 'idEpi.id' : 'idPeriferico.id'}
                        onChange={aoDigitar}
                        className="input"
                        type="text"
                        placeholder={isEpi === "epi" ? "Id EPI" : "Id Periférico"}
                        hidden
                    />

                    <input
                        value={objManutencao.id || ''}
                        name='objManutencao.id'
                        onChange={aoDigitar}
                        className="input"
                        type="text"
                        placeholder="Id Manutencao"
                        hidden
                    />

                    <label className="label"> Descrição:
                        <textarea
                            value={objManutencao.descricao}
                            name="descricao"
                            onChange={aoDigitar}
                            className="input"
                            type="text"
                            placeholder="Descrição"
                        />
                    </label>

                    <label className="label"> Valor:
                        <input
                            value={objManutencao.valor}
                            name="valor"
                            onChange={aoDigitar}
                            className="input"
                            type="text"
                            placeholder="Valor"
                        />
                    </label>

                    <label className="label"> Data Inicio:
                        <input
                            value={objManutencao.dataIniManutencao}
                            name="dataIniManutencao"
                            onChange={aoDigitar}
                            className="input"
                            type="date"
                            placeholder="Data de incio"
                        />
                    </label>

                    <label className="label"> Data Retorno:
                        <input
                            value={objManutencao.dataRetManutencao}
                            name="dataRetManutencao"
                            onChange={aoDigitar}
                            className="input"
                            type="date"
                            placeholder="Data de Retorno"
                        />
                    </label>

                    <div className="container-buttons">
                        <Link onClick={cadastrar} className="button button-cadastrar">Cadastrar</Link>
                    </div>
                </form>

                {carregando || manutencoesFiltradas.length === 0 ? (
                    <div className="modal-table">
                        <MediumLoading />
                    </div>
                ) : (
                    <div className="modal-table">
                        <TableManutencao vetor={manutencoesFiltradas} />
                        <Paginacao
                            paginaAtual={paginaAtual}
                            totalPaginas={totalPaginas}
                            totalRegistros={totalRegistros}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>

            {sucessAnimation && (
                <ModalSucess
                    id={objManutencao.id}
                    title="Manutencao Cadastrada!"
                    titleEditar="Manutencao Alterada!"
                />
            )}

        </Modal>
    )
}

export default ModalManutencao