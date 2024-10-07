import { Link } from "react-router-dom";
import useSWR from 'swr';
import MarcaCheckbox from "../../InputMarcaCheckbox";
import { alterarEpiPeriferico, fetchPerifericos } from "../../../../Pages/PagePeriferico/api/apiPeriferico";
import { useState } from "react";
import ModalSucess from "../../../Modal/ModalSucess";
import iconPeriferico from "../../../../assets/icon-periferico-black.png"

// SWR hook para buscar os periféricos
const fetcher = async () => {
    const response = await fetchPerifericos(0, 9999); // Limite de itens conforme necessário
    return response.lista;
}

const InputPrincipalPeriferico = ({ aoDigitar, objEpi, objPeriferico, setObjPeriferico, objEpiPeriferico, cadastrar, vincular, loadingButton, onClose }) => {

    const [sucessAnimation, setSucessAnimation] = useState(false); // Modal Cadastrado com Sucesso
    const [loadingButtons, setLoadingButtons] = useState(false);
    const [pesquisa, setPesquisa] = useState(""); // Estado para a pesquisa
    const [pagina, setPagina] = useState(0); // Controle de página para paginação
    const [showDropdown, setShowDropdown] = useState(false); // DropDown pesquisa
    const itensPorPagina = 10;

     // Usando o SWR para buscar periféricos, com fetchPerifericos como fetcher
     const { data: perifericos, error } = useSWR('fetchPerifericos', fetcher);

     const listaFiltrada = (perifericos || []).filter((periferico) => {
         const nomeFiltrado = (periferico.nome ?? '').toLowerCase().includes(pesquisa.toLowerCase());
         const patrimonioFiltrado = (periferico.patrimonio ?? '').toLowerCase().includes(pesquisa.toLowerCase());
         const serviceTagFiltrada = (periferico.serviceTag ?? '').toLowerCase().includes(pesquisa.toLowerCase());
         const expressCodeFiltrada = (periferico.expressCode ?? '').toLowerCase().includes(pesquisa.toLowerCase());
 
         return nomeFiltrado || patrimonioFiltrado || serviceTagFiltrada || expressCodeFiltrada;
     });
 
     const inicio = pagina * itensPorPagina;
     const fim = inicio + itensPorPagina;
     const filtroPerifericos = listaFiltrada.slice(inicio, fim);

    const handlePesquisa = (e) => {
        setPesquisa(e.target.value); // Atualiza o estado de pesquisa
        setPagina(0); // Reseta para a primeira página ao pesquisar
    };

    const alterar = async () => {
        if (!objEpiPeriferico.registroDesvinculacao) {
            alert('Por favor, preencha todos os campos obrigatórios: Registro de Desvinculação!');
            return;
        }
        setLoadingButtons(true);

        try {
            const response = await alterarEpiPeriferico(objEpiPeriferico.id, objEpiPeriferico);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setSucessAnimation(true); // Exibe animação de sucesso
                setTimeout(() => {
                    setSucessAnimation(false);
                    onClose(); // Fecha modal após sucesso
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao cadastrar/alterar Periferico:', error);
            alert('Ocorreu um erro ao tentar cadastrar/alterar Periferico.');
        } finally {
            setLoadingButtons(false);
        }
    };

    if (error) return alert("Erro ao carregar os periféricos no campo de Pesquisa!");
    console.log(error);

    return (
        <div>
            {objPeriferico.id || objEpiPeriferico.idPeriferico.id > 0 ? (
                <></>
            ) : (
                <label className="label"> Pesquisar Periféricos:
                    <input
                        className="input"
                        type="text"
                        placeholder="Pesquisar Periféricos Existentes..."
                        value={pesquisa}
                        onChange={handlePesquisa}
                        onFocus={() => setShowDropdown(true)}
                    />
                </label>
            )}

            {showDropdown && (
                <ul className="dropdown">
                    {filtroPerifericos.map((periferico) => (
                        <li key={periferico.id} onClick={() => {
                            setObjPeriferico(periferico);
                            setShowDropdown(false); // Fechar o dropdown ao selecionar um periférico
                        }}>
                            <span>
                                <img src={iconPeriferico} alt="icon"></img>
                            </span>
                            {periferico.nome}
                        </li>
                    ))}
                </ul>
            )
            }

            <input
                value={objEpi.id || objEpiPeriferico.idEpi.id}
                onChange={aoDigitar}
                name='objEpi.id'
                className="input"
                type="text"
                placeholder="Id Epi"
                hidden
            />

            <input
                value={objPeriferico.id || objEpiPeriferico.idPeriferico.id}
                onChange={aoDigitar}
                name='id'
                className="input"
                type="text"
                placeholder="Id Periferico"
                hidden
            />

            <label className="label"> Nome:
                <input
                    value={objPeriferico.nome || objEpiPeriferico.idPeriferico.nome}
                    onChange={aoDigitar}
                    name='nome'
                    className="input"
                    type="text"
                    placeholder="Nome" />
            </label>

            <label className="label"> Patrimonio:
                <input
                    value={objPeriferico.patrimonio || objEpiPeriferico.idPeriferico.patrimonio}
                    onChange={aoDigitar}
                    name='patrimonio'
                    className="input"
                    type="text"
                    placeholder="Patrimonio" />
            </label>

            <MarcaCheckbox
                id={objEpiPeriferico.idPeriferico.id}
                obj={objEpiPeriferico}
                setObj={setObjPeriferico}
                aoDigitar={aoDigitar}
                objEpiPeriferico={objEpiPeriferico}
            />

            <label className="label"> Data Compra:
                <input
                    value={objPeriferico.dataCompra || objEpiPeriferico.idPeriferico.dataCompra}
                    onChange={aoDigitar}
                    name='dataCompra'
                    className="input"
                    type="date"
                    placeholder="Data de incio" />
            </label>

            <label className="label"> Data Garantia:
                <input
                    value={objPeriferico.dataGarantia || objEpiPeriferico.idPeriferico.dataGarantia}
                    onChange={aoDigitar}
                    name='dataGarantia'
                    className="input"
                    type="date"
                    placeholder="Data de Retorno" />
            </label>

            <div className="container-buttons">
                <div className="container-buttons">
                    {objEpiPeriferico.id > 0 ? (
                        (objPeriferico.id || objEpiPeriferico.idPeriferico.id > 0) ? (
                            <Link onClick={loadingButtons ? "" : alterar} className={loadingButtons ? "button button-cadastrar disable" : "button button-cadastrar"}>
                                {loadingButtons ? "Desvinculando..." : "Desvincular"}
                            </Link>
                        ) : null
                    ) : (
                        (objPeriferico.id || objEpiPeriferico.idPeriferico.id > 0) ? (
                            <Link onClick={loadingButton ? "" : vincular} className={loadingButton ? "button button-cadastrar disable" : "button button-cadastrar"}>
                                {loadingButton ? "Vinculando..." : "Vincular"}
                            </Link>
                        ) : (
                            <Link onClick={loadingButton ? "" : cadastrar} className={loadingButton ? "button button-cadastrar disable" : "button button-cadastrar"}>
                                {loadingButton ? "Cadastrando..." : "Cadastrar Novo"}
                            </Link>
                        )
                    )}
                </div>
            </div>

            {
                sucessAnimation && (
                    <ModalSucess
                        id={objEpiPeriferico.id}
                        title=""
                        titleEditar="Periférico Desvinculado!"
                    />
                )
            }
        </div>
    )
}

export default InputPrincipalPeriferico;