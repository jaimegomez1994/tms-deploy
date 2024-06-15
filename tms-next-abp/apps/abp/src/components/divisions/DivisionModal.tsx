import { useState } from 'react';
import { DivisionService } from '@tms_next_abp/proxy';
import { regexLettersNumbersSpaces } from '../../utils/Regex';
import Modal from '../shared/Modal';
import ErrorDisplay from '../shared/ErrorDisplay';

export default function DivisionModal(props) {
    const {
        isModalOpen,
        handleCloseModal,
        countries,
        states,
        error,
        addDivision,
        division,
        setDivision
    } = props;

    const inputRegex = regexLettersNumbersSpaces;

    return (
        <Modal
            title="Division"
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
        >
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Alias:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="alias"
                        placeholder="Alias de la division"
                        value={division?.alias}
                        onChange={(e) => {
                            if (inputRegex.test(e.target.value)) {
                                setDivision((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>

                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Nombre:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="nombre"
                        placeholder="Nombre de la division"
                        value={division?.nombre}
                        onChange={(e) => {
                            if (inputRegex.test(e.target.value)) {
                                setDivision((prev) => ({
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
                        placeholder="Calle de la empresa"
                        value={division?.calle}
                        onChange={(e) => {
                            if (inputRegex.test(e.target.value)) {
                                setDivision((prev) => ({
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
                            value={division?.numeroExterior}
                            onChange={(e) => {
                                const reg = /^[a-zA-Z0-9]*$/;
                                if (reg.test(e.target.value)) {
                                    setDivision((prev) => ({
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
                            value={division?.numeroInterior}
                            onChange={(e) => {
                                const reg = /^[a-zA-Z0-9]*$/;
                                if (reg.test(e.target.value)) {
                                    setDivision((prev) => ({
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
                            value={division?.codigoPostal}
                            onChange={(e) => {
                                const reg = /^[0-9]*$/;
                                if (reg.test(e.target.value)) {
                                    setDivision((prev) => ({
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
                            value={division?.colonia}
                            onChange={(e) => {
                                if (inputRegex.test(e.target.value)) {
                                    setDivision((prev) => ({
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
                            value={division?.ciudad}
                            onChange={(e) =>
                                setDivision((prev) => ({
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
                            className="bg-white p-3 border-2"
                            value={
                                countries.find(
                                    (country) =>
                                        country.nombre === division?.pais
                                )?.nombre
                            }
                            onChange={(e) => {
                                setDivision((prev) => ({
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
                    <div className="flex flex-col pl-2 w-1/2">
                        {' '}
                        <span>Estado: </span>
                        <select
                            id="estado"
                            className="bg-white p-3 border-2"
                            value={
                                states.find(
                                    (state) => state.nombre === division?.estado
                                )?.nombre
                            }
                            onChange={(e) => {
                                setDivision((prev) => ({
                                    ...prev,
                                    estado: e.target.value
                                }));
                            }}
                        >
                            <option value="">Selecciona una estado</option>
                            {states?.map((state) => {
                                if (state.pais === division?.pais) {
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
                            addDivision(division);
                        }}
                        className="bg-sky-500 text-white py-3 px-6 rounded ml-8"
                    >
                        Guardar division
                    </button>
                </div>
            </div>
        </Modal>
    );
}
