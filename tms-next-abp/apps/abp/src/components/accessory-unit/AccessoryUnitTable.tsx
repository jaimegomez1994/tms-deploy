import Table from '../shared/Table';

export default function AccessoryUnitTable(props) {
    const { loading, accessoryUnits, handleDelete, setItem, handleEdit } =
        props;

    //
    const cells = ['numeroEconomico', 'numeroSerie', 'nombre', 'descripcion'];

    const headers = [
        'Numero Economico',
        'Numero Serie',
        'Nombre',
        'Descripcion'
    ];

    return (
        <Table
            headers={headers}
            loading={loading}
            cells={cells}
            rows={accessoryUnits}
            handleDelete={handleDelete}
            setItem={setItem}
            handleEdit={handleEdit}
            hideEdit={true}
            size="xs"
        />
    );
}
