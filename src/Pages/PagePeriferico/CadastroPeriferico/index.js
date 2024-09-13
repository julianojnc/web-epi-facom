import { useEffect, useState } from "react";
import MenuBar from "../../../componentes/MenuBar";
import { useNavigate, useParams } from "react-router-dom";
import ModalSucess from "../../../componentes/Modal/ModalSucess";
import ModalManutencao from "../../../componentes/Modal/ModalManutencao";
import CadastroHeader from "../../../componentes/PageComponents/PageCadastroHeader";
import MarcaCheckbox from "../../../componentes/PageComponents/InputMarcaCheckbox";
import Buttons from "../../../componentes/PageComponents/PageCadastroButtons";
import { alterarPeriferico, cadastrarPerifericos, excluirPeriferico, fetchPerifericoById } from "../api/apiPeriferico";

const CadastrarPeriferico = () => {
    const { id } = useParams(); // Obtenha o ID da URL
    const navigate = useNavigate();
    const [sucessAnimation, setSucessAnimation] = useState(false);
    const [manutencaoOpen, setManutencaoOpen] = useState(false);

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

    const [objPeriferico, setObjPeriferico] = useState(periferico);// Funcao para o cadastro de Periferico

    const cadastrarOuAlterar = async () => {
        if (!objPeriferico.nome || !objPeriferico.idMarca.id) {
            alert('Por favor, preencha todos os campos obrigatórios: Nome e Marca!');
            return;
        }

        try {
            const response = id ? await alterarPeriferico(id, objPeriferico) : await cadastrarPerifericos(objPeriferico);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setSucessAnimation(true);
                setTimeout(() => {
                    setSucessAnimation(false);
                    if (!id) navigate(`/cadastro-perifericos/${response.id}`); // Redireciona para edição se for novo cadastro
                }, 2000);
            }
        } catch (error) {
            console.error('Erro ao cadastrar/alterar Periferico:', error);
            alert('Ocorreu um erro ao tentar cadastrar/alterar Periferico.');
        }
    };

    const excluir = async () => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir este Periferico?');
        if (confirmDelete) {
            try {
                await excluirPeriferico(id);
                alert('Periferico excluído com sucesso!');
                navigate('/perifericos'); // Redireciona para a lista de Perifericos
            } catch (error) {
                console.error('Erro ao excluir Periferico:', error);
                alert('Ocorreu um erro ao tentar excluir o Periferico.');
            }
        }
    };

    const aoDigitar = (e) => {
        setObjPeriferico({ ...objPeriferico, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (id) {
            const fetchPeriferico = async () => {
                const perifericoData = await fetchPerifericoById(id); // Fetch Epi data by ID
                setObjPeriferico(perifericoData);
            };
            fetchPeriferico();
        }
    }, [id]);

    const closeModal = () => {
        setManutencaoOpen(false);
    };

    return (
        <section>
            <MenuBar />
            <div className="content-page">
                <CadastroHeader
                    id={id}
                    title="Cadastro de Periférico"
                    titleEditar="Editar Periférico"
                    hiddenUsuario={true}
                    hiddenPeriferico={true}
                    hiddenManutencao={false}
                    setManutencaoOpen={setManutencaoOpen}
                />

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

                    <MarcaCheckbox
                        id={id}
                        obj={objPeriferico}
                        setObj={setObjPeriferico}
                        aoDigitar={aoDigitar}
                    />

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

                    <Buttons
                        id={id}
                        cadastrarOuAlterar={cadastrarOuAlterar}
                        excluir={excluir}
                    />
                </form>
            </div>

            {manutencaoOpen && (
                <ModalManutencao
                    objEpiPeriferico={objPeriferico}
                    onClose={closeModal}
                    isEpi="periferico"
                />
            )}
            {sucessAnimation && (
                <ModalSucess
                    id={id}
                    title="Periférico Cadastrado!"
                    titleEditar="Periférico Editado!"
                />
            )}

        </section>
    )
}

export default CadastrarPeriferico;
