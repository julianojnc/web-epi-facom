import { useEffect, useState } from "react";
import { fetchMarca } from "../../../Pages/PageMarcas/api/apiMarca";
import SmallLoading from "../../LoadingAnimation/SmallLoading";
import { fetchEpiById } from "../../../Pages/PageEpi/api/apiEpi";
import { fetchPerifericoById } from "../../../Pages/PagePeriferico/api/apiPeriferico";

const MarcaCheckbox = ({id, obj, setObj, aoDigitar, isEpi}) => {
    const objMarcas = { id: "" };
    const [marcas, setMarcas] = useState([]);
    const [objMarca, setObjMarca] = useState(objMarcas);
    const [searchMarca, setSearchMarca] = useState('');
    const [searchMarcaOpen, setSearchMarcaOpen] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const [moreDetails, setMoreDetails] = useState(false);

    useEffect(() => {
        const MAX_ATTEMPTS = 3; // Número máximo de tentativas
        const RETRY_DELAY = 1000; // Tempo de espera entre tentativas (em milissegundos)
    
        const fetchData = async (attempt = 1) => {
            if (id) {
                try {
                    if (isEpi) { // se isEpi for verdadeiro a função para epi é acionada se nao a funcao para periferico
                        const epiData = await fetchEpiById(id);
                        if (epiData && epiData.idMarca) {
                            setSearchMarca(epiData.idMarca.nome);
                        } else {
                            throw new Error("EPI data or idMarca is undefined"); // retorno de erro no console
                        }
                    } else {
                        const perifericoData = await fetchPerifericoById(id);
                        if (perifericoData && perifericoData.idMarca) {
                            setSearchMarca(perifericoData.idMarca.nome);
                        } else {
                            throw new Error("Periférico data or idMarca is undefined"); // retorno de erro no console
                        }
                    }
                } catch (error) {
                    console.error(`Attempt ${attempt} failed:`, error); // retorno de tentativas no console
    
                    if (attempt < MAX_ATTEMPTS) { // se a tentativa for  menor que o numero de tentativas fetchData e recarregado
                        setTimeout(() => fetchData(attempt + 1), RETRY_DELAY);
                    } else {
                        console.error("All attempts failed. Unable to fetch data."); // retorno de erro no console
                    }
                }
            }
        };
    
        fetchData();
    }, [id, isEpi]); // Inclua isEpi como dependência se ela puder mudar
    

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
            setObjMarca(item); // Define o objeto de marca selecionado
            setSearchMarca(item.nome); // Preenche o campo de busca com o nome da marca selecionada
            setSearchMarcaOpen(false); // Fecha a lista de marcas
            setObj(prevState => ({
                ...prevState,
                idMarca: item // Atualiza o estado do Epi com a marca selecionada
            }));
        }
    };

    const handleMoreDetails = () => {
        setMoreDetails(true)
    }

    return(
        <>
            <div className="marca-checkbox">
                        <input
                            value={objMarca.codMarca}
                            onChange={aoDigitar}
                            name="codMarca.id"
                            className="input input-marca"
                            type="text"
                            placeholder="ID Marca"
                            hidden
                        />
                        <label className="label"> Marca:
                            <input
                                value={searchMarca} // O campo de input agora é preenchido com o valor selecionado
                                onClick={() => setSearchMarcaOpen(true)}
                                onChange={(e) => setSearchMarca(e.target.value)}
                                name="idMarca.id"
                                className="input input-marca"
                                type="text"
                                placeholder="Marca"
                            />
                            {searchMarcaOpen && (
                                carregando ? (
                                    <SmallLoading />
                                ) : (
                                    <div className="search-bar-curso">
                                        {filterData(marcas, searchMarca, ['nome'])
                                            .filter(obj => obj.nome.toLowerCase() !== searchMarca.toLowerCase()) // Filtra para não mostrar a marca selecionada
                                            .map((obj, indice) => (
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

                        <label onClick={handleMoreDetails} className="label label-details">
                            <input className="input input-details" type="checkbox" />
                            Mais Detalhes
                        </label>
                    </div>

                    {moreDetails && (
                        <>
                            <label className="label"> Service Tag:
                                <input
                                    value={obj.serviceTag}
                                    onChange={aoDigitar}
                                    name='serviceTag'
                                    className="input"
                                    type="text"
                                    placeholder="Service Tag" />
                            </label>

                            <label className="label"> Express Code:
                                <input
                                    value={obj.expressCode}
                                    onChange={aoDigitar}
                                    name='expressCode'
                                    className="input"
                                    type="text"
                                    placeholder="Express Code" />
                            </label>
                        </>
                    )}
        </>
    )
}

export default MarcaCheckbox;