import Table from '../shared/Table';

export default function DivisionTable(props) {
    const { loading, divisions, handleDelete, setItem } = props;

    const cells = [
        'nombre',
        'alias',
        'calle',
        'colonia',
        'codigoPostal',
        'ciudad',
        'estado',
        'pais'
    ];

    const headers = [
        'nombre',
        'alias',
        'calle',
        'colonia',
        'codigo postal',
        'ciudad',
        'estado',
        'pais'
    ];

    return (
        <Table
            headers={headers}
            loading={loading}
            cells={cells}
            rows={divisions}
            handleDelete={handleDelete}
            setItem={setItem}
            handleEdit={() => {}}
            size="xs"
            hideEdit
        />
    );
}
