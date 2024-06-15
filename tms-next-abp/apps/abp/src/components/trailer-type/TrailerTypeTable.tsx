import Table from '../shared/Table';

export default function TrailerTypeTable(props) {
    const { loading, trailerTypes, handleDelete, setItem, handleEdit } = props;

    const cells = ['nombre', 'descripcion'];

    const headers = ['Nombre', 'Descripcion'];

    return (
        <Table
            headers={headers}
            loading={loading}
            cells={cells}
            rows={trailerTypes}
            handleDelete={handleDelete}
            setItem={setItem}
            handleEdit={handleEdit}
        />
    );
}
