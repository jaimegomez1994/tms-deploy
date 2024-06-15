import { formatDate } from '../../utils/Format';
import Table from '../shared/Table';

export default function ContractTable(props) {
    const {
        loading,
        contracts,
        handleDelete,
        setItem,
        handleEdit,
        hideEdit = false
    } = props;

    const cells = [
        'nombre',
        'numeroContrato',
        'montoContrato',
        'toneladasContrato',
        'estadoContrato',
        'tipoContrato',
        'fechaInicio',
        'fechaFinal',
        'observaciones'
    ];

    const headers = [
        'Nombre',
        'Numero de Contrato',
        'Monto de Contrato',
        'Toneladas Contrato',
        'Estado Contrato',
        'Tipo Contrato',
        'Fecha Inicio',
        'Fecha Final',
        'Observaciones'
    ];

    function formattedRows(contracts) {
        return contracts.map((contract) => {
            return {
                ...contract,
                fechaInicio: formatDate(contract.fechaInicio),
                fechaFinal: formatDate(contract.fechaFinal)
            };
        });
    }

    return (
        <Table
            headers={headers}
            loading={loading}
            cells={cells}
            rows={formattedRows(contracts)}
            handleDelete={handleDelete}
            setItem={setItem}
            handleEdit={handleEdit}
            size="xs"
            hideEdit={hideEdit}
        />
    );
}
