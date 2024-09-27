import { useEffect, useState } from "react";
import { fetchMarca } from "../../../Pages/PageMarcas/api/apiMarca";
import SmallLoading from "../../LoadingAnimation/SmallLoading";
import { fetchEpiById } from "../../../Pages/PageEpi/api/apiEpi";
import { fetchPerifericoById } from "../../../Pages/PagePeriferico/api/apiPeriferico";
import { Switch } from "@mui/material";

const MarcaCheckbox = ({ id, obj, setObj, objEpiPeriferico, aoDigitar, isEpi }) => {
    const objMarcas = { id: "" };
    const [marcas, setMarcas] = useState([]);
    const [objMarca, setObjMarca] = useState(objMarcas);
    const [searchMarca, setSearchMarca] = useState('');
    const [searchMarcaOpen, setSearchMarcaOpen] = useState(false);
    const [carregando, setCarregando] = useState(true);
    const [checked, setChecked] = useState(false);

    // Fetch data for EPI or Periferico based on the ID and isEpi
    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    if (isEpi) {
                        const epiData = await fetchEpiById(id);
                        if (epiData && epiData.idMarca) {
                            setSearchMarca(epiData.idMarca.nome);
                        } else {
                            console.error("EPI data or idMarca is undefined");
                        }
                    } else {
                        const perifericoData = await fetchPerifericoById(id);
                        if (perifericoData && perifericoData.idMarca) {
                            setSearchMarca(perifericoData.idMarca.nome);
                        } else {
                            console.error("Periférico data or idMarca is undefined");
                        }
                    }
                } catch (error) {
                    console.error("Failed to fetch data:", error);
                }
            }
        };

        fetchData();
    }, [id, isEpi]); // Inclua isEpi como dependência se ela puder mudar

    // Fetch all available marcas
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
        setChecked(true)
    }

    return (
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

                <Switch
                    checked={checked}
                    onClick={handleMoreDetails}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>

            {checked && (
                <>
                    <label className="label"> Service Tag:
                        <input
                            value={obj.serviceTag || objEpiPeriferico?.idPeriferico?.serviceTag}
                            onChange={aoDigitar}
                            name='serviceTag'
                            className="input"
                            type="text"
                            placeholder="Service Tag" />
                    </label>

                    <label className="label"> Express Code:
                        <input
                            value={obj.expressCode || objEpiPeriferico?.idPeriferico?.expressCode}
                            onChange={aoDigitar}
                            name='expressCode'
                            className="input"
                            type="text"
                            placeholder="Express Code" />
                    </label>
                </>
            )}
        </>
    );
};

export default MarcaCheckbox;
