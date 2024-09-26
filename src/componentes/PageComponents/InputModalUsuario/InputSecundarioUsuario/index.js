import { useEffect, useState } from "react";
import { Switch } from "@mui/material";

const InputSecundarioUsuario = ({ aoDigitar, objEpiUsuario }) => {

    // Inicializa o estado do Switch baseado no valor de isVinculado (true se for 1, false se for 0)
    const [checked, setChecked] = useState(objEpiUsuario.idUsuario.isVinculado === 1);

    // Sincroniza o valor de checked com o valor de isVinculado de objEpiPeriferico
    useEffect(() => {
        setChecked(objEpiUsuario.idUsuario.isVinculado === 1);
    }, [objEpiUsuario.idUsuario.isVinculado]);

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

    console.log(objEpiUsuario)
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
        </div>
    )
}

export default InputSecundarioUsuario;
