import { regexLettersNumbersSpaces } from '../../../utils/Regex';
import Modal from '../../shared/Modal';
import ErrorDisplay from '../../shared/ErrorDisplay';
import { useEffect } from 'react';

export default function BankAccountModal(props) {
    const {
        isModalOpen,
        handleCloseModal,
        error,
        handleSave,
        isUpdate = false,
        isDefault,
        account,
        setAccount
    } = props;

    const label = `${isUpdate ? 'Actualizar' : 'Agregar'}`;

    const inputRegex = regexLettersNumbersSpaces;

    const tipoDeCuentaOptions = [' Cheques', 'Ahorro', 'Otra'];

    useEffect(() => {
        if (isDefault) {
            setAccount((prev) => ({
                ...prev,
                preDeterminada: 'True'
            }));
        }
    }, []);

    return (
        <Modal
            title={`Cuentas`}
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Alias de cuenta:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="aliasCuenta"
                        placeholder="Alias de la cuenta"
                        value={account?.aliasCuenta}
                        onChange={(e) => {
                            if (inputRegex.test(e.target.value)) {
                                setAccount((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Banco:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="banco"
                        placeholder="Banco"
                        value={account?.banco}
                        onChange={(e) => {
                            if (inputRegex.test(e.target.value)) {
                                setAccount((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Numero de cuenta:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="numeroDeCuenta"
                        placeholder="Numero de cuenta"
                        value={account?.numeroDeCuenta}
                        onChange={(e) => {
                            if (inputRegex.test(e.target.value)) {
                                setAccount((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Clabe:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="clabe"
                        placeholder="Clabe"
                        value={account?.clabe}
                        onChange={(e) => {
                            if (inputRegex.test(e.target.value)) {
                                setAccount((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Numero de tarjeta:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="numeroDeTarjeta"
                        placeholder="Numero de tarjeta"
                        value={account?.numeroDeTarjeta}
                        onChange={(e) => {
                            if (inputRegex.test(e.target.value)) {
                                setAccount((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Tipo de cuenta:</span>
                    <select
                        id="productTypeSelect"
                        className="bg-white p-2 border-2"
                        name="tipoCuentaBancaria"
                        value={tipoDeCuentaOptions.find(
                            (country) => country === account?.tipoCuentaBancaria
                        )}
                        onChange={(e) =>
                            setAccount((prev) => ({
                                ...prev,
                                tipoCuentaBancaria: e.target.value
                            }))
                        }
                    >
                        <option value="">Selecciona un tipo de cuenta</option>
                        {tipoDeCuentaOptions?.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-2 sm:pl-[18px] flex flex-row">
                    <span className="pr-2">Predeterminada:</span>
                    <input
                        type="checkbox"
                        disabled={isDefault}
                        name="preDeterminada"
                        checked={
                            account?.preDeterminada === 'True' ? true : false
                        }
                        onChange={() => {
                            setAccount((prev) => ({
                                ...prev,
                                preDeterminada:
                                    prev?.preDeterminada === 'True'
                                        ? 'False'
                                        : 'True'
                            }));
                        }}
                    ></input>
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
                            handleSave(account);
                        }}
                        className="bg-sky-500 text-white py-3 px-6 rounded ml-8"
                    >
                        {label} cuenta
                    </button>
                </div>
            </div>
        </Modal>
    );
}
