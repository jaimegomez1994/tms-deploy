import { useState } from 'react';
import Modal from '../shared/Modal';
import ErrorDisplay from '../shared/ErrorDisplay';

export default function StateModal(props) {
    const { isModalOpen, onCloseModal, addState, countries, error, setError } =
        props;

    const [selectedCountry, setSelectedCountry] = useState('');
    const [stateName, setStateName] = useState('');

    const handleSelectChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleCloseModal = () => {
        setStateName('');
        setSelectedCountry('');
        onCloseModal();
        setError('');
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
                        value={stateName}
                        onChange={(e) =>
                            setStateName(
                                e.target.value.replace(/[^a-zA-Z\s]/g, '')
                            )
                        }
                    />
                </div>
                <div className="mt-2 sm:pl-[18px]">
                    <span>Pais:</span>
                    <select
                        id="countrySelect"
                        className="bg-white p-3 m-4 border-2"
                        value={selectedCountry}
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
                            if (selectedCountry && selectedCountry) {
                                setSelectedCountry('');
                                setStateName('');
                                addState(stateName, selectedCountry);
                            }
                        }}
                        disabled={!selectedCountry && !stateName}
                        className="bg-sky-500 text-white py-3 px-6 rounded ml-8"
                    >
                        Agregar Estado
                    </button>
                </div>
            </div>
        </Modal>
    );
}
