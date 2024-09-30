import { Link } from "react-router-dom";
import MarcaCheckbox from "../../InputMarcaCheckbox";
import { alterarEpiPeriferico, fetchPerifericos } from "../../../../Pages/PagePeriferico/api/apiPeriferico";
import { useEffect, useState } from "react";
import ModalSucess from "../../../Modal/ModalSucess";
import iconPeriferico from "../../../../assets/icon-periferico-black.png"

const InputPrincipalPeriferico = ({ aoDigitar, objEpi, objPeriferico, setObjPeriferico, objEpiPeriferico, cadastrar, vincular, onClose }) => {

    const [sucessAnimation, setSucessAnimation] = useState(false); // Modal Cadastrado com Sucesso
    const [loadingButton, setLoadingButton] = useState(false);
    const [perifericos, setPerifericos] = useState([]); // Todos os periféricos
    const [filtroPerifericos, setFiltroPerifericos] = useState([]); // Lista filtrada de periféricos
    const [pesquisa, setPesquisa] = useState(""); // Estado para a pesquisa
    const [pagina, setPagina] = useState(0); // Controle de página para paginação
    const [showDropdown, setShowDropdown] = useState(false); // DropDown pesquisa
    const itensPorPagina = 10;

    useEffect(() => {
        // Função para buscar todos os periféricos ao montar o componente
        const buscarPerifericos = async () => {
            try {
                const data = await fetchPerifericos(0, 9999); // Buscando até 1000 periféricos, ajuste conforme necessário
                setPerifericos(data.lista); // Armazenando a lista completa de periféricos
                setFiltroPerifericos(data.lista.slice(0, itensPorPagina)); // Exibindo apenas os 10 primeiros inicialmente
            } catch (error) {
                console.error("Erro ao buscar periféricos:", error);
            }
        };

        buscarPerifericos();
    }, []);

    useEffect(() => {
        // Atualiza a lista filtrada quando a pesquisa mudar
        const listaFiltrada = perifericos.filter((periferico) => {
            const nomeFiltrado = (periferico.nome ?? '').toLowerCase().includes(pesquisa.toLowerCase());
            const patrimonioFiltrado = (periferico.patrimonio ?? '').toLowerCase().includes(pesquisa.toLowerCase());
            const serviceTagFiltrada = (periferico.serviceTag ?? '').toLowerCase().includes(pesquisa.toLowerCase());
            const expressCodeFiltrada = (periferico.expressCode ?? '').toLowerCase().includes(pesquisa.toLowerCase());

            // Retorna verdadeiro se algum dos campos corresponder ao termo de pesquisa
            return nomeFiltrado || patrimonioFiltrado || serviceTagFiltrada || expressCodeFiltrada;
        });

        // Paginação simples
        const inicio = pagina * itensPorPagina;
        const fim = inicio + itensPorPagina;

        // Atualiza a lista com os itens paginados
        setFiltroPerifericos(listaFiltrada.slice(inicio, fim));
    }, [pesquisa, pagina, perifericos, itensPorPagina]);


    const handlePesquisa = (e) => {
        setPesquisa(e.target.value); // Atualiza o estado de pesquisa
        setPagina(0); // Reseta para a primeira página ao pesquisar
    };

    const alterar = async () => {
        if (!objEpiPeriferico.registroDesvinculacao) {
            alert('Por favor, preencha todos os campos obrigatórios: Registro de Desvinculação!');
            return;
        }
        setLoadingButton(true);

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
            setLoadingButton(false);
        }
    };

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
                            <Link onClick={alterar} className="button button-cadastrar" disabled={loadingButton}>
                                {loadingButton ? "Desvinculando..." : "Desvincular"}
                            </Link>
                        ) : null
                    ) : (
                        (objPeriferico.id || objEpiPeriferico.idPeriferico.id > 0) ? (
                            <Link onClick={vincular} className="button button-cadastrar" disabled={loadingButton}>
                                {loadingButton ? "Vinculando..." : "Vincular"}
                            </Link>
                        ) : (
                            <Link onClick={cadastrar} className="button button-cadastrar">Cadastrar Novo</Link>
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
        </div >
    )
}

export default InputPrincipalPeriferico;