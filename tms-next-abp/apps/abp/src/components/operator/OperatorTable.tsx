import { formatDate } from '../../utils/Format';
import Table from '../shared/Table';

export default function OperatorTable(props) {
    const { loading, operators, handleDelete, setItem, handleEdit } = props;

    const cells = [
        'numeroEmpleado',
        'numeroLicencia',
        'licenciaCategoria',
        'licenciaClasificacion',
        'vigenciaInicio',
        'vigenciaFinal',
        'fechaAntiguedad',
        'nombre',
        'email',
        'telefono',
        'telefonoMovil',
        'foto',
        'rfc',
        'curp'
    ];

    const headers = [
        'Numero Empleado',
        'Numero Licencia',
        'Licencia Categoria',
        'Licencia Clasificacion',
        'Vigencia Inicio',
        'Vigencia Final',
        'Fecha Antiguedad',
        'Nombre',
        'Email',
        'Telefono',
        'Telefono Movil',
        'Foto',
        'rfc',
        'curp'
    ];

    function formattedRows(operators) {
        return operators.map((operator) => {
            return {
                ...operator,
                vigenciaInicio: formatDate(operator.vigenciaInicio),
                vigenciaFinal: formatDate(operator.vigenciaFinal),
                fechaAntiguedad: formatDate(operator.fechaAntiguedad)
            };
        });
    }

    return (
        <Table
            headers={headers}
            loading={loading}
            cells={cells}
            rows={formattedRows(operators)}
            handleDelete={handleDelete}
            setItem={setItem}
            handleEdit={handleEdit}
            size="small"
        />
    );
}
