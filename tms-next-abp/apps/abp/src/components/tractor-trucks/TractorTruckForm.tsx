import {
    regexLettersSpaces,
    regexOnlyNumbersRegex,
    regexDecimal
} from '../../utils/Regex';

export default function TractorTruckForm(props) {
    const { tractorTruck, setTractorTruck } = props;

    return (
        <div className="max-h-[60vh] overflow-y-scroll">
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Numero Economico:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="numeroEconomico"
                        placeholder="Numero Economico"
                        value={tractorTruck?.numeroEconomico}
                        onChange={(e) => {
                            setTractorTruck((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Marca:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="marca"
                        placeholder="Marca"
                        value={tractorTruck?.marca}
                        onChange={(e) => {
                            setTractorTruck((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Modelo:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="modelo"
                        placeholder="Modelo"
                        value={tractorTruck?.modelo}
                        onChange={(e) => {
                            setTractorTruck((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Numero Serie:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="numeroSerie"
                        placeholder="Numero Serie"
                        value={tractorTruck?.numeroSerie}
                        onChange={(e) => {
                            setTractorTruck((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>

            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Estatus Unidad:</span>
                    <select
                        id="statusUnidad"
                        className="bg-white p-2 border-2"
                        name="statusUnidad"
                        value={tractorTruck?.statusUnidad}
                        onChange={(e) =>
                            setTractorTruck((prev) => ({
                                ...prev,
                                statusUnidad: e.target.value
                            }))
                        }
                    >
                        <option value="">Selecciona un estatus</option>
                        {[
                            'Activa',
                            'Inactivo',
                            'SinDocumentos',
                            'Taller',
                            'Baja',
                            'Alta'
                        ]?.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Numero Motor:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="numeroMotor"
                        placeholder="Numero Motor"
                        value={tractorTruck?.numeroMotor}
                        onChange={(e) => {
                            setTractorTruck((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>

            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Color:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="color"
                        placeholder="Color"
                        value={tractorTruck?.color}
                        onChange={(e) => {
                            setTractorTruck((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Potencia Motor HP:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="potenciaMotorHP"
                        placeholder="Potencia Motor HP"
                        value={tractorTruck?.potenciaMotorHP}
                        onChange={(e) => {
                            if (
                                regexOnlyNumbersRegex.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setTractorTruck((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Capacidad Carga Kg:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="capacidadCargaKg"
                        placeholder="Capacidad Carga Kg"
                        value={tractorTruck?.capacidadCargaKg}
                        onChange={(e) => {
                            if (
                                regexDecimal.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setTractorTruck((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Peso Bruto Kg:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="pesoBrutoKg"
                        placeholder="Peso Bruto Kg"
                        value={tractorTruck?.pesoBrutoKg}
                        onChange={(e) => {
                            if (
                                regexDecimal.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setTractorTruck((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Consumo Combustible Km/Litro:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="consumoCombustibleKmPorLitro"
                        placeholder="Consumo Combustible Km/Litro"
                        value={tractorTruck?.consumoCombustibleKmPorLitro}
                        onChange={(e) => {
                            if (
                                regexDecimal.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setTractorTruck((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Cantidad Ejes:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="cantidadEjes"
                        placeholder="Cantidad Ejes"
                        value={tractorTruck?.cantidadEjes}
                        onChange={(e) => {
                            if (
                                regexOnlyNumbersRegex.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setTractorTruck((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Tipo Combustible:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="tipoCombustible"
                        placeholder="Tipo Combustible"
                        value={tractorTruck?.tipoCombustible}
                        onChange={(e) => {
                            if (
                                regexLettersSpaces.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setTractorTruck((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Transmision:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="transmision"
                        placeholder="Transmision"
                        value={tractorTruck?.transmision}
                        onChange={(e) => {
                            if (
                                regexLettersSpaces.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setTractorTruck((prev) => ({
                                    ...prev,
                                    [e.target.name]: e.target.value
                                }));
                            }
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Observaciones:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="observaciones"
                        placeholder="Observaciones"
                        value={tractorTruck?.observaciones}
                        onChange={(e) => {
                            setTractorTruck((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
