import ErrorDisplay from '../shared/ErrorDisplay';
import Modal from '../shared/Modal';
import ContractForm from './ContractForm';
// import ContractDocumentUnit from './document-unit/ContractDocumentUnit';

export default function ContractModal(props) {
    const {
        isModalOpen,
        handleCloseModal,
        setContract,
        contract,
        handleSave,
        error,
        isUpdate,
        contractTypes
    } = props;

    const label = `${isUpdate ? 'Actualizar' : 'Agregar'}`;

    return (
        <Modal
            title="Contrato"
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <ContractForm
                contract={contract}
                setContract={setContract}
                contractTypes={contractTypes}
            />
            {contract?.id && (
                <div className="overflow-auto">
                    {/* <ContractDocumentUnit parentId={contract.id} /> */}
                </div>
            )}

            {error && <ErrorDisplay message={error} />}
            <span className="flex w-[100%] pt-2 border-b"></span>
            <div className="flex justify-end pt-2">
                <button
                    onClick={handleCloseModal}
                    className="bg-neutral-300 text-white py-3 rounded px-6"
                >
                    Cerrar
                </button>
                <button
                    onClick={() => {
                        handleSave();
                    }}
                    // disabled={!enableAddition}
                    className="bg-sky-500 text-white py-3 px-6 rounded ml-8"
                >
                    {label}
                </button>
            </div>
        </Modal>
    );
}
