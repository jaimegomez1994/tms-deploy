import { regexLettersNumbersSpaces } from '../../../utils/Regex';

export default function TaxResidence(props) {
    const { company, setCompany, countries, states } = props;

    const inputRegex = regexLettersNumbersSpaces;

    return (
        <>
            {' '}
            <div className="mt-2 sm:pl-[18px] flex flex-col pt-2">
                <h2 className="text-center text-lg">Domicilio fiscal</h2>
                <span>Calle: </span>
                <input
                    className="bg-white p-2 border-2"
                    name="domFiscalCalle"
                    placeholder="Calle de la empresa"
                    value={company?.domFiscalCalle}
                    onChange={(e) => {
                        if (inputRegex.test(e.target.value)) {
                            setCompany((prev) => ({
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
                        name="domFiscalNumeroExterior"
                        placeholder="Numero exterior"
                        value={company?.domFiscalNumeroExterior}
                        onChange={(e) => {
                            const reg = /^[a-zA-Z0-9]*$/;
                            if (reg.test(e.target.value)) {
                                setCompany((prev) => ({
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
                        value={company?.domFiscalNumeroInterior}
                        onChange={(e) => {
                            const reg = /^[a-zA-Z0-9]*$/;
                            if (reg.test(e.target.value)) {
                                setCompany((prev) => ({
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
                        value={company?.domFiscalCodigoPostal}
                        onChange={(e) => {
                            const reg = /^[0-9]*$/;
                            if (reg.test(e.target.value)) {
                                setCompany((prev) => ({
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
                        value={company?.domFiscalColonia}
                        onChange={(e) => {
                            if (inputRegex.test(e.target.value)) {
                                setCompany((prev) => ({
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
                        value={company?.domFiscalCiudad}
                        onChange={(e) =>
                            setCompany((prev) => ({
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
                                    country.nombre === company?.domFiscalPais
                            )?.nombre
                        }
                        onChange={(e) => {
                            setCompany((prev) => ({
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
                                    state.nombre === company?.domFiscalEstado
                            )?.nombre
                        }
                        onChange={(e) => {
                            setCompany((prev) => ({
                                ...prev,
                                domFiscalEstado: e.target.value
                            }));
                        }}
                    >
                        <option value="">Selecciona una estado</option>
                        {states?.map((state) => {
                            if (state.pais === company?.domFiscalPais) {
                                return (
                                    <option key={state.id} value={state.nombre}>
                                        {state.nombre}
                                    </option>
                                );
                            }
                        })}
                    </select>
                </div>
            </div>
        </>
    );
}
