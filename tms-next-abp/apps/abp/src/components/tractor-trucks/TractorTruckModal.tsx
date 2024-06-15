import ErrorDisplay from '../shared/ErrorDisplay';
import Modal from '../shared/Modal';
import TractorTruckForm from './TractorTruckForm';
import TractorTruckDocumentUnit from './document-unit/TractorTruckDocumentUnit';

export default function TractorTruckModal(props) {
    const {
        isModalOpen,
        handleCloseModal,
        setTractorTruck,
        tractorTruck,
        handleSave,
        error,
        isUpdate
    } = props;

    const label = `${isUpdate ? 'Actualizar' : 'Agregar'}`;

    return (
        <Modal
            title="Tractocamion"
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <TractorTruckForm
                tractorTruck={tractorTruck}
                setTractorTruck={setTractorTruck}
            />
            {tractorTruck?.id && (
                <div className="overflow-auto">
                    <TractorTruckDocumentUnit parentId={tractorTruck.id} />
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
