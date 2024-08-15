const TableVincularUsuario = () => {
    return (
        <table className="table-manutencao">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>CONTATO</th>
                    <th>EMAIL</th>
                    <th>VINCULADO</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>FULANO</td>
                    <td>27999898280</td>
                    <td>fulano@facom.com.br</td>
                    <td>SIM</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TableVincularUsuario;
