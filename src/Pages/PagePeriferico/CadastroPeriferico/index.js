import { useEffect, useState } from "react";
import { cadastrarPerifericos, fetchPerifericoById } from "../api";
import MenuBar from "../../../componentes/MenuBar";
import { useParams } from "react-router-dom";
import ModalSucess from "../../../componentes/Modal/ModalSucess";
import ModalManutencaoPeriferico from "./ModalManutencaoPeriferico";
import CadastroHeader from "../../../componentes/PageComponents/PageCadastroHeader";
import MarcaCheckbox from "../../../componentes/PageComponents/InputMarcaCheckbox";
import Buttons from "../../../componentes/PageComponents/PageCadastroButtons";

const CadastrarPeriferico = () => {
    const { id } = useParams(); // Obtenha o ID da URL
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

    const [perifericos, setPerifericos] = useState([]);
    const [objPeriferico, setObjPeriferico] = useState(periferico);// Funcao para o cadastro de Periferico

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
                        cadastrar={cadastrar}
                    />
                </form>
            </div>

            {manutencaoOpen && (
                <ModalManutencaoPeriferico onClose={closeModal} />
            )}
            {sucessAnimation && (
                <ModalSucess title="Periférico Cadastrado!" />
            )}

        </section>
    )
}

export default CadastrarPeriferico;
