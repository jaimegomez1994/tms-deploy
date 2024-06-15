import Table from './Table';

export default function AccessoryTable(props) {
    const { loading, accessories, handleEdit, handleAddition, setItem } = props;

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
            rows={accessories}
            handleAddition={handleAddition}
            size="small"
        />
    );
}
