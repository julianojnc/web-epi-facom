import Switch from '@mui/material/Switch';
import { useState, useEffect } from 'react';

const InputDesvinculoPeriferico = ({ objPeriferico, setDesvinculacao }) => {
    // Inicializa o estado do Switch baseado no valor de isVinculado (true se for 1, false se for 0)
    const [checked, setChecked] = useState(objPeriferico.isVinculado === 1);

    // Atualiza o valor de checked se objPeriferico mudar (para garantir que sempre esteja sincronizado)
    useEffect(() => {
        setChecked(objPeriferico.isVinculado === 1);
    }, [objPeriferico]);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        setDesvinculacao(event.target.checked ? false : true);
    };

    return (
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
    );
}

export default InputDesvinculoPeriferico;
