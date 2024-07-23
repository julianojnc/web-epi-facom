import './TableEpi.css'

const TableEpi = () => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>PATRIMONIO</th>
                    <th>LOCAL</th>
                    <th>SETOR</th>
                    <th>USUARIO</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>Computador</td>
                    <td>002026</td>
                    <td>sede</td>
                    <td>cpd</td>
                    <td>fulano</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TableEpi;
