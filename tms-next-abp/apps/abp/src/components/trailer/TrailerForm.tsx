import { regexDecimal, regexOnlyNumbersRegex } from '../../utils/Regex';

export default function TrailerForm(props) {
    const { trailer, setTrailer, trailerTypes } = props;

    return (
        <div className="max-h-[60vh] overflow-y-scroll">
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Numero Economico:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="numeroEconomico"
                        placeholder="Numero Economico"
                        value={trailer?.numeroEconomico}
                        onChange={(e) => {
                            setTrailer((prev) => ({
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
                        value={trailer?.marca}
                        onChange={(e) => {
                            setTrailer((prev) => ({
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
                        value={trailer?.modelo}
                        onChange={(e) => {
                            setTrailer((prev) => ({
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
                        value={trailer?.numeroSerie}
                        onChange={(e) => {
                            setTrailer((prev) => ({
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
                        value={trailer?.statusUnidad}
                        onChange={(e) =>
                            setTrailer((prev) => ({
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
                    <span>Capacidad Carga (Kg):</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="capacidadCargaKg"
                        placeholder="Capacidad Carga (Kg)"
                        value={trailer?.capacidadCargaKg}
                        onChange={(e) => {
                            if (
                                regexDecimal.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setTrailer((prev) => ({
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
                    <span>Longitud (Metros):</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="longitudMetros"
                        placeholder="Longitud (Metros)"
                        value={trailer?.longitudMetros}
                        onChange={(e) => {
                            if (
                                regexDecimal.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setTrailer((prev) => ({
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
                    <span>Color:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="color"
                        placeholder="Color"
                        value={trailer?.color}
                        onChange={(e) => {
                            setTrailer((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>

            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Numero Ejes:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="numeroEjes"
                        placeholder="Numero Ejes"
                        value={trailer?.numeroEjes}
                        onChange={(e) => {
                            if (
                                regexOnlyNumbersRegex.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setTrailer((prev) => ({
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
                    <span>Tara (Kg):</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="taraKg"
                        placeholder="Tara (Kg)"
                        value={trailer?.taraKg}
                        onChange={(e) => {
                            if (
                                regexDecimal.test(e.target.value) ||
                                e.target.value === ''
                            ) {
                                setTrailer((prev) => ({
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
                    <span>Funcion:</span>
                    <input
                        className="bg-white p-2 border-2"
                        name="funcion"
                        placeholder="Funcion"
                        value={trailer?.funcion}
                        onChange={(e) => {
                            setTrailer((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
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
                        value={trailer?.observaciones}
                        onChange={(e) => {
                            setTrailer((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }));
                        }}
                    />
                </div>
            </div>
            <div className="text-sm font-normal text-neutral-500">
                <div className="mt-2 sm:pl-[18px] flex flex-col">
                    <span>Tipo Remolque:</span>
                    <select
                        id="tipoRemolque"
                        className="bg-white p-2 border-2"
                        name="tipoRemolque"
                        value={trailer?.tipoRemolque}
                        onChange={(e) =>
                            setTrailer((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value
                            }))
                        }
                    >
                        <option value="">Selecciona un tipo de remolque</option>
                        {trailerTypes?.map((item, index) => (
                            <option key={index} value={item.nombre}>
                                {item.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
