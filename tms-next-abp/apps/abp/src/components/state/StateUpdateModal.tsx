import ErrorDisplay from '../shared/ErrorDisplay';
import Modal from '../shared/Modal';

export default function StateUpdateModal(props) {
    const {
        isModalOpen,
        onCloseModal,
        updateState,
        countries,
        currentState,
        setCurrentState,
        error
    } = props;

    const handleSelectChange = (event) => {
        setCurrentState({
            pais: event.target.value
        });
    };

    function handleInputChange(e) {
        const newValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        setCurrentState({ nombre: newValue });
    }

    const handleCloseModal = () => {
        onCloseModal();
    };

    return (
        <Modal
            title="Agregar Estado:"
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-4 sm:pl-[18px]">
                    Estado:{' '}
                    <input
                        className="bg-white p-2 border-2 m-4"
                        name="clientName"
                        placeholder="Nombre del estado"
                        value={currentState.nombre}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <div className="mt-2 sm:pl-[18px]">
                    <span>Pais:</span>
                    <select
                        id="countrySelect"
                        className="bg-white p-3 border-2 m-4"
                        value={currentState.pais}
                        onChange={handleSelectChange}
                    >
                        <option value="">Selecciona un pais</option>
                        {countries?.map((country) => (
                            <option key={country.id} value={country.nombre}>
                                {country.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <ErrorDisplay message={error} />}
                <div className="flex justify-end">
                    <button
                        onClick={handleCloseModal}
                        className="bg-neutral-300 text-white py-3 rounded px-6"
                    >
                        Cerrar
                    </button>
                    <button
                        onClick={() => {
                            if (currentState?.pais && currentState?.nombre) {
                                updateState(currentState);
                            }
                        }}
                        disabled={!currentState.pais && !currentState.nombre}
                        className="bg-sky-500 text-white py-3 px-6 rounded ml-8"
                    >
                        Actualizar Estado
                    </button>
                </div>
            </div>
        </Modal>
    );
}
