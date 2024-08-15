const TableVincularPeriferico = () => {
    return (
        <table className="table-manutencao">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>PATRIMONIO</th>
                    <th>DATA VINCULACAO</th>
                    <th>TEMPO VINCULADO</th>
                    <th>VINCULADO</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>1</td>
                    <td>MOUSE</td>
                    <td>002022</td>
                    <td>20/08/2020</td>
                    <td>21/08/2024</td>
                    <td>SIM</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TableVincularPeriferico;
