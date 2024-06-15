import { formatDate } from '../../../utils/Format';
import Table from '../Table';

export default function DocumentUnitTable(props) {
    const { loading, documentUnits, handleDelete, setItem, handleEdit } = props;

    const cells = [
        'nombre',
        'folioDocumento',
        'tipoDocumentoUnidad',
        'fechaExpedicion',
        'fechaVencimiento'
    ];

    const headers = [
        'nombre',
        'folio documento',
        'tipo documento unidad',
        'fecha expedicion',
        'fecha vencimiento'
    ];

    function formattedRows(documentUnits) {
        return documentUnits.map((document) => {
            return {
                ...document,
                fechaExpedicion: formatDate(document.fechaExpedicion),
                fechaVencimiento: formatDate(document.fechaExpedicion)
            };
        });
    }

    return (
        <Table
            headers={headers}
            loading={loading}
            cells={cells}
            rows={formattedRows(documentUnits)}
            handleDelete={handleDelete}
            setItem={setItem}
            handleEdit={handleEdit}
            size="xs"
            hideEdit={true}
        />
    );
}
