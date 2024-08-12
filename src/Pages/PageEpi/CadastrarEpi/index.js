import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuBar from "../../../componentes/MenuBar";
import ModalManutencaoEpi from "./ModalManutencaoEpi";
import ModalVincularPeriferico from "./ModalVincularPeriferico";
import { cadastrarEpi, fetchEpiById } from "../api/apiEpi";
import ModalSucess from "../../../componentes/Modal/ModalSucess";
import ModalVincularUsuario from "./ModalVincularUsuario";
import CadastroHeader from "../../../componentes/PageComponents/PageCadastroHeader";
import MarcaCheckbox from "../../../componentes/PageComponents/InputMarcaCheckbox";
import Buttons from "../../../componentes/PageComponents/PageCadastroButtons";

const CadastrarEpi = () => {
    const { id } = useParams(); // Obtenha o ID da URL
    const [manutencaoOpen, setManutencaoOpen] = useState(false);
    const [perifericoOpen, setPerifericoOpen] = useState(false);
    const [usuarioOpen, setUsuarioOpen] = useState(false);
    const [sucessAnimation, setSucessAnimation] = useState(false);

    const epi = {
        nome: '',
        patrimonio: '',
        serviceTag: '',
        expressCode: '',
        local: '',
        setor: '',
        dataCompra: '',
        dataGarantia: '',
        idMarca: {
            id: '',
        }
    };

    const [epis, setEpis] = useState([]);
    const [objEpi, setObjEpi] = useState(epi);

    useEffect(() => {
        if (id) {
            const fetchEpi = async () => {
                const epiData = await fetchEpiById(id); // Fetch Epi data by ID
                setObjEpi(epiData);
            };
            fetchEpi();
        }
    }, [id]);

    const cadastrar = async () => {
        console.log('Objeto a ser enviado:', objEpi);
        try {
            const response = await cadastrarEpi(objEpi);
            console.log('Resposta da API:', response);
            if (response.mensagem) {
                alert(response.mensagem);
            } else {
                setEpis([...epis, response]);
                setSucessAnimation(true);
                setTimeout(() => {
                    setSucessAnimation(false)
                    setUsuarioOpen(true)
                }, 2000);
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
        setUsuarioOpen(false);
    };

    return (
        <section>
            <MenuBar />
            <div className="content-page">
                <CadastroHeader
                    id={id}
                    title="Cadastro de Equipamento"
                    titleEditar="Editar Equipamento"
                    hiddenPeriferico={false}
                    hiddenManutencao={false}
                    setPerifericoOpen={setPerifericoOpen}
                    setManutencaoOpen={setManutencaoOpen}
                />
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

                    <MarcaCheckbox
                        id={id}
                        obj={objEpi}
                        setObj={setObjEpi}
                        aoDigitar={aoDigitar}
                    />

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

                    {/* <label className="label"> Usuario
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
                    </label> */}

                    <Buttons
                        id={id}
                        cadastrar={cadastrar}
                    />

                </form>
            </div>

            {manutencaoOpen && (
                <ModalManutencaoEpi onClose={closeModal} />
            )}
            {perifericoOpen && (
                <ModalVincularPeriferico onClose={closeModal} />
            )}
            {usuarioOpen && (
                <ModalVincularUsuario onClose={closeModal} objEpi={objEpi} />
            )}
            {sucessAnimation && (
                <ModalSucess title="Equipamento Cadastrado!" />
            )}
        </section>
    );
};

export default CadastrarEpi;
