import { Link } from "react-router-dom";
import MarcaCheckbox from "../../InputMarcaCheckbox";

const InputPrincipalPeriferico = ({ aoDigitar, objEpi, objPeriferico, setObjPeriferico, id, cadastrar, vincular }) => {
    return (
        <div>
            {objPeriferico.id > 0 ? (
                <></>
            ) : (
                <label className="label"> Pesquisar Periféricos:
                    <input className="input" type="text" placeholder="Pesquisar Periféricos Existentes..." />
                </label>
            )}

            <input
                value={objEpi.id}
                onChange={aoDigitar}
                name='objEpi.id'
                className="input"
                type="text"
                placeholder="Id Epi"
                hidden
            />

            <input
                value={objPeriferico.id}
                onChange={aoDigitar}
                name='id'
                className="input"
                type="text"
                placeholder="Id Periferico"
                hidden
            />

            <label className="label"> Nome:
                <input
                    value={objPeriferico.nome}
                    onChange={aoDigitar}
                    name='nome'
                    className="input"
                    type="text"
                    placeholder="Nome" />
            </label>

            <label className="label"> Patrimonio:
                <input
                    value={objPeriferico.patrimonio}
                    onChange={aoDigitar}
                    name='patrimonio'
                    className="input"
                    type="text"
                    placeholder="Patrimonio" />
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
                    placeholder="Data de incio" />
            </label>

            <label className="label"> Data Garantia:
                <input
                    value={objPeriferico.dataGarantia}
                    onChange={aoDigitar}
                    name='dataGarantia'
                    className="input"
                    type="date"
                    placeholder="Data de Retorno" />
            </label>

            <div className="container-buttons">
                {objPeriferico.id > 0 ?
                    <Link onClick={vincular} className="button button-cadastrar">Vincular</Link> :
                    <Link onClick={cadastrar} className="button button-cadastrar">Cadastrar Novo</Link>
                }
            </div>
        </div>
    )
}

export default InputPrincipalPeriferico;