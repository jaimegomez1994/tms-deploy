import Modal from '../shared/Modal';

export default function CountryUpdateModal(props) {
    const {
        isModalOpen,
        onCloseModal,
        updateCountry,
        currentCountry,
        setCurrentCountry
    } = props;

    function handleInputChange(e) {
        const newValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        setCurrentCountry({ id: currentCountry.id, countryName: newValue });
    }

    const handleCloseModal = () => {
        onCloseModal();
    };

    return (
        <Modal
            title="Actualizar Pais:"
            isModalOpen={isModalOpen}
            onCloseModal={() => handleCloseModal()}
        >
            <div className="mt-4 sm:pl-[18px]">
                Pais:{' '}
                <input
                    className="bg-white p-2 border-2 m-4"
                    name="countryName"
                    placeholder="Nombre del pais"
                    value={currentCountry.countryName}
                    onChange={(e) => handleInputChange(e)}
                    pattern="[A-Za-z]"
                />
            </div>
            <div className="flex justify-end">
                <button
                    onClick={() => handleCloseModal()}
                    className="bg-neutral-300 text-white py-3 rounded px-6"
                >
                    Cerrar
                </button>
                <button
                    onClick={() => updateCountry(currentCountry)}
                    disabled={!currentCountry.countryName}
                    className="bg-sky-500 text-white py-3 px-6 rounded ml-8"
                >
                    Guardar Pais
                </button>
            </div>
        </Modal>
    );
}
