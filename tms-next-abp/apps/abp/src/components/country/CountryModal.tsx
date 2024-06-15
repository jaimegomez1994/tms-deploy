import { useState } from 'react';
import Modal from '../shared/Modal';
import ErrorDisplay from '../shared/ErrorDisplay';

export default function CountryModal(props) {
    const { isModalOpen, onCloseModal, addCountry, error, setError } = props;
    const [countryName, setCountryName] = useState('');

    function handleInputChange(e) {
        const newValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        setCountryName(newValue);
    }

    const handleCloseModal = () => {
        setCountryName('');
        setError('');
        onCloseModal();
    };

    return (
        <Modal
            title="Agregar Pais:"
            isModalOpen={isModalOpen}
            onCloseModal={() => {
                handleCloseModal();
            }}
        >
            <div className="mt-4 sm:pl-[18px]">
                Pais:{' '}
                <input
                    className="bg-white p-2 border-2 m-4"
                    name="countryName"
                    placeholder="Nombre del pais"
                    value={countryName}
                    onChange={(e) => handleInputChange(e)}
                    pattern="[A-Za-z]"
                />
            </div>
            {error && <ErrorDisplay message={error} />}

            <div className="flex justify-end">
                <button
                    onClick={() => handleCloseModal()}
                    className="bg-neutral-300 text-white py-3 rounded px-6"
                >
                    Cerrar
                </button>
                <button
                    onClick={() => {
                        addCountry(countryName);
                        setCountryName('');
                    }}
                    disabled={!countryName}
                    className="bg-sky-500 text-white py-3 px-6 rounded ml-8"
                >
                    Agregar Pais
                </button>
            </div>
        </Modal>
    );
}
