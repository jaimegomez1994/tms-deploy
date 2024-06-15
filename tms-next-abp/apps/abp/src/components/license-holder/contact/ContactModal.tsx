import { regexLettersNumbersSpaces } from '../../../utils/Regex';
import Modal from '../../shared/Modal';
import ErrorDisplay from '../../shared/ErrorDisplay';
import { useEffect } from 'react';

export default function ContactModal(props) {
    const {
        isModalOpen,
        handleCloseModal,
        error,
        handleSave,
        isUpdate = false,
        isDefault,
        contact,
        setContact
    } = props;

    const label = `${isUpdate ? 'Actualizar' : 'Agregar'}`;

    const inputRegex = regexLettersNumbersSpaces;

    const tipoDeCuentaOptions = [' Cheques', 'Ahorro', 'Otra'];

    return (
        <Modal
            title={`Contactos`}
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Nombre:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="nombre"
                        placeholder="Nombre del operador"
                        value={contact?.nombre}
                        onChange={(e) => {
                            if (
                                inputRegex.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setContact((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Email:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="email"
                        placeholder="Email del operador"
                        value={contact?.email}
                        onChange={(e) => {
                            setContact((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>

                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Telefono:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="telefono"
                        placeholder="Telefono del operador"
                        value={contact?.telefono}
                        onChange={(e) => {
                            if (
                                inputRegex.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setContact((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>

                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Telefono Movil:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="telefonoMovil"
                        placeholder="Telefono movil del operador"
                        value={contact?.telefonoMovil}
                        onChange={(e) => {
                            if (
                                inputRegex.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setContact((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>

                {error && <ErrorDisplay message={error} />}
                <div className="flex justify-end pt-2">
                    <button
                        onClick={handleCloseModal}
                        className="bg-neutral-300 text-white py-3 rounded px-6"
                    >
                        Cerrar
                    </button>
                    <button
                        onClick={() => {
                            handleSave(contact);
                        }}
                        className="bg-sky-500 text-white py-3 px-6 rounded ml-8"
                    >
                        {label} contacto
                    </button>
                </div>
            </div>
        </Modal>
    );
}
