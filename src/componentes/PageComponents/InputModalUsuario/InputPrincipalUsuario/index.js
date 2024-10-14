import { useState } from "react";
import useSWR from 'swr';
import ModalSucess from "../../../Modal/ModalSucess";
import { desvincularEpiUsuario, fetchUsers } from "../../../../Pages/PageUsers/api/apiUser";
import InputMask from 'react-input-mask';
import iconUser from "../../../../assets/icon-user-black.png"
import ButtonsVincular from "../../PageCadastroButtonsVincular";
import InputSearch from "../../InputSearchModal";

// SWR hook para buscar os periféricos
const fetcher = async () => {
    const response = await fetchUsers(0, 9999); // Limite de itens conforme necessário
    return response.lista;
}

const InputPrincipalUsuario = ({ aoDigitar, onClose, objUser, setObjUsuario, objEpi, objEpiUsuarios, vincular, cadastrar, loadingButton }) => {
    const [pesquisa, setPesquisa] = useState(""); // Estado para a pesquisa
    const [pagina, setPagina] = useState(0); // Controle de página para paginação
    const itensPorPagina = 10;
    const [sucessAnimation, setSucessAnimation] = useState(false); // Modal Cadastrado com Sucesso
    const [loadingButtons, setLoadingButtons] = useState(false);

    // Usando o SWR para buscar periféricos, com fetchUsers como fetcher
    const { data: usuarios, error } = useSWR('fetchUsers', fetcher);

    const listaFiltrada = (usuarios || []).filter((usuario) => {
        const nomeFiltrado = (usuario.nome ?? '').toLowerCase().includes(pesquisa.toLowerCase());
        const emailFiltrado = (usuario.patrimonio ?? '').toLowerCase().includes(pesquisa.toLowerCase());
        const telContatoFiltrada = (usuario.serviceTag ?? '').toLowerCase().includes(pesquisa.toLowerCase());

        return nomeFiltrado || emailFiltrado || telContatoFiltrada;
    });

    const inicio = pagina * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const filtroUsuarios = listaFiltrada.slice(inicio, fim);

    const handlePesquisa = (e) => {
        setPesquisa(e.target.value); // Atualiza o estado de pesquisa
        setPagina(0); // Reseta para a primeira página ao pesquisar
    };

    const desvincular = async () => {
        setLoadingButtons(true);
        try {
            const response = await desvincularEpiUsuario(objEpiUsuarios.id, objEpiUsuarios);
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
            console.error('Erro ao desvincular Usuario:', error);
            alert('Ocorreu um erro ao tentar desvincular Usuario.');
        } finally {
            setLoadingButtons(false);
        }
    };

    if (error) return alert("Erro ao carregar os usuários no campo de Pesquisa!");

    return (
        <div>
            <InputSearch
                obj={objUser.id}
                objVinculado={objEpiUsuarios.idUsuario.id}
                pesquisa={pesquisa}
                placeholder={"Pesquisar Usuários Existentes..."}
                filtroItem={filtroUsuarios}
                icon={iconUser}
                setObj={setObjUsuario}
                functionPesquisa={handlePesquisa}
            />

            <input
                value={objEpi.id || objEpiUsuarios.id}
                onChange={aoDigitar}
                name='objEpi.id'
                className="input"
                type="text"
                placeholder="Id Epi"
                hidden
            />

            <input
                value={objUser.id || objEpiUsuarios.idUsuario.id}
                onChange={aoDigitar}
                name='objUser.id'
                className="input"
                type="text"
                placeholder="Id Usuario"
                hidden
            />

            <label className="label"> Nome:
                <input
                    value={objUser.nome || objEpiUsuarios.idUsuario.nome}
                    onChange={aoDigitar}
                    name='nome'
                    className="input"
                    type="text"
                    placeholder="Nome"
                />
            </label>

            <label className="label"> Contato:
                <InputMask
                    value={objUser.telContato || objEpiUsuarios.idUsuario.telContato}
                    onChange={aoDigitar}
                    name='telContato'
                    className="input"
                    type="text"
                    placeholder="Contato"
                    mask="(99)99999-9999"
                />
            </label>

            <label className="label"> Email:
                <input
                    value={objUser.email || objEpiUsuarios.idUsuario.email}
                    onChange={aoDigitar}
                    name='email'
                    className="input"
                    type="text"
                    placeholder="Email"
                />
            </label>

            <ButtonsVincular
                cadastrar={cadastrar}
                vincular={vincular}
                desvincular={desvincular}
                loadingButtonProp={loadingButton}
                loadingButton={loadingButtons}
                obj={objUser}
                objVinculado={objEpiUsuarios}
                idItem={objEpiUsuarios.idUsuario.id}
            />

            {sucessAnimation && (
                <ModalSucess
                    id={objEpiUsuarios.id}
                    title=""
                    titleEditar="Usuario Desvinculado!"
                />
            )}
        </div>
    )
}

export default InputPrincipalUsuario;