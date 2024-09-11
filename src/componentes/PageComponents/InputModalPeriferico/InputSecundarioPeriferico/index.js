import { useState } from "react";
import InputDesvinculoPeriferico from "../inputDesvinculoPeriferico";

const InputSecundarioPeriferico = ({ aoDigitar, objPeriferico }) => {

    const [desvinculacao, setDesvinculacao] = useState(false);

    return (
        <div>
            <InputDesvinculoPeriferico
                objPeriferico={objPeriferico}
                setDesvinculacao={setDesvinculacao}
            />

            <label className="label"> Data Vinculação:
                <input
                    value={objPeriferico.dataVinculacao}
                    onChange={aoDigitar}
                    name='dataVinculacao'
                    className="input"
                    type="date"
                />
            </label>

            {
                desvinculacao && (
                    <>
                        <label className="label"> Data Desvinculação:
                            <input
                                value={objPeriferico.dataDesvinculacao}
                                onChange={aoDigitar}
                                name='dataDesvinculacao'
                                className="input"
                                type="date"
                            />
                        </label>

                        <label className="label"> Registro Desvinculação:
                            <textarea
                                value={objPeriferico.registroDesvinculacao}
                                onChange={aoDigitar}
                                name='registroDesvinculacao'
                                className="input"
                                type="text"
                                placeholder="Qual o Motivo da Desvinculação..." />
                        </label>
                    </>
                )
            }
        </div>
    )
}

export default InputSecundarioPeriferico;