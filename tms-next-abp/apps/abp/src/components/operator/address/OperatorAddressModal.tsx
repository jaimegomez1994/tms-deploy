import { regexLettersNumbersSpaces } from '../../../utils/Regex';
import ErrorDisplay from '../../shared/ErrorDisplay';
import Modal from '../../shared/Modal';

export default function OperatorAddressModal(props) {
    const {
        isModalOpen,
        handleCloseModal,
        error,
        handleSave,
        isUpdate = false,
        address,
        countries,
        states,
        setAddress
    } = props;

    const label = `${isUpdate ? 'Actualizar' : 'Agregar'}`;

    const inputRegex = regexLettersNumbersSpaces;

    return (
        <Modal
            title={`Domicilio`}
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <>
                        {' '}
                        <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                            <span>Calle: </span>
                            <input
                                className="bg-white p-2 border-2"
                                name="calle"
                                placeholder="Calle"
                                value={address?.domFiscalCalle}
                                onChange={(e) => {
                                    if (inputRegex.test(e.target.value)) {
                                        setAddress((prev) => ({
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
                                    value={address?.numeroExterior}
                                    onChange={(e) => {
                                        const reg = /^[a-zA-Z0-9]*$/;
                                        if (reg.test(e.target.value)) {
                                            setAddress((prev) => ({
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
                                    value={address?.numeroInterior}
                                    onChange={(e) => {
                                        const reg = /^[a-zA-Z0-9]*$/;
                                        if (reg.test(e.target.value)) {
                                            setAddress((prev) => ({
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
                                    value={address?.codigoPostal}
                                    onChange={(e) => {
                                        const reg = /^[0-9]*$/;
                                        if (reg.test(e.target.value)) {
                                            setAddress((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value
                                            }));
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="mt-2 sm:pl-[18px] flex flex-row pt-2 justify-between">
                            <div className="flex flex-col w-1/2">
                                <span>Colonia: </span>
                                <input
                                    className="bg-white p-2 border-2"
                                    name="colonia"
                                    placeholder="Colonia"
                                    value={address?.colonia}
                                    onChange={(e) => {
                                        if (inputRegex.test(e.target.value)) {
                                            setAddress((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value
                                            }));
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex flex-col pl-2 w-1/2">
                                {' '}
                                <span>Ciudad: </span>
                                <input
                                    className="bg-white p-2 border-2"
                                    name="ciudad"
                                    placeholder="Ciudad"
                                    value={address?.ciudad}
                                    onChange={(e) =>
                                        setAddress((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className="mt-2 sm:pl-[18px] flex flex-row pt-2 justify-between">
                            <div className="flex flex-col w-1/2">
                                <span>Pais: </span>
                                <select
                                    id="pais"
                                    name="pais"
                                    className="bg-white p-3 border-2"
                                    value={
                                        countries.find(
                                            (country) =>
                                                country.nombre === address?.pais
                                        )?.nombre
                                    }
                                    onChange={(e) => {
                                        setAddress((prev) => ({
                                            ...prev,
                                            pais: e.target.value
                                        }));
                                    }}
                                >
                                    <option value="">
                                        Selecciona una pais
                                    </option>
                                    {countries?.map((country) => (
                                        <option
                                            key={country.id}
                                            value={country.nombre}
                                        >
                                            {country.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col pl-2 w-1/2">
                                {' '}
                                <span>Estado: </span>
                                <select
                                    id="estado"
                                    name="estado"
                                    className="bg-white p-3 border-2"
                                    value={
                                        states?.find(
                                            (state) =>
                                                state.nombre === address?.estado
                                        )?.nombre
                                    }
                                    onChange={(e) => {
                                        setAddress((prev) => ({
                                            ...prev,
                                            estado: e.target.value
                                        }));
                                    }}
                                >
                                    <option value="">
                                        Selecciona una estado
                                    </option>
                                    {states?.map((state) => {
                                        if (state.pais === address?.pais) {
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
                        </div>
                    </>
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
                            handleSave(address);
                        }}
                        className="bg-sky-500 text-white py-3 px-6 rounded ml-8"
                    >
                        {label} Domicilio
                    </button>
                </div>
            </div>
        </Modal>
    );
}
