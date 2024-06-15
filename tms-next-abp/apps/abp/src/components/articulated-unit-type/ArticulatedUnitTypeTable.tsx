import Table from '../shared/Table';

export default function ArticulatedUnitTypeTable(props) {
    const { loading, articulatedUnitTypes, handleDelete, setItem, handleEdit } =
        props;

    const cells = ['nombre', 'capacidad', 'remolques', 'descripcion'];

    const headers = ['Nombre', 'Capacidad', 'Remolques', 'Descripcion'];

    return (
        <Table
            headers={headers}
            loading={loading}
            cells={cells}
            rows={articulatedUnitTypes}
            handleDelete={handleDelete}
            setItem={setItem}
            handleEdit={handleEdit}
        />
    );
}
