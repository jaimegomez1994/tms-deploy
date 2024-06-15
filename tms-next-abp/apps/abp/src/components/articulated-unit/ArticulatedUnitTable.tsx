import Table from '../shared/Table';

export default function ArticulatedUnitTable(props) {
    const {
        loading,
        articulatedUnits,
        handleDelete,
        setItem,
        handleEdit,
        hideEdit
    } = props;

    const cells = [
        'alias',
        'tipoUnidadArticulada',
        'descripcion',
        'numeroEconomico'
    ];

    const headers = [
        'Alias',
        'Tipo de Unidad Articulada',
        'Descripcion',
        'Tractocamion'
    ];

    return (
        <Table
            headers={headers}
            loading={loading}
            cells={cells}
            rows={articulatedUnits}
            handleDelete={handleDelete}
            setItem={setItem}
            handleEdit={handleEdit}
            hideEdit={hideEdit}
            size="small"
        />
    );
}
