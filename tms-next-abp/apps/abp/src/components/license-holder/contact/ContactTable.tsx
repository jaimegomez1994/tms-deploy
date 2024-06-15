import Table from '../../shared/Table';

export default function ContactTable(props) {
    const {
        loading,
        contacts,
        handleDelete,
        setItem,
        handleEdit,
        hideEdit = false
    } = props;

    const cells = ['nombre', 'email', 'telefono', 'telefonoMovil'];

    const headers = ['nombre', 'email', 'telefono', 'telefono movil'];

    function formattedRows(articulatedUnits) {
        return articulatedUnits?.map((tractorTruck) => {
            return {
                ...tractorTruck
            };
        });
    }

    return (
        <Table
            headers={headers}
            loading={loading}
            cells={cells}
            rows={contacts}
            handleDelete={handleDelete}
            setItem={setItem}
            handleEdit={handleEdit}
            hideEdit={hideEdit}
            size="small"
        />
    );
}
