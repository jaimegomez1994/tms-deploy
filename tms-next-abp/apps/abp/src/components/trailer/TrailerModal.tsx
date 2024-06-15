import ErrorDisplay from '../shared/ErrorDisplay';
import Modal from '../shared/Modal';
import TrailerForm from './TrailerForm';
import TrailerDocumentUnit from './document-unit/TrailerDocumentUnit';

export default function TrailerModal(props) {
    const {
        isModalOpen,
        handleCloseModal,
        setTrailer,
        trailer,
        handleSave,
        error,
        isUpdate,
        trailerTypes
    } = props;

    const label = `${isUpdate ? 'Actualizar' : 'Agregar'}`;

    return (
        <Modal
            title="Remolque"
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <TrailerForm
                trailer={trailer}
                setTrailer={setTrailer}
                trailerTypes={trailerTypes}
            />
            {trailer?.id && (
                <div className="overflow-auto">
                    <TrailerDocumentUnit parentId={trailer.id} />
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
