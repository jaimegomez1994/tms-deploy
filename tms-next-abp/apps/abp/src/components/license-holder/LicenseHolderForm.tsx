import { useEffect, useState } from 'react';
import { CountryService, StateService } from '@tms_next_abp/proxy';
import { regexLettersNumbersSpaces } from '../../utils/Regex';

export default function LicenseHolderForm(props) {
    const { licenseHolder, setLicenseHolder } = props;
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);

    function getCountries() {
        CountryService.countryGetList().then((data) =>
            setCountries(data?.items)
        );
    }

    function getStateData() {
        StateService.statesGetList().then((data) => setStates(data?.items));
    }
    useEffect(() => {
        getCountries();
        getStateData();
    }, []);

    return (
        <div className="max-h-[60vh]">
            <div className="text-sm font-normal text-neutral-500">
                {' '}
                <div className="mt-2 sm:pl-[18px] flex flex-row pt-2 justify-between">
                    <div className="flex flex-col w-1/2">
                        <span>Nombre: </span>
                        <input
                            className="bg-white p-2 border-2"
                            name="nombre"
                            placeholder="Nombre de la empresa"
                            value={licenseHolder?.nombre}
                            onChange={(e) => {
                                if (
                                    regexLettersNumbersSpaces.test(
                                        e.target.value
                                    )
                                ) {
                                    setLicenseHolder((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value
                                    }));
                                }
                            }}
                        />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <span>RFC: </span>
                        <input
                            className="bg-white p-2 border-2"
                            name="rfc"
                            placeholder="RFC de la empresa"
                            value={licenseHolder?.rfc}
                            onChange={(e) => {
                                const reg = /^[a-zA-Z0-9]*$/;
                                if (reg.test(e.target.value)) {
                                    setLicenseHolder((prev) => ({
                                        ...prev,
                                        [e.target.name]: e.target.value
                                    }));
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                    <h2 className="text-center text-lg">Domicilio fiscal</h2>
                    <span>Calle: </span>
                    <input
                        className="bg-white p-2 border-2"
                        name="domFiscalCalle"
                        placeholder="Calle de la empresa"
                        value={licenseHolder?.domFiscalCalle}
                        onChange={(e) => {
                            setLicenseHolder((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
                <div className="mt-2 sm:pl-[18px] flex flex-row pt-2">
                    <div>
                        <span>Numero Exterior: </span>
                        <input
                            className="bg-white p-2 border-2"
                            name="domFiscalNumeroExterior"
                            placeholder="Numero exterior"
                            value={licenseHolder?.domFiscalNumeroExterior}
                            onChange={(e) => {
                                const reg = /^[a-zA-Z0-9]*$/;
                                if (reg.test(e.target.value)) {
                                    setLicenseHolder((prev) => ({
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
                            name="domFiscalNumeroInterior"
                            placeholder="Numero interior"
                            value={licenseHolder?.domFiscalNumeroInterior}
                            onChange={(e) => {
                                const reg = /^[a-zA-Z0-9]*$/;
                                if (reg.test(e.target.value)) {
                                    setLicenseHolder((prev) => ({
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
                            name="domFiscalCodigoPostal"
                            placeholder="Codigo postal"
                            value={licenseHolder?.domFiscalCodigoPostal}
                            onChange={(e) => {
                                const reg = /^[0-9]*$/;
                                if (reg.test(e.target.value)) {
                                    setLicenseHolder((prev) => ({
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
                            name="domFiscalColonia"
                            placeholder="Colonia"
                            value={licenseHolder?.domFiscalColonia}
                            onChange={(e) => {
                                if (
                                    regexLettersNumbersSpaces.test(
                                        e.target.value
                                    )
                                ) {
                                    setLicenseHolder((prev) => ({
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
                            name="domFiscalCiudad"
                            placeholder="Ciudad"
                            value={licenseHolder?.domFiscalCiudad}
                            onChange={(e) =>
                                setLicenseHolder((prev) => ({
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
                            id="domFiscalPais"
                            className="bg-white p-3 border-2"
                            value={
                                countries.find(
                                    (country) =>
                                        country.nombre ===
                                        licenseHolder?.domFiscalPais
                                )?.nombre
                            }
                            onChange={(e) => {
                                setLicenseHolder((prev) => ({
                                    ...prev,
                                    domFiscalPais: e.target.value
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
                            id="domFiscalEstado"
                            className="bg-white p-3 border-2"
                            value={
                                states.find(
                                    (state) =>
                                        state.nombre ===
                                        licenseHolder?.domFiscalEstado
                                )?.nombre
                            }
                            onChange={(e) => {
                                setLicenseHolder((prev) => ({
                                    ...prev,
                                    domFiscalEstado: e.target.value
                                }));
                            }}
                        >
                            <option value="">Selecciona una estado</option>
                            {states?.map((state) => {
                                if (
                                    state.pais === licenseHolder?.domFiscalPais
                                ) {
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
            </div>
        </div>
    );
}
