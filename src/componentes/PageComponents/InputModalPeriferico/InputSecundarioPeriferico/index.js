import { useEffect, useState } from "react";
import { Switch } from "@mui/material";

const InputSecundarioPeriferico = ({ aoDigitar, objEpiPeriferico }) => {

    // Inicializa o estado do Switch baseado no valor de isVinculado (true se for 1, false se for 0)
    const [checked, setChecked] = useState(!objEpiPeriferico.dataDesvinculacao);
    
    // Sincroniza o valor de checked com o valor de isVinculado de objEpiPeriferico
    useEffect(() => {
        setChecked(!objEpiPeriferico.dataDesvinculacao);
    }, [objEpiPeriferico.dataDesvinculacao]);

    const handleChange = (event) => {
        const newValue = event.target.checked;
        setChecked(newValue);

        // Atualiza o campo `isVinculado` diretamente dentro de `idPeriferico`
        aoDigitar({
            target: {
                name: 'idPeriferico',
                value: {
                    ...objEpiPeriferico.idPeriferico, // Mantém os outros campos de `idPeriferico`
                    isVinculado: newValue ? 1 : 0 // Atualiza apenas `isVinculado` corretamente
                }
            }
        });
    };

    return (
        <div>
            <div className="marca-checkbox">
                <label className="label"> Vinculado:
                    <input
                        value={checked ? 'SIM' : 'NÃO'}
                        name='isVinculado'
                        className="input input-marca"
                        type="text"
                        placeholder="Vinculado"
                        disabled
                    />
                </label>

                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>

            <label className="label"> Data Vinculação:
                <input
                    value={objEpiPeriferico.dataVinculacao}
                    onChange={aoDigitar}
                    name='dataVinculacao'
                    className="input"
                    type="date"
                />
            </label>

            {
                !checked && (
                    <>
                        <label className="label"> Data Desvinculação:
                            <input
                                value={objEpiPeriferico.data || objEpiPeriferico.dataDesvinculacao}
                                onChange={aoDigitar}
                                name='data'
                                className="input"
                                type="date"
                                disabled={objEpiPeriferico.dataDesvinculacao}
                            />
                        </label>

                        <label className="label"> Registro Desvinculação:
                            <textarea
                                value={objEpiPeriferico.registro || objEpiPeriferico.registroDesvinculacao}
                                onChange={aoDigitar}
                                name='registro'
                                className="input"
                                rows='4'
                                placeholder="Qual o Motivo da Desvinculação..." />
                        </label>
                    </>
                )
            }
        </div>
    )
}

export default InputSecundarioPeriferico;
