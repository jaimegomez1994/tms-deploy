import ErrorDisplay from '../shared/ErrorDisplay';
import Modal from '../shared/Modal';
import TrailerTypeForm from './TrailerTypeForm';

export default function TrailerTypeModal(props) {
    const {
        isModalOpen,
        handleCloseModal,
        setTrailerType,
        trailerType,
        handleSave,
        error,
        isUpdate
    } = props;

    const label = `${isUpdate ? 'Actualizar' : 'Agregar'}`;

    return (
        <Modal
            title="Tipo de Remolque"
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <TrailerTypeForm
                trailerType={trailerType}
                setTrailerType={setTrailerType}
            />

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
