import { useEffect, useState } from "react";
import { Switch } from "@mui/material";

const InputSecundarioUsuario = ({ aoDigitar, objEpiUsuario }) => {

    // Inicializa o estado do Switch baseado no valor de isVinculado (true se for 1, false se for 0)
    const [checked, setChecked] = useState(!objEpiUsuario.dataFim);
    
    // Sincroniza o valor de checked com o valor de isVinculado de objEpiPeriferico
    useEffect(() => {
        setChecked(!objEpiUsuario.dataFim);
    }, [objEpiUsuario.dataFim]);

    const handleChange = (event) => {
        const newValue = event.target.checked;
        setChecked(newValue);

        // Atualiza o campo `isVinculado` diretamente dentro de `idPeriferico`
        aoDigitar({
            target: {
                name: 'idUsuario',
                value: {
                    ...objEpiUsuario.idUsuario, // Mantém os outros campos de `idPeriferico`
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
                    value={objEpiUsuario.dataInicio}
                    onChange={aoDigitar}
                    name='dataInicio'
                    className="input"
                    type="date"
                />
            </label>

            {
                !checked && (
                    <>
                        <label className="label"> Data Desvinculação:
                            <input
                                value={objEpiUsuario.dataFim}
                                onChange={aoDigitar}
                                name='dataFim'
                                className="input"
                                type="date"
                                disabled={objEpiUsuario.dataFim}
                            />
                        </label>
                    </>
                )
            }
        </div>
    )
}

export default InputSecundarioUsuario;
