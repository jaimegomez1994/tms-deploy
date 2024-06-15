import DocumentUnitModal from './DocumentUnitModal';
import DocumentUnitTable from './DocumentUnitTable';

export default function DocumentUnit(props) {
    const {
        loading,
        documentUnits,
        deleteDocumentUnit,
        setDocumentUnit,
        setIsModalOpen,
        setIsUpdate,
        isUpdate,
        isModalOpen,
        setError,
        documentUnit,
        error,
        addDocumentUnit
    } = props;

    return (
        <div className="pt-2">
            <span className="text-lg font-bold">Documento</span>
            <div className="flex justify-between">
                <DocumentUnitTable
                    loading={loading}
                    documentUnits={documentUnits}
                    handleDelete={(docId) => deleteDocumentUnit(docId)}
                    handleEdit={(address) => {
                        setDocumentUnit(address);
                        setIsModalOpen(true);
                        setIsUpdate(true);
                    }}
                />
                <div className="pt-4 pr-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-sky-500 text-white p-3 rounded"
                    >
                        Agregar
                    </button>
                </div>
            </div>

            <DocumentUnitModal
                isUpdate={isUpdate}
                isModalOpen={isModalOpen}
                handleCloseModal={() => {
                    setIsModalOpen(false);
                    setError('');
                    setIsUpdate(false);
                    setDocumentUnit(undefined);
                }}
                documentUnit={documentUnit}
                setDocumentUnit={setDocumentUnit}
                error={error}
                handleSave={(documentUnit) => {
                    addDocumentUnit(documentUnit);
                }}
            />
        </div>
    );
}
