import useSWR from 'swr';
import MarcaCheckbox from "../../InputMarcaCheckbox";
import { desvincularEpiPeriferico, fetchPerifericos } from "../../../../Pages/PagePeriferico/api/apiPeriferico";
import { useState } from "react";
import ModalSucess from "../../../Modal/ModalSucess";
import iconPeriferico from "../../../../assets/icon-periferico-black.png"
import ButtonsVincular from "../../PageCadastroButtonsVincular";
import InputSearch from '../../InputSearchModal';

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

    const desvincular = async () => {
        if (!objEpiPeriferico.registro) {
            alert('Por favor, preencha todos os campos obrigatórios: Registro de Desvinculação!');
            return;
        }
        setLoadingButtons(true);

        try {
            const response = await desvincularEpiPeriferico(objEpiPeriferico.id, objEpiPeriferico);
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
            console.error('Erro ao desvincular Periferico:', error);
            alert('Ocorreu um erro ao tentar desvincular Periferico.');
        } finally {
            setLoadingButtons(false);
        }
    };

    if (error) return alert("Erro ao carregar os periféricos no campo de Pesquisa!");

    return (
        <div>
            <InputSearch
                obj={objPeriferico.id}
                objVinculado={objEpiPeriferico.idPeriferico.id}
                pesquisa={pesquisa}
                placeholder={"Pesquisar Periféricos Existentes..."}
                filtroItem={filtroPerifericos}
                icon={iconPeriferico}
                setObj={setObjPeriferico}
                functionPesquisa={handlePesquisa}
            />

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

            <ButtonsVincular
                cadastrar={cadastrar}
                vincular={vincular}
                desvincular={desvincular}
                loadingButtonProp={loadingButtons}
                loadingButton={loadingButton}
                obj={objPeriferico}
                objVinculado={objEpiPeriferico}
                idItem={objEpiPeriferico.idPeriferico.id}
            />

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