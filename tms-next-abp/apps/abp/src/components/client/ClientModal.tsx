import { getLegalEntityType } from '../../utils/LegalEntity';
import { validateFullRFC } from '../../utils/validators';
import ErrorDisplay from '../shared/ErrorDisplay';
import Modal from '../shared/Modal';
import ContractSection from './contract/ContractSection';

export default function ClientModal(props) {
    const {
        isModalOpen,
        onCloseModal,
        handleSave,
        error,
        client,
        setClient,
        setError,
        countries,
        states,
        isUpdate = false,
        setIsUpdate
    } = props;

    const inputRegex = /^[a-zA-Z0-9\s]*$/; // leters, numbers and spaces

    const label = `${isUpdate ? 'Actualizar' : 'Agregar'}`;

    const requiredFields = [
        'rfc',
        'pais',
        'calle',
        'ciudad',
        'estado',
        'nombre',
        'colonia',
        'codigoPostal',
        'numeroExterior'
    ];

    const enableAddition = requiredFields.every((requiredField) => {
        return (
            client?.hasOwnProperty(requiredField) &&
            client[requiredField] !== ''
        );
    });

    const handleCloseModal = () => {
        setClient(undefined);
        onCloseModal();
        setError('');
        setIsUpdate(false);
    };

    const validateRFC = (rfc) => {
        if (rfc.length < 13) {
            setError('RFC debe tener al menos 13 caracteres');
        }
        if (rfc.length > 14) {
            setError('RFC puede tener solo 14 caracteres');
        }

        if (!validateFullRFC(rfc.toUpperCase())) {
            setError('RFC invalido');
        }
        return true;
    };

    return (
        <Modal
            title={`${label} cliente:`}
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <div className="max-h-[75vh] overflow-auto">
                <div className="text-sm font-normal text-neutral-500">
                    <div className="mt-2 sm:pl-[18px] flex flex-col">
                        <span>Nombre:</span>
                        <input
                            className="bg-white p-2 border-2"
                            name="nombre"
                            placeholder="Nombre del cliente"
                            value={client?.nombre}
                            onChange={(e) => {
                                if (inputRegex.test(e.target.value)) {
                                    setClient((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value
                                    }));
                                }
                            }}
                        />
                    </div>
                    <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                        <span>RFC: </span>
                        <input
                            className="bg-white p-2 border-2"
                            name="rfc"
                            placeholder="RFC del cliente"
                            value={client?.rfc}
                            onChange={(e) => {
                                const reg = /^[a-zA-Z0-9]*$/;
                                if (reg.test(e.target.value)) {
                                    setClient((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value
                                    }));
                                }
                            }}
                        />
                    </div>
                    <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                        <span>Calle: </span>
                        <input
                            className="bg-white p-2 border-2"
                            name="calle"
                            placeholder="Calle del cliente"
                            value={client?.calle}
                            onChange={(e) => {
                                if (inputRegex.test(e.target.value)) {
                                    setClient((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value
                                    }));
                                }
                            }}
                        />
                    </div>

                    <div className="mt-2 sm:pl-[18px] flex flex-row pt-2">
                        <div>
                            <span>Numero Exterior: </span>
                            <input
                                className="bg-white p-2 border-2"
                                name="numeroExterior"
                                placeholder="Numero exterior"
                                value={client?.numeroExterior}
                                onChange={(e) => {
                                    const reg = /^[a-zA-Z0-9]*$/;
                                    if (reg.test(e.target.value)) {
                                        setClient((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value
                                        }));
                                    }
                                }}
                            />
                        </div>
                        <div>
                            {' '}
                            <span>Numero interior: </span>
                            <input
                                className="bg-white p-2 border-2"
                                name="numeroInterior"
                                placeholder="Numero interior"
                                value={client?.numeroInterior}
                                onChange={(e) => {
                                    const reg = /^[a-zA-Z0-9]*$/;
                                    if (reg.test(e.target.value)) {
                                        setClient((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value
                                        }));
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <span>Codigo Postal: </span>
                            <input
                                className="bg-white p-2 border-2"
                                name="codigoPostal"
                                placeholder="Codigo postal"
                                value={client?.codigoPostal}
                                onChange={(e) => {
                                    const reg = /^[0-9]*$/;
                                    if (reg.test(e.target.value)) {
                                        setClient((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value
                                        }));
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                        <span>Colonia: </span>
                        <input
                            className="bg-white p-2 border-2"
                            name="colonia"
                            placeholder="Colonia"
                            value={client?.colonia}
                            onChange={(e) => {
                                if (inputRegex.test(e.target.value)) {
                                    setClient((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value
                                    }));
                                }
                            }}
                        />
                    </div>
                    <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                        <span>Ciudad: </span>
                        <input
                            className="bg-white p-2 border-2"
                            name="ciudad"
                            placeholder="Ciudad"
                            value={client?.ciudad}
                            onChange={(e) =>
                                setClient((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }))
                            }
                        />
                    </div>
                    <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                        <span>Pais: </span>
                        <select
                            id="pais"
                            className="bg-white p-3 border-2"
                            value={
                                countries.find(
                                    (country) => country.nombre === client?.pais
                                )?.nombre
                            }
                            onChange={(e) => {
                                setClient((prev) => ({
                                    ...prev,
                                    pais: e.target.value
                                }));
                            }}
                        >
                            <option value="">Selecciona una pais</option>
                            {countries?.map((country) => (
                                <option key={country.id} value={country.nombre}>
                                    {country.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                        <span>Estado: </span>
                        <select
                            id="estado"
                            className="bg-white p-3 border-2"
                            value={
                                states.find(
                                    (state) => state.nombre === client?.estado
                                )?.nombre
                            }
                            onChange={(e) => {
                                setClient((prev) => ({
                                    ...prev,
                                    estado: e.target.value
                                }));
                            }}
                        >
                            <option value="">Selecciona una estado</option>
                            {states?.map((state) => {
                                if (state.pais === client?.pais) {
                                    return (
                                        <option
                                            key={state.id}
                                            value={state.nombre}
                                        >
                                            {state.nombre}
                                        </option>
                                    );
                                }
                            })}
                        </select>
                    </div>
                    {client?.id && (
                        <div className="overflow-auto pt-2">
                            <span>Contratos:</span>
                            <ContractSection clientID={client?.id} />
                        </div>
                    )}

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
                                if (validateRFC(client.rfc)) {
                                    client.tipoEntidadLegal =
                                        getLegalEntityType(client.rfc);
                                    handleSave(client);
                                }
                            }}
                            disabled={!enableAddition}
                            className="bg-sky-500 text-white py-3 px-6 rounded ml-8"
                        >
                            {label}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
